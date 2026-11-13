    function goToFormStep(stepNumber) {
      if (stepNumber === 2) {
        const org = document.getElementById('input-org').value.trim();
        const name = document.getElementById('input-name').value.trim();
        const email = document.getElementById('input-email').value.trim();
        if (!org || !name || !email) {
          showToast('Please enter Organization Name, Contact Name, and Official Email.');
          return;
        }
      }

      [1, 2, 3, 4].forEach(s => {
        const stepEl = document.getElementById(`form-step-${s}`);
        if (stepEl) stepEl.classList.add('hidden');
        const ind = document.getElementById(`step-indicator-${s}`);
        if (ind) {
          ind.className = 'text-left p-3 rounded-xl border border-gold-400/20 bg-obsidian-900/60 opacity-60 transition-all';
        }
      });

      const targetStep = document.getElementById(`form-step-${stepNumber}`);
      if (targetStep) targetStep.classList.remove('hidden');
      const activeInd = document.getElementById(`step-indicator-${stepNumber}`);
      if (activeInd) {
        activeInd.className = 'text-left p-3 rounded-xl border border-gold-400 bg-gold-400/15 transition-all';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    function selectSector(sectorName) {
      document.getElementById('input-sector').value = sectorName;
      document.querySelectorAll('.sector-card').forEach(c => c.classList.remove('gold-border-active'));
      if (sectorName.includes('MNC')) document.getElementById('sector-card-mnc')?.classList.add('gold-border-active');
      if (sectorName.includes('University')) document.getElementById('sector-card-uni')?.classList.add('gold-border-active');
      if (sectorName.includes('Luxury')) document.getElementById('sector-card-hotel')?.classList.add('gold-border-active');
    }


    function validateCorporateEmail(val) {
      const genericDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const domain = val.split('@')[1]?.toLowerCase();
      const hint = document.getElementById('email-domain-hint');
      if (hint) {
        if (domain && genericDomains.includes(domain)) {
          hint.classList.remove('hidden');
        } else {
          hint.classList.add('hidden');
        }
      }
    }


    function handleFormSubmit(e) {
      e.preventDefault();

      const sector = document.getElementById('input-sector').value;
      const org = document.getElementById('input-org').value.trim();
      const name = document.getElementById('input-name').value.trim();
      const email = document.getElementById('input-email').value.trim();
      const phone = document.getElementById('input-phone').value.trim();
      const volume = document.getElementById('input-volume').value;
      const location = document.getElementById('input-location').value.trim();
      const format = document.getElementById('input-format').value;
      const date = document.getElementById('input-date').value;

      const challenges = Array.from(document.querySelectorAll('input[name="challenges"]:checked')).map(cb => cb.value);
      const modality = document.querySelector('input[name="modality"]:checked')?.value || 'Full IKS Hybrid Flagship';

      let amount = 1111;
      let tierLabel = '$1,111 USD (Per-Institution Session)';
      let paymentMethod = document.getElementById('input-payment-method')?.value || 'PO Net-15';

      if (currentPricingTier === 'PROMO_WAIVED') {
        amount = 0;
        tierLabel = 'COMPLIMENTARY PILOT ($0 USD — Waived)';
        paymentMethod = `Custom Voucher (${document.getElementById('input-promo').value.trim().toUpperCase()})`;
      } else if (currentPricingTier === 'YEARLY_RETAINER') {
        amount = 11111;
        tierLabel = '$11,111 USD (Yearly Institutional Partnership)';
      }

      const bookingId = `SG-2026-${Math.floor(100 + Math.random() * 899)}`;

      const newClient = {
        id: bookingId,
        createdAt: date || new Date().toISOString().split('T')[0],
        org,
        sector,
        name,
        email,
        phone,
        location,
        volume,
        challenges,
        modality,
        format,
        tier: currentPricingTier === 'PROMO_WAIVED' ? 'FREE_PILOT' : 'PAID_B2B',
        amount,
        paymentMethod,
        status: currentPricingTier === 'PROMO_WAIVED' ? 'Pilot Onboarded' : 'Institutional Registration Confirmed',
        rating: null,
        reviewText: '',
        outcomes: []
      };
      saveClientRecord(newClient);

      // Populate Step 4 Session Pass
      document.getElementById('pass-booking-id').textContent = bookingId;
      document.getElementById('pass-org').textContent = `${org} (${location})`;
      document.getElementById('pass-sector').textContent = `${sector} • POC: ${name}`;
      document.getElementById('pass-modality').textContent = modality;
      document.getElementById('pass-format').textContent = `${format} • ${volume}`;
      document.getElementById('pass-tier').textContent = tierLabel;
      document.getElementById('pass-date').textContent = `Target Window: ${date} • ${paymentMethod}`;

      goToFormStep(4);
      showToast(`Registration confirmed for ${org}! Session pass issued.`);
    }

    function resetForm() {
      document.getElementById('client-onboarding-form').reset();
      document.getElementById('input-promo').value = '';
      isPromoApplied = false;
      currentPricingTier = 'SINGLE_SESSION';
      document.getElementById('complimentary-voucher-banner')?.classList.add('hidden');
      updatePricingDisplay();
      goToFormStep(1);
    }
