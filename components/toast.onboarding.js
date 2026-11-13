    function showToast(msg) {
      const toast = document.getElementById('toast-notification');
      const msgEl = document.getElementById('toast-message');
      if (toast && msgEl) {
        msgEl.textContent = msg;
        toast.classList.remove('hidden');
        clearTimeout(window.toastTimer);
        window.toastTimer = setTimeout(() => {
          toast.classList.add('hidden');
        }, 3600);
      }
    }
