// musicSetup.js
// Setup audio for the scene
import * as THREE from "three";

let sound = 0;
// track if audio buffer is loaded
let bufferLoaded = false;

// setup audio for the scene
export const audioSetup = (camera) => {

    document.getElementById("start_audio").addEventListener("click", audioStart);
    document.getElementById("pause_audio").addEventListener("click", audioPause);
    document.getElementById("stop_audio").addEventListener("click", audioStop);


    // create an audio listener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // creating the audio source
    sound = new THREE.Audio(listener);

    // create an audio loader
    const audioLoader = new THREE.AudioLoader();
    // load the audio file
    audioLoader.load("../audio/background-epic-piano-music-for-short-video-vlog-advertising-1-minute-180911.mp3", function (buffer) {
        // set the audio source buffer
        sound.setBuffer(buffer);
        // set the audio source to loop
        sound.setLoop(true);
        // set the audio source to autoplay
        sound.setVolume(0.2);
        // set to true when audio buffer is loaded
        bufferLoaded = true;
    });

    const audioLoader2 = new THREE.AudioLoader();
    // load the audio file
    audioLoader2.load("../audio/background-epic-piano-music-for-short-video-vlog-advertising-1-minute-180911.mp3", function (buffer) {
        // set the audio source buffer
        sound.setBuffer(buffer);
        // set the audio source to loop
        sound.setLoop(true);
        // set the audio source to autoplay
        sound.setVolume(0.2);
        // set to true when audio buffer is loaded
        bufferLoaded = true;
    });
};

// play audio
export const audioStart = () => {
    // check if the buffer is loaded before playing
    if (sound && bufferLoaded) {
        // play the audio
        sound.play();
    }
};

// pause audio
export const audioPause = () => {
    // if playing,
    if (sound) {
        // pause the audio
        sound.pause();
    }
};

// stop audio
export const audioStop = () => {
    // if playing,
    if (sound) {
        // stop the audio
        sound.stop();
    }
};
