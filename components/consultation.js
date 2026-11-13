    /* -------------------------------------------------------------------------- */
    /* CONSULTATION BOOKING MODAL                                                 */
    /* -------------------------------------------------------------------------- */
    function openConsultationModal(preselectedProgram = '') {
      const modal = document.getElementById('consultationModal');
      const select = document.getElementById('programSelect');
      const form = document.getElementById('consultationForm');
      const success = document.getElementById('bookingSuccessBox');

      if (modal) {
        if (form) form.classList.remove('hidden');
        if (success) success.classList.add('hidden');

        if (preselectedProgram && select) {
          select.value = preselectedProgram;
        }

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeConsultationModal() {
      const modal = document.getElementById('consultationModal');
      if (modal) {
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
      }
    }

    function handleConsultationSubmit(e) {
      e.preventDefault();
      const form = document.getElementById('consultationForm');
      const success = document.getElementById('bookingSuccessBox');
      
      // Play affirmative soft harmonic tone upon reservation dispatch
      playSingingBowl(528, 'Confidential Dossier Transmission Complete');

      if (form && success) {
        form.classList.add('hidden');
        success.classList.remove('hidden');
      }
    }
