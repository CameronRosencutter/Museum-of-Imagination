import * as THREE from 'three';

export const showMenu = () => {
    const menu = document.getElementById('menu-div');
    // show the menu
    menu.style.display = 'block';
}

export const hideMenu = () => {
    const menu = document.getElementById('menu-div');
    // hide the menu
    menu.style.display = 'none';
}

// start experience
export const startExperience = (controls) => {
    // activate cursor controls
    cursorControls.lock();
    // as well as hide the menu
    hideMenu();
}

// get the play button element to manipulate
export const playButtonSetup = (controls) => {
    const playButton = document.getElementById('play-button');
    playButton.addEventListener('click', () => {
        startExperience(cursorControls);
    });
}
