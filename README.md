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

## Depoloyment

### Running this extension

1. Clone this repository.
2. Load this directory in Chrome as an unpacked extension.
