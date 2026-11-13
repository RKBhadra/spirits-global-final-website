function createAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  return new AudioContextClass();
}

function resumeAudioContext(context) {
  if (context && context.state === 'suspended') {
    context.resume();
  }
}
