    /* -------------------------------------------------------------------------- */
    /* HEADER GLASS SHADOW ON SCROLL & INITIAL VAULTHYDRATION                     */
    /* -------------------------------------------------------------------------- */
    window.addEventListener('scroll', () => {
      const header = document.getElementById('mainHeader');
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add('shadow-2xl', 'bg-obsidian-950/90');
        } else {
          header.classList.remove('shadow-2xl');
        }
      }
    });

    window.addEventListener('DOMContentLoaded', () => {
      loadPhotosFromDB();
    });
