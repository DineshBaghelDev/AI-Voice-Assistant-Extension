# Voice-Controlled Browser Assistant

A powerful Chrome extension that enables users to control their browser using voice commands. It allows opening and closing websites, searching Google, navigating tabs, scrolling, and summarizing webpage content using AI.

## Features
- **Open Websites**: Say "Open YouTube" or "Open Google" to launch websites.
- **Close Tabs**: Say "Close YouTube" to close the tab containing YouTube.
- **Google Search**: Say "Search for AI in Chrome" to perform a Google search.
- **Navigation**:
  - "Next Tab" / "Previous Tab" to switch between tabs.
  - "Scroll Up" / "Scroll Down" to move through the page.
  - "Go Back" / "Go Forward" to navigate history.
- **Summarize Webpages**: Say "Summarize" or "Read" to extract and summarize the main content of a webpage.

## Installation
1. Clone this repository or download the ZIP file.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (toggle at the top right).
4. Click "Load unpacked" and select the extension folder.
5. The extension is now installed and ready to use.

## Usage
1. Click on the extension icon to activate voice commands.
2. Speak the desired command (e.g., "Open Wikipedia").
3. The extension will execute the command accordingly.
4. To summarize a webpage, visit the page and say "Summarize".
5. The extracted summary will be displayed in a popup.

## Tech Stack
- **JavaScript (ES6+), Chrome Extensions API**
- **Readability.js** for content extraction
- **Web Speech API** for voice recognition

## Future Enhancements
- Support for additional search engines
- Dark mode and UI improvements
- Voice-based form filling and automation

## License
MIT License

