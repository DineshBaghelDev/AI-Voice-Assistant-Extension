chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "voice_command") {
        handleCommand(request.command);
    }
});

function handleCommand(command) {
    command = command.toLowerCase();

    if (command.startsWith("open ")) {
        let sites = command.replace("open ", "").split(" and ");
        sites.forEach(site => openWebsite(site.trim()));
    } 
    else if (command.includes("open youtube")) {
        chrome.tabs.create({ url: "https://www.youtube.com" });
    }
    else if (command.includes("open google")) {
        chrome.tabs.create({ url: "https://www.google.com" });
    }
    else if (command.startsWith("close ")) {
        let site = command.replace("close ", "").trim();
        closeWebsite(site);
    }
    else if (command.startsWith("search for ")) {
        let query = command.replace("search for ", "").trim();
        searchGoogle(query);
    }
    else if (command.includes("scroll down")) {
        executeScriptOnActiveTab(() => window.scrollBy(0, 500));
    }
    else if (command.includes("scroll up")) {
        executeScriptOnActiveTab(() => window.scrollBy(0, -500));
    }
    else if (command.includes("next tab")) {
        switchTab(1);
    }
    else if (command.includes("previous tab")) {
        switchTab(-1);
    }
    else if (command.includes("go back")) {
        executeScriptOnActiveTab(() => history.back());
    }
    else if (command.includes("go forward")) {
        executeScriptOnActiveTab(() => history.forward());
    }
}

function closeWebsite(site) {
    chrome.tabs.query({}, (tabs) => {
        for (let tab of tabs) {
            if (tab.url.includes(site)) {
                chrome.tabs.remove(tab.id);
            }
        }
    });
}

function searchGoogle(query) {
    let url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    chrome.tabs.create({ url: url });
}

function openWebsite(site) {
    let url = `https://www.${site}.com`; // Default to .com
    chrome.tabs.create({ url: url });
}

function executeScriptOnActiveTab(func) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: func,
        });
    });
}

function switchTab(direction) {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
            let currentIndex = activeTabs[0].index;
            let newIndex = (currentIndex + direction + tabs.length) % tabs.length;
            chrome.tabs.update(tabs[newIndex].id, { active: true });
        });
    });
}