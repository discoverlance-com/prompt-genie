/**
 * Content script for displaying a FAB on text selection.
 */
let fab = null;
let lastSelectionText = "";

function removeFab() {
  if (fab && fab.parentNode) {
    fab.parentNode.removeChild(fab);
    fab = null;
  }
}

function createFab(promptTitle) {
  // Ensure no duplicate FABs exist
  removeFab();

  fab = document.createElement("button");
  fab.className = "promptgenie-fab";
  fab.textContent = "ASK PromptGenie: " + (promptTitle || "Run Prompt"); // Fallback text

  // Set initial styles
  fab.setAttribute(
    "style",
    `
    position: fixed;
    z-index: 2147483647;
    padding: 6px 16px;
    background: #7c3aed;
    color: #fff;
    border: none;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    font-size: 0.85rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    cursor: pointer;
    opacity: 0.98;
    height: 32px;
    transition: box-shadow 0.2s, opacity 0.2s;
  `
  );

  // Handle FAB click action
  fab.onclick = () => {
    chrome.storage.local.get(["prompts"], (result) => {
      const prompts = Array.isArray(result.prompts) ? result.prompts : [];
      const activePrompt = prompts.find((p) => p.isActive);

      if (!activePrompt || !lastSelectionText) {
        console.error(
          "PromptGenie: No active prompt or selection found on click."
        );
        return;
      }

      chrome.runtime.sendMessage({
        action: "run-promptgenie-fab",
        promptId: activePrompt.id,
        promptTitle: activePrompt.title,
        promptDescription: activePrompt.description,
        selectionText: lastSelectionText,
        url: window.location.href,
        pageTitle: document.title,
      });
      removeFab();
    });
  };

  document.body.appendChild(fab);

  // Position the FAB relative to the selection
  positionFab();
}

function positionFab() {
  if (!fab) return;

  const selection = window.getSelection();
  // Don't try to position if there's no active selection range
  if (selection.rangeCount === 0) {
    removeFab();
    return;
  }

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Hide FAB if selection is empty or not on the page
  if (!rect || rect.width === 0 || rect.height === 0) {
    fab.style.opacity = "0";
    return;
  }
  fab.style.opacity = "0.98";

  // Check if selection is inside an input or textarea
  const selectedNode = selection.anchorNode?.parentElement;
  if (
    selectedNode &&
    (selectedNode.tagName === "INPUT" || selectedNode.tagName === "TEXTAREA")
  ) {
    setFallbackPosition();
    return;
  }

  const fabHeight = 32;
  const fabWidth = fab.offsetWidth || 100;
  const margin = 8;

  let top = rect.top - fabHeight - margin;

  // If there's no space above, position below
  if (top < margin) {
    top = rect.bottom + margin;
  }

  // Center horizontally with the selection
  let left = rect.left + rect.width / 2 - fabWidth / 2;

  // Clamp left and right to stay within the viewport
  if (left < margin) {
    left = margin;
  }
  if (left + fabWidth + margin > window.innerWidth) {
    left = window.innerWidth - fabWidth - margin;
  }

  fab.style.top = `${top}px`;
  fab.style.left = `${left}px`;
  // Unset bottom/right to avoid conflicts
  fab.style.bottom = "auto";
  fab.style.right = "auto";
}

function setFallbackPosition() {
  if (!fab) return;
  fab.style.bottom = "24px";
  fab.style.right = "24px";
  fab.style.top = "auto";
  fab.style.left = "auto";
}

function handleSelectionChange() {
  const selection = window.getSelection();
  const selectedText = selection ? selection.toString().trim() : "";

  if (selectedText && selectedText.length > 0) {
    lastSelectionText = selectedText;

    // Check storage for an active prompt
    chrome.storage.local.get(["prompts"], (result) => {
      const prompts = Array.isArray(result.prompts) ? result.prompts : [];
      const activePrompt = prompts.find((p) => p.isActive);

      if (activePrompt) {
        if (!fab) {
          createFab(activePrompt.title);
        } else {
          positionFab();
        }
      } else {
        console.log("PromptGenie: No active prompt found in storage.");
        removeFab();
      }
    });
  } else {
    // If selection is cleared, remove the FAB
    lastSelectionText = "";
    removeFab();
  }
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// --- Initialization ---

if (!document.getElementById("promptgenie-fab-style")) {
  const style = document.createElement("style");
  style.id = "promptgenie-fab-style";
  style.textContent = `
    .promptgenie-fab:hover {
        box-shadow: 0 4px 16px rgba(124,58,237,0.25);
    }
  `;
  document.head.appendChild(style);
}

// Add debounced event listeners
document.addEventListener(
  "selectionchange",
  debounce(handleSelectionChange, 300)
);
document.addEventListener("scroll", debounce(positionFab, 50), {
  passive: true,
});
window.addEventListener("resize", debounce(positionFab, 50));
