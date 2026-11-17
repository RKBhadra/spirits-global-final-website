    /* -------------------------------------------------------------------------- */
    /* PHOTO SYNC STUDIO MODAL & LIVE 10-SLOT GRID                                */
    /* -------------------------------------------------------------------------- */
    function openPhotoSyncStudio() {
      const modal = document.getElementById('photoSyncModal');
      if (modal) {
        renderPhotoVaultGrid();
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
      }
    }

    function closePhotoSyncStudio(event, force = false) {
      if (force || (event && event.target.id === 'photoSyncModal')) {
        const modal = document.getElementById('photoSyncModal');
        if (modal) {
          modal.classList.remove('opacity-100', 'pointer-events-auto');
          modal.classList.add('opacity-0', 'pointer-events-none');
          document.body.style.overflow = '';
        }
      }
    }

    function renderPhotoVaultGrid() {
      const grid = document.getElementById('photoVaultGrid');
      if (!grid) return;
      grid.innerHTML = '';

      Object.values(SPIRITS_PHOTO_MANIFEST).forEach(meta => {
        const sampleImg = document.querySelector(`img[data-photo-id="${meta.id}"]`);
        const currentSrc = userLoadedPhotos[meta.id] || (sampleImg ? sampleImg.src : meta.fallbackUrl);
        const isCustomSynced = Boolean(userLoadedPhotos[meta.id]);

        /*
        const card = document.createElement('div');
        card.className = 'relative rounded-xl overflow-hidden border border-gold-500/30 bg-obsidian-950 group cursor-pointer flex flex-col';
        card.onclick = () => triggerSinglePhotoUpload(meta.id);
        card.innerHTML = `
          <div class="aspect-square w-full overflow-hidden bg-obsidian-900 relative">
            <img src="${currentSrc}" alt="${meta.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform">
            <span class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono uppercase ${isCustomSynced ? 'bg-gold-500 text-obsidian-950 font-bold' : 'bg-obsidian-950/85 text-gold-400 border border-gold-500/30'}">
              #${String(meta.id).padStart(2, '0')} ${isCustomSynced ? '• Synced' : ''}
            </span>
          </div>*/
          <div class="p-2 text-left">
            <p class="text-[10px] text-champagne font-medium truncate">${meta.title}</p>
            <p class="text-[9px] text-neutral-500 truncate">${meta.filename}</p>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    /* -------------------------------------------------------------------------- */
    /* 1-CLICK EXPORT SELF-CONTAINED HTML WITH EMBEDDED PHOTOS                    */
    /* -------------------------------------------------------------------------- */
    function isSameOrigin(url) {
      try {
        return new URL(url, document.baseURI).origin === window.location.origin;
      } catch (error) {
        return false;
      }
    }

    async function inlineExternalStyles(doc) {
      const links = Array.from(doc.querySelectorAll('link[rel="stylesheet"][href]'));
      for (const link of links) {
        if (!isSameOrigin(link.href)) continue;
        try {
          const response = await fetch(link.href);
          if (!response.ok) continue;
          const style = document.createElement('style');
          style.textContent = await response.text();
          link.replaceWith(style);
        } catch (error) {
          console.warn('Could not inline stylesheet for export:', link.href);
        }
      }
    }

    async function inlineExternalScripts(doc) {
      const scripts = Array.from(doc.querySelectorAll('script[src]'));
      for (const script of scripts) {
        if (!isSameOrigin(script.src)) continue;
        try {
          const response = await fetch(script.src);
          if (!response.ok) continue;
          const inlineScript = document.createElement('script');
          Array.from(script.attributes).forEach(attr => {
            if (attr.name !== 'src') inlineScript.setAttribute(attr.name, attr.value);
          });
          inlineScript.textContent = await response.text();
          script.replaceWith(inlineScript);
        } catch (error) {
          console.warn('Could not inline script for export:', script.src);
        }
      }
    }

    async function exportEmbeddedHTML() {
      const cloneDoc = document.documentElement.cloneNode(true);
      // Bake every current image source directly into the cloned HTML
      Object.values(SPIRITS_PHOTO_MANIFEST).forEach(meta => {
        const liveImg = document.querySelector(`img[data-photo-id="${meta.id}"]`);
        const activeSrc = userLoadedPhotos[meta.id] || (liveImg ? liveImg.src : meta.fallbackUrl);
        const targetImgs = cloneDoc.querySelectorAll(`img[data-photo-id="${meta.id}"]`);
        targetImgs.forEach(img => {
          img.setAttribute('src', activeSrc);
        });
      });

      // Keep the exported file self-contained when served over HTTP.
      await inlineExternalStyles(cloneDoc);
      await inlineExternalScripts(cloneDoc);

      const htmlContent = '<!DOCTYPE html>\n' + cloneDoc.outerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'luxury_portfolio.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSoundToast('Exported Self-Contained luxury_portfolio.html');
    }

    // Global Drag-and-Drop Listener so user can drop their 10 photos anywhere on the page
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    window.addEventListener('drop', (e) => {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleBulkFilesSelected(e.dataTransfer.files);
      }
    });
