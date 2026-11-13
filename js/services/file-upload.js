    /* -------------------------------------------------------------------------- */
    /* SINGLE & BULK PHOTO UPLOAD + FILENAME AUTO-MATCHING                        */
    /* -------------------------------------------------------------------------- */
    function triggerSinglePhotoUpload(photoId) {
      activeSingleUploadPhotoId = Number(photoId);
      const input = document.getElementById('singlePhotoInput');
      if (input) {
        input.value = '';
        input.click();
      }
    }

    function handleSingleFileSelected(files) {
      if (!files || !files.length || !activeSingleUploadPhotoId) return;
      const file = files[0];
      const targetId = activeSingleUploadPhotoId;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        userLoadedPhotos[targetId] = dataUrl;
        applyPhotoToDOM(targetId, dataUrl);
        savePhotoToDB(targetId, dataUrl);
        renderPhotoVaultGrid();
        showSoundToast(`Updated Photo #${targetId}: ${SPIRITS_PHOTO_MANIFEST[targetId].title}`);
      };
      reader.readAsDataURL(file);
    }

    function handleBulkFilesSelected(files) {
      if (!files || !files.length) return;
      const fileArray = Array.from(files);
      const unmatchedFiles = [];
      const usedSlots = new Set();

      // Pass 1: Match by exact or partial filename (e.g., IMG_1698.jpg, 810281314...)
      fileArray.forEach(file => {
        const cleanName = file.name.trim().toLowerCase();
        let matchedId = null;
        for (const [id, meta] of Object.entries(SPIRITS_PHOTO_MANIFEST)) {
          const targetName = meta.filename.toLowerCase();
          const targetStem = targetName.split('_')[0]; // e.g., '810281314' or 'img'
          if (cleanName === targetName || cleanName.includes(targetName.replace('.jpg', '')) || (targetStem.length > 5 && cleanName.includes(targetStem))) {
            matchedId = Number(id);
            break;
          }
        }
        if (matchedId) {
          usedSlots.add(matchedId);
          readAndAssignFile(file, matchedId);
        } else {
          unmatchedFiles.push(file);
        }
      });

      // Pass 2: Assign any remaining files sequentially to open slots 1..10
      let nextSlot = 1;
      unmatchedFiles.forEach(file => {
        while (usedSlots.has(nextSlot) && nextSlot <= 10) {
          nextSlot++;
        }
        if (nextSlot <= 10) {
          usedSlots.add(nextSlot);
          readAndAssignFile(file, nextSlot);
          nextSlot++;
        }
      });

      showSoundToast(`Synced ${fileArray.length} Photograph(s) Across Portfolio`);
    }

    function readAndAssignFile(file, photoId) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        userLoadedPhotos[photoId] = dataUrl;
        applyPhotoToDOM(photoId, dataUrl);
        savePhotoToDB(photoId, dataUrl);
        renderPhotoVaultGrid();
      };
      reader.readAsDataURL(file);
    }
