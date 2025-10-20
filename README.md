# PromptGenie

A Chrome extension that provides in-context, on-demand text processing powered by hybrid AI.

## Overview

PromptGenie solves the problem of information overload by allowing users to instantly summarize, simplify, or apply custom transformations to any selected text or webpage without leaving the page. It leverages Chrome's on-device AI for speed and privacy, with seamless fallback to powerful cloud models.

## Key Features

### Core Text Processing

- **Summarize Selected Text**: Right-click context menu or floating button to generate concise summaries
- **Explain Like I'm 5 (ELI5)**: Simplify complex text into easy-to-understand language
- **Whole-Page Summarization**: Summarize entire webpages from the extension popup

### Custom Prompts

- Create and manage personalized prompts (e.g., "Turn into bullet points", "Translate to professional English")
- Choose inference location:
  - **Local First** (default): On-device model with cloud fallback
  - **Cloud Only**: Always use cloud model for complex reasoning

## Technical Stack

- **Chrome Extension APIs**: Context menus, storage, scripting, tabs
- **AI Processing**: `firebase` SDK
- **On-Device AI**: Chrome's built-in `summarizer` and `prompt` APIs
- **Cloud Backend**: Firebase with Gemini Developer API

## Privacy & Performance

- Built-in actions (Summarize, ELI5) use **local-only** inference for guaranteed privacy
- Custom prompts respect user-defined inference preferences
- Fast processing with on-device AI, powerful reasoning with cloud fallback

## Development

### Running this extension

1. Clone this repository.
2. Install the packages by running the command: `npm install`
3. 🔧 Firebase Setup. Create a `.firebase-config.js` file in the root of the extension with your Firebase project credentials:

```js
export const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  ...
};

```

4. Run the command `npm run build` or `npm run build:prod` to build the extension's assets.

5. Load the `dist` directory in Chrome as an unpacked extension.
