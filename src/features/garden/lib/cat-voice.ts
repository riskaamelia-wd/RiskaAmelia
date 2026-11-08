export function createCatVoice() {
  const audio = new Audio("/audio/cat-meow.ogg");
  audio.volume = 0.35;
  return {
    async play() {
      audio.currentTime = 0;
      await audio.play();
    },
    pause() {
      audio.pause();
    },
  };
}
