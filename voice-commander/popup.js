navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
        console.log("Microphone access granted.");
    })
    .catch((err) => {
        console.error("Microphone access denied:", err);
        alert("Please enable microphone access in Chrome .");
    });

if (!window.hasRun) {
  window.hasRun = true;

  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');
  const status = document.getElementById('status');
  const result = document.getElementById('result');

  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = function (event) {
      const voiceInput = event.results[0][0].transcript.toLowerCase();
      console.log("User said:", voiceInput);
      result.textContent = voiceInput;

      chrome.runtime.sendMessage({ action: "voice_command", command: voiceInput });
  };

  recognition.onerror = function (event) {
      console.error("Speech recognition error detected:", event.error);
  };

  recognition.onend = function () {
      console.log("Speech recognition stopped.");
      status.textContent = "Not listening";
  };

  recognition.start();

  startButton.addEventListener("click", function () {
      navigator.permissions.query({ name: "microphone" }).then(function (permissionStatus) {
          if (permissionStatus.state === "granted") {
              navigator.mediaDevices.getUserMedia({ audio: true })
                  .then(() => {
                      console.log("Microphone access granted");
                      status.textContent = "Listening...";
                      recognition.start();
                  })
                  .catch((err) => {
                      console.error("Microphone access denied:", err);
                      alert("Please allow microphone access.");
                  });
          } else {
              alert("Microphone access denied. Enable it in Chrome settings.");
          }
      });
  });

  stopButton.addEventListener("click", function () {
      recognition.stop();
  });

  chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "summarized_text") {
          if (message.error) {
              speakText(message.error);
          } else {
              let summaryText = message.title + "\n\n" + message.content;
              speakText(summaryText);
          }
      }
  });

  function speakText(text) {
      let speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1.0; 
      speech.pitch = 1.0; 
      window.speechSynthesis.speak(speech);
  }
}
