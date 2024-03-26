document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('input');
    const context = new (window.AudioContext || window.webkitAudioContext)();

    if (!context) {
        alert("AudioContext not supported in this browser");
        return;
    }

    function playTone(frequency) {
        const osc = context.createOscillator();
        const gain = context.createGain();

        osc.connect(gain);
        gain.connect(context.destination);
        gain.channelCountMode = 'explicit';
        gain.channelCount = 2;
        osc.frequency.value = frequency;
        gain.gain.value = 0.8;
        osc.start();
        osc.stop(context.currentTime + 1);
    }

    // Key to frequency mapping
    const keyMap = {};
    const baseFrequency = 440; // A4
    // Generate frequencies for each key (a simple mapping, not musically accurate)
    for (let i = 0; i < 26; i++) {
        const keyChar = String.fromCharCode(97 + i); // ASCII to char ('a' to 'z')
        keyMap[keyChar] = baseFrequency + (i * 30);
    }

    input.addEventListener('input', function () {
        const frequency = parseInt(input.value);
        if (!isNaN(frequency) && frequency > 0 && frequency <= 20000) {
            playTone(frequency);
        }
    });

    // Listen to keydown events
    document.addEventListener('keydown', function (event) {
        const key = event.key.toLowerCase();
        if (key in keyMap) {
            playTone(keyMap[key]);
        }
    });
});
