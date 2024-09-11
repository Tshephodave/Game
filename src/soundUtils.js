export const playSound = (soundFileName) => {
    const audio = new Audio(`/sounds/${soundFileName}`);
    audio.play();
  };