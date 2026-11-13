    /* -------------------------------------------------------------------------- */
    /* LUXURY SOUND TOAST NOTIFICATION                                            */
    /* -------------------------------------------------------------------------- */
    let toastTimeout = null;
    function showSoundToast(text) {
      const toast = document.getElementById('soundToast');
      const toastText = document.getElementById('soundToastText');
      if (toast && toastText) {
        toastText.innerText = text;
        toast.classList.remove('translate-y-24', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
          toast.classList.remove('translate-y-0', 'opacity-100');
          toast.classList.add('translate-y-24', 'opacity-0');
        }, 4000);
      }
    }
