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
  if (info.menuItemId === "prompt_genie_whole_page" && tab && tab.id) {
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
          const [result] = await Promise.allSettled([
            summarizeWholePage({
              title: tab.title || "",
              content: text,
              url: tab.url || "",
            }),
            chrome.action.openPopup(),
          ]);

          // send message to popup with summary result
          chrome.runtime.sendMessage({
            action: "prompt-response",
            text:
              result.status === "fulfilled"
                ? result.value
                : result.reason.message,
          });
        }
      }
    );
  }
});

async function summarizeWholePage({ title, content, url }) {
  console.log("Summarizing whole page content:", content);

  return "lorem ipsum dolor sit amet, consectetur adipiscing elit..."; // Placeholder summary
}
