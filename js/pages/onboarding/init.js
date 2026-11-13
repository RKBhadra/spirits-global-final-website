    document.addEventListener('DOMContentLoaded', () => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const dateEl = document.getElementById('input-date');
      if (dateEl) {
        dateEl.value = nextWeek.toISOString().split('T')[0];
      }
      updatePricingDisplay();
    });
