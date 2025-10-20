import { model } from "./src/firebase.js";

chrome.runtime.onInstalled.addListener(() => {
  // Remove all old context menus
  chrome.contextMenus.removeAll(() => {
    // Load prompts from storage
    chrome.storage.local.get(["prompts"], (result) => {
      const prompts = Array.isArray(result.prompts) ? result.prompts : [];
      prompts.forEach((prompt) => {
        chrome.contextMenus.create({
          id: prompt.id,
          title: prompt.title,
          contexts: ["selection"],
        });
      });
      // Add whole page context menu
      chrome.contextMenus.create({
        id: "prompt_genie_whole_page",
        title: "Summarize whole page",
        contexts: ["page"],
      });
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab && tab.id) {
    if (info.menuItemId === "prompt_genie_whole_page") {
      chrome.action.openPopup().then(() => {
        chrome.runtime.sendMessage({ action: "prompt-loading" });
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            world: "MAIN",
            func: () => {
              // Try to get <article>, <main>, or fallback to <body>
              let content = "";
              const article = document.querySelector("article");
              if (article && article.innerText.trim().length > 100) {
                content = article.innerText;
              } else {
                const main = document.querySelector("main");
                if (main && main.innerText.trim().length > 100) {
                  content = main.innerText;
                } else {
                  content = document.body.innerText;
                }
              }
              return content.slice(0, 100000); // Limit to first 100k characters
            },
          },
          async (results) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
            }
            const text = results?.[0]?.result;
            if (text) {
              const result = await summarizeWholePage({
                title: tab.title || "",
                content: text,
                url: tab.url || "",
              });
              chrome.runtime.sendMessage({
                action: "prompt-response",
                text: result,
              });
            }
          }
        );
      });
      return;
    }

    // For selection context menu items (default and custom)
    if (info.selectionText) {
      chrome.storage.local.get(["prompts"], (result) => {
        const prompts = Array.isArray(result.prompts) ? result.prompts : [];
        const prompt = prompts.find((p) => p.id === info.menuItemId);

        if (!prompt) return;

        chrome.action.openPopup().then(() => {
          chrome.runtime.sendMessage({ action: "prompt-loading" });
          let summaryPromise;

          if (prompt.id === "prompt_genie_summarize") {
            summaryPromise = summarizeSelectedText({
              title: tab.title || "",
              content: info.selectionText,
              url: tab.url || "",
            });
          } else if (prompt.id === "prompt_genie_eli5") {
            summaryPromise = eli5SelectedText({
              title: tab.title || "",
              content: info.selectionText,
              url: tab.url || "",
            });
          } else {
            summaryPromise = runCustomPrompt({
              title: tab.title || "",
              content: info.selectionText,
              url: tab.url || "",
              description: prompt.description,
            });
          }
          Promise.allSettled([summaryPromise]).then(([result]) => {
            chrome.runtime.sendMessage({
              action: "prompt-response",
              text:
                result.status === "fulfilled"
                  ? result.value
                  : result.reason.message,
            });
          });
        });
      });
    }
  }
});

// Custom prompt runner
async function runCustomPrompt({ title, content, url, description }) {
  const response = await model.generateContent({
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 1024,
    },
    systemInstruction: `
      You are a versatile and obedient AI text-processing assistant. Your purpose is to precisely follow the user's command and apply it to the provided source text.

      **Your Rules:**
      1.  **Prioritize the User's Instruction:** The user's command is your primary directive. Execute it as accurately and faithfully as possible.
      2.  **Produce Direct Output:** Generate only the direct result of the user's request. Do not add conversational filler, introductions, or explanations like "Sure, here is the result..." unless the user's instruction explicitly asks for it.
      3.  **Stay Grounded:** Base your response solely on the provided "Source Text." Do not use external knowledge or information unless the user's instruction requires it (e.g., for a translation or comparison).
      4.  **Maintain Neutrality:** Adopt a neutral tone unless the user's instruction specifies a different tone, style, or persona.
      5.  **Handle Ambiguity Gracefully:** If the user's instruction is unclear, impossible, or unsafe to follow with the given text, provide a brief and polite explanation of why the request cannot be completed.`,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
             User Instruction:
              ---
              ${description}

              Source Text:
              ---
              ${content}`,
          },
        ],
      },
    ],
  });
  return response.response.text();
}

async function summarizeWholePage({ title, content, url }) {
  const response = await model.generateContent({
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1024,
    },
    systemInstruction:
      "You are an AI assistant skilled at parsing raw webpage content and extracting the most important information. Your primary task is to identify the core article content and ignore all boilerplate text such as headers, navigation links, sidebars, ads, and footers. Your response must begin with a single-sentence overview of the page's main idea, followed by a bulleted list of the 3-5 most important points. Each bullet point must be a complete, concise sentence.",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `\n\n**Role:** You are an AI assistant skilled at parsing raw webpage content and extracting the most important information.\n\n**Task:** Analyze the provided webpage text, identify the core article or main content, and generate a key-points summary.\n\n**Rules:**\n1.  Your first priority is to find the main content. You MUST ignore boilerplate text such as headers, navigation links, sidebars, advertisements, comment sections, and footers.\n2.  Begin your response with a one-sentence overview that states the central purpose or main idea of the page.\n3.  After the overview, provide a bulleted list (using '-' or '*') of the 3-5 most important points or arguments made in the article.\n4.  Each bullet point should be a complete, concise sentence.\n5.  The entire response should be clean and easily scannable.\n\n**Webpage Content to Analyze:**\n---\n${content}\n\n`,
          },
        ],
      },
    ],
  });
  return response.response.text();
}

async function summarizeSelectedText({ title, content, url }) {
  const response = await model.generateContent({
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 512,
    },
    systemInstruction:
      "You are a highly skilled summarization AI. Your purpose is to distill complex information into a brief, easy-to-understand summary. Your tone must be neutral, objective, and informative. You must focus exclusively on the main ideas and key findings from the text provided, and you must not include any of your own opinions, interpretations, or external information. The final output must be a single, dense paragraph.",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
    **Role:** You are a highly skilled summarization AI. Your purpose is to distill complex information into a brief, easy-to-understand summary.

    **Task:** Generate a concise, neutral, and accurate summary of the provided text.

    **Rules:**
    1.  The summary must be a single, dense paragraph.
    2.  Focus exclusively on the main ideas, key findings, and essential information from the text.
    3.  Do not include your own opinions, interpretations, or any external information.
    4.  The tone should be objective and informative.
    5.  Ensure the summary is significantly shorter than the original text.

    **Text to Summarize:**
    ---
    ${content}`,
          },
        ],
      },
    ],
  });
  return response.response.text();
}

async function eli5SelectedText({ title, content, url }) {
  const response = await model.generateContent({
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 768,
    },
    systemInstruction:
      "You are a patient and creative teacher who is an expert at simplifying complex ideas for a young child. Your tone must be friendly, patient, and encouraging. When you explain things, you must use very short sentences and simple, common, everyday words. Avoid all technical terms and jargon. If you need to explain a difficult idea, you must use a simple analogy related to things a child would know, like toys, food, or animals.",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `**Task:** Explain the core concept of the following text in a way that is extremely easy to understand for a five-year-old.

    **Rules:**
    1.  Use very short sentences and simple, common, everyday words.
    2.  Avoid all technical terms, jargon, and complex vocabulary.
    3.  If you must explain a difficult idea, use a simple analogy related to things a child would know (e.g., toys, food, animals, playing a game).
    4.  The tone must be friendly, patient, and encouraging.
    5.  Focus on the main idea. It is okay to leave out smaller details to keep it simple.

    **Text to Explain:**
    ---
    ${content}`,
          },
        ],
      },
    ],
  });
  return response.response.text();
}
