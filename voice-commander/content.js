// Inject Readability and extract article text
function extractMainContent() {
    let documentClone = document.cloneNode(true);
    let reader = new Readability(documentClone);
    let article = reader.parse();
    console.log("helo")
    console.log("Checking if content.js is running!");


    if (article) {
        let words = article.textContent.split(/\s+/); 
        let summary = words.slice(0, 50).join(" "); 
        console.log("extracting")

        
        chrome.runtime.sendMessage({
            action: "summarized_text",
            title: article.title,
            content: summary
        });
    } else {
        chrome.runtime.sendMessage({
            action: "summarized_text",
            error: "Failed to extract content."
        });
    }
}


extractMainContent();




// Send extracted text to popup.js

