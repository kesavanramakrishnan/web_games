var start = document.getElementById("start");
var level = document.getElementById("level");
var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
var s3 = document.getElementById("s3");
var s4 = document.getElementById("s4");
var audioCtx = new(window.AudioContext || window.webkitAudioContext || window.audioContext);
var sounds = [262, 294, 330, 349];
var lights = [];
var youClicked = [];
var arNum = 0;
var levelNum = 1;
var playing = true;
var colorindex;

start.addEventListener("click", startGame);
for (var i = 0; i < 4; i++) {

    document.getElementById("s" + (i + 1)).addEventListener("click", check);



}


function check() {
    if (!playing) {
        turnOn(this);
        if (this == lights[arNum]) {

            arNum++;
            if (arNum == lights.length) {
                levelNum++;
                level.innerHTML = "Level " + levelNum;
                setTimeout(flashLights, 2000);
                playing = true;
            }
        }

        else {
            level.innerHTML = "YOU LOSE!!!!";
            playing = true;
            arNum = 0;
            levelNum = 1;
            lights = [];
            youClicked = [];
            start.disabled = false;
        }
    }
}

function startGame() {
    level.innerHTML = "Level" + " " + levelNum;
    flashLights();
    this.disabled = true;
}

function flashLights() {
    var random = "s" + (Math.floor(Math.random() * 4) + 1);
    var randomDiv = document.getElementById(random);
    arNum = 0;
    lights.push(randomDiv);
    for (var i = 0; i < lights.length; i++) {
        setTimeout(turnOn, i * 1000, lights[i], i);
    }


}

function turnOn(light, lightNum) {
    light.style.opacity = "1";
    setTimeout(turnOff, 500, light, lightNum);
    colorindex = parseFloat(light.getAttribute("id")[1]) - 1;
    beep(500, sounds[colorindex]);

}

function turnOff(light, lightNum) {
    light.style.opacity = ".75";
    if (lightNum == levelNum - 1) {
        playing = false;
    }
}

function beep(duration, frequency, volume, type, callback) {
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (volume) { gainNode.gain.value = volume; }
    if (frequency) { oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); }
    if (type) { oscillator.type = type; }
    if (callback) { oscillator.onended = callback; }

    oscillator.start();
    setTimeout(function() { oscillator.stop() }, (duration ? duration : 500));
}
