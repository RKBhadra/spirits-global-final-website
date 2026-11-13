    /* -------------------------------------------------------------------------- */
    /* SMART FALLBACK HANDLER: ZERO BROKEN IMAGES IN PREVIEW OR LOCAL             */
    /* -------------------------------------------------------------------------- */
    function handleSmartImageFallback(imgEl) {
      if (!imgEl) return;
      const photoId = parseInt(imgEl.getAttribute('data-photo-id'), 10);
      // If user already uploaded a custom photo in memory/IndexedDB, use it
      if (userLoadedPhotos[photoId]) {
        if (imgEl.src !== userLoadedPhotos[photoId]) {
          imgEl.src = userLoadedPhotos[photoId];
        }
        return;
      }
      // Otherwise use the curated high-resolution wellness photograph for this slot
      const meta = SPIRITS_PHOTO_MANIFEST[photoId];
      if (meta && imgEl.src !== meta.fallbackUrl) {
        imgEl.src = meta.fallbackUrl;
      }
    }
