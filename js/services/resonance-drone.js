    // Web Audio 432Hz Himalayan Singing Bowl Resonance
    let audioCtx = null;
    let isResonancePlaying = false;
    let activeOscillators = [];

    function toggleResonanceDrone() {
      const btnText = document.getElementById('sound-btn-text');
      const bars = document.querySelectorAll('#wave-visualizer span');

      if (!isResonancePlaying) {
        audioCtx = createAudioContext();
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 1.5);
        masterGain.connect(audioCtx.destination);

        [216, 432, 648].forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const oscGain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          oscGain.gain.setValueAtTime(idx === 1 ? 0.5 : 0.2, audioCtx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
          activeOscillators.push(osc);
        });

        isResonancePlaying = true;
        if (btnText) btnText.textContent = '432Hz: Active';
        bars.forEach((b, i) => {
          b.classList.add('wave-bar');
          b.style.animationDelay = `${i * 0.2}s`;
        });
        showToast('432Hz Singing Bowl Resonance active.');
      } else {
        activeOscillators.forEach(osc => {
          try { osc.stop(); } catch (e) {}
        });
        activeOscillators = [];
        if (audioCtx) audioCtx.close();
        isResonancePlaying = false;
        if (btnText) btnText.textContent = '432Hz Resonance';
        bars.forEach(b => b.classList.remove('wave-bar'));
      }
    }
