const volumeSlider = document.getElementById("volumeSlider");
const muteButton = document.getElementById("muteButton");

let audioVolume = volumeSlider.value;
let isMuted = false;

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    if(volumeSlider.value == "0"){
        muteButton.innerText = "🔇";
    }
    else{
        muteButton.innerText = "🔊";
        isMuted = false;
    }
    // console.log("volme set to " + volumeSlider.value)
})

function volumeButton(){
    console.log(isMuted);
    if(isMuted){
        volumeSlider.value = audioVolume;
        audio.volume = volumeSlider.value;
        isMuted = false;
        muteButton.innerText = "🔊";
    }
    else {
        audioVolume = volumeSlider.value;
        audio.volume = 0;
        volumeSlider.value = 0;
        isMuted = true;
        muteButton.innerText = "🔇";
    }
}