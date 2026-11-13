    /* -------------------------------------------------------------------------- */
    /* FULLSCREEN LIGHTBOX FUNCTIONALITY (BY PHOTO ID OR DIRECT URL)              */
    /* -------------------------------------------------------------------------- */
    function openLightboxByPhotoId(photoId) {
      currentLightboxPhotoId = Number(photoId);
      const meta = SPIRITS_PHOTO_MANIFEST[currentLightboxPhotoId];
      const liveImg = document.querySelector(`img[data-photo-id="${currentLightboxPhotoId}"]`);
      const resolvedSrc = userLoadedPhotos[currentLightboxPhotoId] || (liveImg ? (liveImg.currentSrc || liveImg.src) : meta.fallbackUrl);
      openLightbox(resolvedSrc, meta.title, meta.desc);
    }

    function openLightbox(imgSrc, title, desc) {
      const modal = document.getElementById('lightboxModal');
      const img = document.getElementById('lightboxImg');
      const titleEl = document.getElementById('lightboxTitle');
      const descEl = document.getElementById('lightboxDesc');

      if (modal && img) {
        img.src = imgSrc;
        titleEl.textContent = title || 'Spirits Global Luxury Sanctuary';
        descEl.textContent = desc || 'Acoustic resonance, somatic alignment, and executive wellness architecture.';

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeLightbox(event, force = false) {
      if (force || (event && event.target.id === 'lightboxModal')) {
        const modal = document.getElementById('lightboxModal');
        if (modal) {
          modal.classList.remove('opacity-100', 'pointer-events-auto');
          modal.classList.add('opacity-0', 'pointer-events-none');
          document.body.style.overflow = '';
        }
      }
    }

    // Escape key listener for modal closing
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox(null, true);
        closeConsultationModal();
        closePhotoSyncStudio(null, true);
      }
    });
