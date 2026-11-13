    /* -------------------------------------------------------------------------- */
    /* WEB AUDIO API: GENUINE 7-METAL HIMALAYAN SINGING BOWL ACOUSTIC SYNTHESIZER */
    /* Produces fundamental 432Hz with natural Tibetan brass inharmonic overtones */
    /* -------------------------------------------------------------------------- */
    let audioCtx = null;

    function initAudio() {
      if (!audioCtx) {
        audioCtx = createAudioContext();
      }
      resumeAudioContext(audioCtx);
    }

    /**
     * Synthesizes authentic Himalayan singing bowl physics with multi-overtones
     * @param {number} baseFreq - Base frequency (e.g., 432Hz)
     * @param {string} desc - Description for toast message
     */
    function playSingingBowl(baseFreq = 432, desc = "Harmonic Sound Bath") {
      try {
        initAudio();
        const now = audioCtx.currentTime;

        // Sound duration & harmonic parameters tailored to antique bronze bowls
        const duration = 7.5; // gentle 7.5 second acoustic tail

        // Overtones characteristic of hammered Tibetan bell metal:
        // Fundamental, Octave + subtle detune, Minor 7th overtone, and higher chime
        const harmonics = [
          { freqMult: 1.000, gain: 0.45, decay: 7.0 },  // Fundamental (e.g., 432Hz)
          { freqMult: 2.012, gain: 0.22, decay: 5.5 },  // Octave with natural microtonal beating
          { freqMult: 2.760, gain: 0.12, decay: 4.0 },  // Inharmonic Tibetan brass ring
          { freqMult: 4.025, gain: 0.08, decay: 3.2 }   // High chime shimmer
        ];

        // Master Gain Node for soft ramp up and warm decay
        const masterGain = audioCtx.createGain();
        masterGain.connect(audioCtx.destination);
        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.exponentialRampToValueAtTime(0.7, now + 0.08); // Mallet contact attack
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        harmonics.forEach(h => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(baseFreq * h.freqMult, now);

          // Subtle LFO vibrato (0.4Hz) for signature acoustic bowl wave wobble
          const vibrato = audioCtx.createOscillator();
          const vibratoGain = audioCtx.createGain();
          vibrato.frequency.value = 1.2; // 1.2 Hz gentle pulsation
          vibratoGain.gain.value = 1.8; // subtle pitch modulation
          vibrato.connect(osc.frequency);
          vibrato.start(now);
          vibrato.stop(now + duration);

          gain.gain.setValueAtTime(h.gain, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(now);
          osc.stop(now + duration);
        });

        // Show Luxury Sound Notification Toast
        showSoundToast(desc);

        // Pulse the Hero Mandala
        pulseMandala();

      } catch (err) {
        console.warn("AudioContext initiated upon user interaction.", err);
      }
    }
