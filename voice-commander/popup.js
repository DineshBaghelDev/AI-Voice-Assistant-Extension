
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const status = document.getElementById('status');
const result = document.getElementById('result');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

recognition.onresult = function (event) {
  const voiceInput = event.results[0][0].transcript;
  console.log('Voice Input: ', voiceInput);
  result.textContent = voiceInput;
  chrome.runtime.sendMessage({ action: "voice_command", command: voiceInput });
};

recognition.onerror = function (event) {
  console.error('Speech recognition error detected: ' + event.error);
};

recognition.onend = function () {
  console.log('Speech recognition service disconnected');
  status.textContent = "Not listening";
};

startButton.addEventListener('click', function () {
  navigator.permissions.query({ name: 'microphone' }).then(function (permissionStatus) {
    if (permissionStatus.state === 'granted') {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
          console.log("Microphone access granted");
          status.textContent = "Listening...";
          recognition.start();
        })
        .catch(function (err) {
          console.error("Microphone access denied: " + err);
          alert("Microphone access is required for voice commands. Please allow microphone access.");
        });
    } else if (permissionStatus.state === 'prompt') {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
          console.log("Microphone access granted");
          recognition.start();
        })
        .catch(function (err) {
          console.error("Microphone access denied: " + err);
          alert("Microphone access is required for voice commands. Please allow microphone access.");
        });
    } else {
      console.error("Microphone access denied");
      alert("Microphone access has been denied. Please enable microphone access in your browser settings.");
    }
  });
});

stopButton.addEventListener('click', function () {
  recognition.stop();
});
