    /* -------------------------------------------------------------------------- */
    /* EXPERIENCE GALLERY CATEGORY FILTER                                         */
    /* -------------------------------------------------------------------------- */
    function filterGallery(category, btnElement) {
      const buttons = document.querySelectorAll('#galleryFilters .filter-btn');
      buttons.forEach(b => {
        b.className = 'filter-btn px-4 py-2 rounded-full text-xs uppercase tracking-widest bg-obsidian-900 border border-gold-500/20 text-neutral-400 hover:text-gold-300 transition-all';
      });
      btnElement.className = 'filter-btn px-4 py-2 rounded-full text-xs uppercase tracking-widest bg-gold-500 text-obsidian-950 font-semibold transition-all shadow-md';

      const items = document.querySelectorAll('#portfolioGrid .gallery-item');
      items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'block';
          item.classList.add('animate-fadeIn');
        } else {
          item.style.display = 'none';
        }
      });
    }
