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
    "DIRT!",
    "lov3",
    "PUBLIC ENEMY"
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
    playButton.innerHTML = 
`<svg viewBox="0 0 24 24" width="24" height="30">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
</svg>`;
    title.innerText = songs[index] + ".mp3";
    isPlaying = true;
}

function playPause() {
    if (isPlaying) {
        playButton.innerHTML = 
`<svg viewBox="0 0 24 24" width="24" height="30">
    <polygon points="7,4 19,12 7,20"></polygon>
</svg>`;
        audio.pause();
    }
    else {
        playButton.innerHTML = 
`<svg viewBox="0 0 24 24" width="24" height="30">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
</svg>`;
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
