import "./src/styles/shared.css";

const defaultPrompts = [
  {
    id: "prompt_genie_summarize",
    title: "Summarize Selected Text",
    description: "Get a quick summary of your selected text",
    isActive: true,
    isDefault: true,
  },
  {
    id: "prompt_genie_eli5",
    title: "Explain Like I'm 5 (ELI5)",
    description: "Get a simple explanation that's easy to understand",
    isActive: false,
    isDefault: true,
  },
];

function saveDefaultPromptsIfNeeded() {
  chrome.storage.local.get(["prompts"], (result) => {
    let prompts = result.prompts;
    if (!prompts || !Array.isArray(prompts) || prompts.length === 0) {
      chrome.storage.local.set({ prompts: defaultPrompts }, () => {
        renderPrompts(defaultPrompts);
      });
    } else {
      renderPrompts(prompts);
    }
  });
}

function addDeleteButton(prompts, prompt) {
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.title = "Delete prompt";
  deleteBtn.innerHTML =
    '<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 8.5V14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12.5 8.5V14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3.5 4.5H16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M5.5 4.5V16.5C5.5 17.0523 5.94772 17.5 6.5 17.5H13.5C14.0523 17.5 14.5 17.0523 14.5 16.5V4.5" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 2.5H11.5C12.0523 2.5 12.5 2.94772 12.5 3.5V4.5H7.5V3.5C7.5 2.94772 7.94772 2.5 8.5 2.5Z" stroke="currentColor" stroke-width="1.5"/></svg>';
  deleteBtn.style.position = "absolute";
  deleteBtn.style.top = "50%";
  deleteBtn.style.right = "12px";
  deleteBtn.style.transform = "translateY(-50%)";
  deleteBtn.style.background = "var(--surface-4)";
  deleteBtn.style.border = "none";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.padding = "4px";
  deleteBtn.style.color = "var(--text-2)";
  deleteBtn.addEventListener("mouseenter", () => {
    deleteBtn.style.color = "var(--brand)";
  });
  deleteBtn.addEventListener("mouseleave", () => {
    deleteBtn.style.color = "var(--text-2)";
  });

  // add click event listener to delete the prompt
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const updatedPrompts = prompts.filter((p) => p.id !== prompt.id);
    // If the deleted prompt was active, set the first prompt as active
    if (prompt.isActive && updatedPrompts.length > 0) {
      updatedPrompts[0].isActive = true;
    }
    chrome.storage.local.set({ prompts: updatedPrompts }, () => {
      renderPrompts(updatedPrompts);
    });
  });

  return deleteBtn;
}

function renderPrompts(prompts) {
  const optionGroup = document.querySelector(".option-group");
  if (!optionGroup) return;
  optionGroup.innerHTML = "";
  prompts.forEach((prompt) => {
    const label = document.createElement("label");
    label.className = "option-card";
    label.style.position = "relative";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "action";
    input.value = prompt.id;
    input.checked = !!prompt.isActive;

    // When clicked, set this prompt as active and update storage
    input.addEventListener("change", () => {
      const updatedPrompts = prompts.map((p) => ({
        ...p,
        isActive: p.id === prompt.id,
      }));
      chrome.storage.local.set({ prompts: updatedPrompts }, () => {
        renderPrompts(updatedPrompts);
      });
    });

    const content = document.createElement("div");
    content.className = "option-content";

    const h3 = document.createElement("h3");
    h3.textContent = prompt.title;
    const p = document.createElement("p");
    p.textContent = prompt.description;

    content.appendChild(h3);
    content.appendChild(p);
    label.appendChild(input);
    label.appendChild(content);

    // Add delete button for custom prompts
    if (!prompt.isDefault) {
      const deleteBtn = addDeleteButton(prompts, prompt);
      label.appendChild(deleteBtn);
    }

    optionGroup.appendChild(label);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  saveDefaultPromptsIfNeeded();

  // Handle custom prompt form submission
  const customPromptForm = document.querySelector(".custom-prompt-form");
  if (customPromptForm) {
    customPromptForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const titleInput = customPromptForm.querySelector("[name='title']");
      const descInput = customPromptForm.querySelector("[name='description']");
      const title = titleInput.value.trim();
      const description = descInput.value.trim();

      if (!title || !description) return;

      chrome.storage.local.get(["prompts"], (result) => {
        const prompts = Array.isArray(result.prompts) ? result.prompts : [];
        const newPrompt = {
          id: `prompt_genie_${Date.now()}`,
          title,
          description,
          isActive: false,
          isDefault: false,
        };
        const updatedPrompts = [...prompts, newPrompt];
        chrome.storage.local.set({ prompts: updatedPrompts }, () => {
          renderPrompts(updatedPrompts);
          customPromptForm.reset();
        });
      });
    });
  }
});
