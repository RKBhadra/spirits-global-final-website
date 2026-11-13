    // In-memory cache of user-loaded DataURLs keyed by photoId (1..10)
    const userLoadedPhotos = {};
    let activeSingleUploadPhotoId = null;
    let currentLightboxPhotoId = 1;

    /* -------------------------------------------------------------------------- */
    /* INDEXEDDB PERSISTENCE FOR USER-UPLOADED PHOTOS                             */
    /* -------------------------------------------------------------------------- */
    const DB_NAME = 'SpiritsGlobalPhotoVaultDB';
    const STORE_NAME = 'photos';

    function openPhotoDB() {
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }

    async function savePhotoToDB(photoId, dataUrl) {
      try {
        const db = await openPhotoDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put({ id: Number(photoId), dataUrl });
      } catch (e) {
        console.warn('IndexedDB storage skipped:', e);
      }
    }

    async function loadPhotosFromDB() {
      try {
        const db = await openPhotoDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAll();
        req.onsuccess = () => {
          const records = req.result || [];
          records.forEach(rec => {
            if (rec && rec.id && rec.dataUrl) {
              userLoadedPhotos[rec.id] = rec.dataUrl;
              applyPhotoToDOM(rec.id, rec.dataUrl);
            }
          });
          renderPhotoVaultGrid();
        };
      } catch (e) {
        console.warn('IndexedDB read skipped:', e);
      }
    }

    async function resetPhotoVault() {
      try {
        const db = await openPhotoDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).clear();
      } catch (e) {}
      Object.keys(userLoadedPhotos).forEach(k => delete userLoadedPhotos[k]);
      Object.values(SPIRITS_PHOTO_MANIFEST).forEach(meta => {
        const imgs = document.querySelectorAll(`img[data-photo-id="${meta.id}"]`);
        imgs.forEach(img => {
          img.src = './' + meta.filename;
        });
      });
      renderPhotoVaultGrid();
      showSoundToast('Photo Vault Reset to Default Paths');
    }

    function applyPhotoToDOM(photoId, dataUrl) {
      const imgs = document.querySelectorAll(`img[data-photo-id="${photoId}"]`);
      imgs.forEach(img => {
        img.src = dataUrl;
      });
      // If lightbox is currently showing this photo, update it live
      const lbModal = document.getElementById('lightboxModal');
      if (lbModal && lbModal.classList.contains('opacity-100') && currentLightboxPhotoId === Number(photoId)) {
        const lbImg = document.getElementById('lightboxImg');
        if (lbImg) lbImg.src = dataUrl;
      }
    }
