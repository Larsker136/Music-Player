const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const playButton = document.getElementById("playButton");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const title = document.getElementById("title")

let isPlaying = false;
let songNumber = 0;

const songs = [
    "CROSSFADE",
    "lov3"
]

function nextSong() {
    songNumber = (songNumber + 1) % songs.length;
    loadSong(songNumber);
}

function prevSong() {
    songNumber = (songNumber - 1 + songs.length) % songs.length;
    loadSong(songNumber);
}

function loadSong(index) {
    let loc = "music/" + songs[index] + ".mp3";
    audio.src = loc;
    audio.play();
    playButton.innerText = "⏸";
    title.innerText = songs[index] + ".mp3";
    isPlaying = true;
}

function playPause() {
    if (isPlaying) {
        playButton.innerText = "▶";
        audio.pause();
    }
    else {
        playButton.innerText = "⏸";
        audio.play();
    }
    isPlaying = !isPlaying;
}

audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;

    if (isNaN(audio.duration)) {
        currentTime.innerText = "0:00";
        totalTime.innerText = "0:00";
    }
    else {
        let current = formatTime(audio.currentTime);
        let total = formatTime(audio.duration);
        
        currentTime.innerText = current;
        totalTime.innerText = total;
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
}