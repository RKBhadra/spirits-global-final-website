    let currentPricingTier = 'SINGLE_SESSION'; // 'SINGLE_SESSION' ($1111), 'YEARLY_RETAINER' ($11111), or 'PROMO_WAIVED' ($0)
    let isPromoApplied = false;

    function selectPricingMode(mode) {
      if (isPromoApplied && mode !== 'PROMO_WAIVED') {
        isPromoApplied = false;
        document.getElementById('complimentary-voucher-banner')?.classList.add('hidden');
        document.getElementById('promo-status-msg').textContent = 'Custom promo cleared. Standard rate selected.';
      }
      currentPricingTier = mode;
      updatePricingDisplay();
    }


    function updatePricingDisplay() {
      const singleCard = document.getElementById('tier-card-single');
      const yearlyCard = document.getElementById('tier-card-yearly');
      const billingModule = document.getElementById('billing-payment-module');
      const amountDisplay = document.getElementById('billing-amount-display');

      if (currentPricingTier === 'PROMO_WAIVED') {
        singleCard?.classList.remove('gold-border-active');
        yearlyCard?.classList.remove('gold-border-active');
        billingModule?.classList.add('hidden');
      } else if (currentPricingTier === 'YEARLY_RETAINER') {
        yearlyCard?.classList.add('gold-border-active');
        singleCard?.classList.remove('gold-border-active');
        billingModule?.classList.remove('hidden');
        if (amountDisplay) amountDisplay.textContent = '$11,111 USD';
      } else {
        // SINGLE_SESSION ($1,111)
        singleCard?.classList.add('gold-border-active');
        yearlyCard?.classList.remove('gold-border-active');
        billingModule?.classList.remove('hidden');
        if (amountDisplay) amountDisplay.textContent = '$1,111 USD';
      }
    }


    function evaluatePromoCode() {
      const code = document.getElementById('input-promo').value.trim().toUpperCase();
      const statusMsg = document.getElementById('promo-status-msg');
      const voucherBanner = document.getElementById('complimentary-voucher-banner');

      if (!code) {
        showToast('Please enter your invitation / pilot code.');
        statusMsg.textContent = 'Please enter a code to apply.';
        return;
      }

      if (VALID_PROMO_CODES.includes(code)) {
        isPromoApplied = true;
        currentPricingTier = 'PROMO_WAIVED';
        voucherBanner?.classList.remove('hidden');
        statusMsg.textContent = `✓ Code ${code} verified: $1,111 fee waived to $0 complimentary pilot.`;
        updatePricingDisplay();
        showToast(`Code ${code} accepted! Session waived to $0.`);
      } else {
        isPromoApplied = false;
        voucherBanner?.classList.add('hidden');
        statusMsg.textContent = `⚠️ Code "${code}" not recognized. Standard fee ($1,111 per session or $11,111 yearly) applies.`;
        showToast('Invalid code. Please contact Spirits Global for an invitation.');
      }
    }
