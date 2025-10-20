# PromptGenie

## Project Overview

**The Problem:** Users are constantly inundated with information online. They encounter long articles, technical jargon, and complex topics that require significant time and effort to digest. Switching between tabs or using external tools to summarize or simplify text breaks workflow and reduces productivity.

**Our Solution:** The "PromptGenie" is a Chrome extension that provides in-context, on-demand text processing powered by hybrid AI. It allows users to instantly summarize, simplify, or apply custom transformations to any selected text or webpage without leaving the page. By leveraging Chrome's on-device AI for speed and privacy, and offering a seamless fallback to powerful cloud models, the extension provides a fast, reliable, and personalized tool for understanding the web better.

---

## POC Features

1.  **On-Demand Text Processing:**

    - **Summarize Selected Text:** When text is highlighted, a right-click context menu option will be available to generate a concise summary. This will be the **default action**, also triggerable by a floating button.
    - **Explain Like I'm 5 (ELI5):** A context menu option to rewrite selected text in simple, easy-to-understand language.

2.  **Whole-Page Summarization:**

    - A button in the extension's main popup (when you click the icon in the toolbar) will trigger a summary of the entire active webpage's main content.

3.  **Custom User Prompts:**

    - An interface in the extension popup for users to create and manage their own prompts (e.g., "Turn this into bullet points," "Translate to professional English").
    - For each custom prompt, the user must provide a **Title** and the **Prompt** itself.
    - Crucially, the user can choose the inference location:
      - **Local First (default):** Use the on-device model if available, otherwise fall back to the cloud.
      - **Cloud Only:** Always use the cloud model. This is for prompts that need the latest information or more powerful reasoning.

4.  **Inference Logic for POC:**
    - The built-in actions (Summarize, ELI5, Whole-Page Summary) will be hardcoded to **only use local, on-device inference** to guarantee privacy and speed for core features.
    - User-created prompts will respect the "Local First" or "Cloud Only" setting.

---

### **Technical Architecture & APIs**

- **Core AI Logic:** `firebase/ai` SDK. This is the central piece that will manage calls to both on-device and cloud models.
- **On-Device Chrome AI APIs (accessed via Firebase SDK):**
  - **`summarizer`:** Used for the "Summarize" and "Whole-Page Summary" features. It's highly optimized for this task.
  - **`prompt`:** The most flexible API. It will be used for the "ELI5" feature (with a prompt like "Explain the following text in a very simple way...") and for executing all user-created custom prompts.
- **Cloud Backend:**
  - **Firebase Project:** Required to use the AI Logic SDK.
  - **Vertex AI:** A Gemini model will need to be deployed here to serve as the cloud endpoint for the Firebase SDK.
- **Chrome Extension APIs:**
  - **`manifest.json`:** Will require permissions for `contextMenus`, `storage`, `scripting`, and `activeTab`.
  - **`chrome.contextMenus`:** To create and manage the right-click menu options dynamically.
  - **`chrome.storage.sync`:** To store and sync the user's custom prompts and settings across their devices.
  - **`chrome.scripting`:** To programmatically inject content scripts that can access page content and display UI elements like the floating button and results panel.
  - **`chrome.tabs`:** To get details about the active tab for whole-page summarization.

---

### **Key Technical Implementation Details**

1.  **Background Script (`background.js`):**

    - This will be the extension's brain (a non-persistent Service Worker).
    - It will initialize the Firebase AI Logic service on startup.
    - It will create the initial context menus ("Summarize", "ELI5").
    - It will listen for `chrome.storage.onChanged` events to update the context menus whenever a user adds or removes a custom prompt.
    - When a menu item is clicked, this script will receive the event, get the selected text, and execute the appropriate AI call based on the prompt's settings (local-only, local-first, or cloud-only).
    - It will then send the result back to the content script for display.

2.  **Content Script (`content.js`):**

    - This script will be injected into web pages.
    - It will detect when a user selects text and will show a small, floating button for the default action ("Summarize").
    - It will listen for messages from the background script containing the AI-generated result and will be responsible for displaying it in a clean, non-intrusive overlay or side panel.

3.  **Popup UI (`popup.html`, `popup.js`):**
    - This is the user interface for managing settings and custom prompts.
    - It will read from `chrome.storage.sync` to display the list of existing custom prompts.
    - It will provide a form for adding a new prompt (Title, Prompt text, "Cloud Only" checkbox).
    - Saving/deleting prompts here will write to `chrome.storage.sync`, which will in turn trigger the background script to update the context menus.
    - This is also where the "Summarize Full Page" button will live.

### **Step-by-Step POC Development Plan**

**Milestone 1: The Basics (Day 1)**

1.  **Setup:** Create the Firebase/Google Cloud project, enable Vertex AI, and deploy a Gemini model.
2.  **Manifest:** Create the `manifest.json` file with basic permissions.
3.  **Core Summarizer:** Implement the simplest feature first. In `background.js`, create a single context menu item for "Summarize". When clicked, get the selected text, call the `summarizer` API directly (without Firebase SDK for now), and `console.log` the result.

**Milestone 2: UI & ELI5 (Day 2)**

1.  **Display Results:** Create the basic content script logic to display the summary from Milestone 1 in a simple `alert()` or a basic HTML overlay on the page.
2.  **Add ELI5:** Add the "Explain Like I'm 5" context menu option. Use the `prompt` API for this with a hardcoded prompt.

**Milestone 3: Firebase Integration & Cloud Fallback (Day 3-4)**

1.  **Integrate SDK:** Replace the direct API calls in `background.js` with the `firebase/ai` SDK. Configure it with your Firebase project details.
2.  **Test Hybrid Logic:** Test that the "Summarize" and "ELI5" prompts are correctly routed to the on-device model.
3.  **Build Settings UI:** Create the `popup.html` with the form to add a custom prompt (Title, Prompt, Cloud Only checkbox). Write the logic in `popup.js` to save this data to `chrome.storage.sync`.
4.  **Dynamic Menus:** In `background.js`, read the stored prompts from `chrome.storage.sync` and dynamically add them to the context menu.

**Milestone 4: Full Feature Implementation & Polish (Day 5-7)**

1.  **Implement Cloud-Only Logic:** In `background.js`, when a custom prompt is executed, check its stored setting. If "Cloud Only" is true, instruct the Firebase SDK to use the cloud model.
2.  **Whole-Page Summary:** Add the button to the popup UI. When clicked, use `chrome.scripting` to extract the main content of the page and send it to the summarizer function.
3.  **UI Polish:** Implement the floating action button in the content script and design a more polished UI for displaying results (e.g., a moveable side panel or a clean pop-up).
4.  **Testing & Bug Fixes:** Test on various websites and refine the user experience.
