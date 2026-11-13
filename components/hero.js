    /* -------------------------------------------------------------------------- */
    /* HERO MANDALA INTERACTIVE PULSE                                             */
    /* -------------------------------------------------------------------------- */
    function pulseMandala() {
      const mandala = document.getElementById('heroMandala');
      if (mandala) {
        mandala.classList.add('scale-105', 'opacity-95');
        mandala.style.filter = 'drop-shadow(0 0 35px rgba(212, 175, 55, 0.7))';
        setTimeout(() => {
          mandala.classList.remove('scale-105', 'opacity-95');
          mandala.style.filter = '';
        }, 1200);
      }
    }
