const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const playButton = document.getElementById("playButton");
const totalTime = document.getElementById("totalTime");
const title = document.getElementById("title")

let isPlaying = false;
let songNumber = 0;

const songs = [
    { file: "CROSSFADE", name: "CROSSFADE" },
    { file: "DIRT!", name: "DIRT!" },
    { file: "lov3", name: "lov3" },
    { file: "PUBLIC ENEMY", name: "PUBLIC ENEMY" },
    { file: "MR. ROCKLEE", name: "MR. ROCKLEE" },
    { file: "kkoltong", name: "꼴통" },
    { file: "Ung Aeng Ung", name: "웅앵웅"},
    { file: "PUBLIC ENEMIES", name: "PUBLIC ENEMIES"},
    { file: "Musaka Talk", name: "지예아"},
    { file: "Naughty Talk", name: "지예아2"}
];

function nextSong() {
    songNumber = (songNumber + 1) % songs.length;
    loadSong(songNumber);
}

function prevSong() {
    songNumber = (songNumber - 1 + songs.length) % songs.length;
    loadSong(songNumber);
}

function loadSong(index) {
    let song = songs[index];
    let loc = "music/" + song.file + ".mp3";
    audio.src = loc;
    audio.play();
    playButton.innerHTML = 
`<svg viewBox="0 0 24 24" width="24" height="30">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
</svg>`;
    title.innerText = song.name+ ".mp3";
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

audio.addEventListener("ended", () => {
    audio.play();
})

function formatTime(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
}
