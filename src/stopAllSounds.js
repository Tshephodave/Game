export const stopAllSounds = () => {
    const sounds = document.getElementsByTagName('audio');
    for (let sound of sounds) {
      sound.pause();
      sound.currentTime = 0;
    }
  };
  