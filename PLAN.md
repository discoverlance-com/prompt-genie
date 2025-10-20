# PromptGenie Project Plan

## Overview

PromptGenie is a Chrome extension designed to help users process, summarize, and transform text directly within any webpage. It provides instant, context-aware actions for selected text or entire pages, powered by hybrid AI (on-device and cloud). The extension aims to solve the problem of information overload and make it easy to extract key insights, simplify complex content, or apply custom transformations without leaving the browser.

## Features & Functionality

- **Floating Action Button (FAB):** When a user selects text, a small button appears above the selection. Clicking the FAB runs the currently active prompt (e.g., summarize, explain, custom transformation) and displays the result in the extension popup.
- **Context Menu Integration:** Right-clicking selected text or the page provides prompt actions (summarize, ELI5, custom prompts, whole-page summary) via the Chrome context menu.
- **Custom Prompts:** Users can create, manage, and select custom prompts for specialized text processing tasks. The context menu and FAB update dynamically as prompts are added or removed.
- **Whole-Page Summarization:** Users can summarize the entire page content from the popup or context menu.
- **Responsive UI:** Results are shown in a modern, theme-adaptive popup with loading states, markdown rendering, and copy/close actions.
- **Dynamic Prompt Management:** Prompts are stored in `chrome.storage.local` and can be added, deleted, or set as active. The UI and context menu update instantly.

## APIs Used

- **Chrome Extension APIs:**
  - `chrome.contextMenus` for dynamic menu creation and click handling
  - `chrome.storage.local` for prompt persistence
  - `chrome.runtime.sendMessage` for communication between background, popup, and content scripts
  - `chrome.scripting.executeScript` for extracting page content
  - `chrome.action.openPopup` for UI feedback
- **AI APIs:**
  - **Chrome Prompt API** (on-device):
  - **Hybrid On Device Inference with Firebase Gemini API** (cloud/on-device): Supports local on device inference for fast, private inference on supported Chrome versions through and the cloud when on-device is unavailable or insufficient

## Problem Statement

Modern web users face information overload and often need to quickly extract, summarize, or simplify content from web pages. Existing solutions require copying text into external tools or lack context-awareness. PromptGenie solves this by:

- Providing instant, in-page actions for selected text or whole pages
- Supporting custom, user-defined prompts for specialized tasks
- Leveraging both on-device and cloud AI for privacy, speed, and power
- Delivering a seamless, responsive UI that adapts to user workflow

PromptGenie empowers users to process information efficiently, stay focused, and get more value from the web.
