export function createGardenAmbience() {
  const context = new AudioContext();
  const buffer = context.createBuffer(
    1,
    context.sampleRate * 4,
    context.sampleRate,
  );
  const samples = buffer.getChannelData(0);
  let previous = 0;
  for (let index = 0; index < samples.length; index += 1) {
    previous = (previous + (Math.random() * 2 - 1) * 0.025) / 1.025;
    samples[index] = previous * 2;
  }
  const breeze = context.createBufferSource();
  breeze.buffer = buffer;
  breeze.loop = true;
  const filter = context.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 850;
  const gain = context.createGain();
  gain.gain.value = 0.1;
  breeze.connect(filter).connect(gain).connect(context.destination);
  breeze.start();
  return context;
}
