/**
 * FKM SOLUTIONS - INTERACTIVE JAVASCRIPT
 * Turning Ideas into Intelligent Solutions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC CURRENT YEAR
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. STICKY NAVBAR SCROLL EFFECT
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // 3. STAT CARDS VIEWPORT COUNT-UP ANIMATION
  const stats = [
    { el: document.querySelector('.stat-card:nth-child(1) .stat-value'), target: 99.99, decimals: 2, suffix: '%' },
    { el: document.querySelector('.stat-card:nth-child(2) .stat-value'), target: 35, decimals: 0, suffix: '+' },
    { el: document.querySelector('.stat-card:nth-child(3) .stat-value'), target: 1.2, decimals: 1, suffix: 'M+' },
    { el: document.querySelector('.stat-card:nth-child(4) .stat-value'), target: 24, decimals: 0, prefix: '< ', suffix: 'h' }
  ];

  let animated = false;
  const statsGrid = document.getElementById('statsGrid');

  const animateStats = () => {
    if (animated || !statsGrid) return;
    const rect = statsGrid.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.9) {
      animated = true;
      const duration = 1400; // ms
      const startTime = performance.now();

      const step = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);

        stats.forEach(item => {
          if (!item.el) return;
          const currentVal = (item.target * easeOutQuad).toFixed(item.decimals);
          const prefix = item.prefix || '';
          const suffix = item.suffix || '';
          item.el.textContent = `${prefix}${currentVal}${suffix}`;
        });

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Final exact values
          stats.forEach(item => {
            if (!item.el) return;
            const prefix = item.prefix || '';
            const suffix = item.suffix || '';
            item.el.textContent = `${prefix}${item.target}${suffix}`;
          });
        }
      };
      requestAnimationFrame(step);
    }
  };

  window.addEventListener('scroll', animateStats, { passive: true });
  animateStats(); // In case already in view

  // 4. MOBILE DRAWER NAVIGATION
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const drawerContactBtn = document.getElementById('drawerContactBtn');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 5. DOMAIN TAB SWITCHER (AVIATION VS HOSPITALITY)
  const tabAviation = document.getElementById('tabAviation');
  const tabHospitality = document.getElementById('tabHospitality');
  const aviationPanel = document.getElementById('aviationPanel');
  const hospitalityPanel = document.getElementById('hospitalityPanel');

  const switchTab = (activeTab, activePanel, inactiveTab, inactivePanel) => {
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
    inactiveTab.classList.remove('active');
    inactiveTab.setAttribute('aria-selected', 'false');

    activePanel.style.display = 'block';
    activePanel.classList.add('active');
    inactivePanel.style.display = 'none';
    inactivePanel.classList.remove('active');
  };

  if (tabAviation && tabHospitality) {
    tabAviation.addEventListener('click', () => {
      switchTab(tabAviation, aviationPanel, tabHospitality, hospitalityPanel);
    });

    tabHospitality.addEventListener('click', () => {
      switchTab(tabHospitality, hospitalityPanel, tabAviation, aviationPanel);
    });
  }

  // 6. INTERACTIVE PROJECT ESTIMATOR
  const industryOptions = document.querySelectorAll('#industryOptions .option-btn');
  const moduleCheckboxes = document.querySelectorAll('#modulesGrid input[type="checkbox"]');
  const estimatedWeeksEl = document.getElementById('estimatedWeeks');
  const estimatedArchEl = document.getElementById('estimatedArch');
  const estimatorApplyBtn = document.getElementById('estimatorApplyBtn');

  let selectedIndustry = 'Enterprise Software';
  let baseWeeks = 8;

  const updateEstimator = () => {
    let totalWeeksMin = baseWeeks;
    let totalWeeksMax = baseWeeks + 3;
    let selectedModules = [];

    moduleCheckboxes.forEach(cb => {
      const parentLabel = cb.closest('.checkbox-card');
      if (cb.checked) {
        parentLabel.classList.add('checked');
        const addWeeks = parseInt(cb.getAttribute('data-add-weeks') || '2', 10);
        totalWeeksMin += addWeeks;
        totalWeeksMax += addWeeks + 1;
        selectedModules.push(cb.value);
      } else {
        parentLabel.classList.remove('checked');
      }
    });

    if (estimatedWeeksEl) {
      estimatedWeeksEl.textContent = `${totalWeeksMin} - ${totalWeeksMax} Weeks`;
    }

    if (estimatedArchEl) {
      if (selectedIndustry.includes('Aviation')) {
        estimatedArchEl.textContent = 'Event Telemetry & Redundant FAA Failover Cluster';
      } else if (selectedIndustry.includes('Hospitality')) {
        estimatedArchEl.textContent = 'High-Concurrency Booking Engine & PMS Bridge';
      } else {
        estimatedArchEl.textContent = 'Cloud Microservices + Reactive Multi-Platform';
      }
    }
  };

  industryOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      industryOptions.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      baseWeeks = parseInt(btn.getAttribute('data-base-weeks') || '8', 10);
      selectedIndustry = btn.querySelector('.option-title').textContent.trim();
      updateEstimator();
    });
  });

  moduleCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateEstimator);
  });

  if (estimatorApplyBtn) {
    estimatorApplyBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Pre-select service in form
      const serviceSelect = document.getElementById('projectService');
      if (serviceSelect) {
        if (selectedIndustry.includes('Aviation')) {
          serviceSelect.value = 'Aviation Dispatch & Operations';
        } else if (selectedIndustry.includes('Hospitality')) {
          serviceSelect.value = 'Hospitality Guest Systems';
        } else {
          serviceSelect.value = 'Enterprise Cloud & Software';
        }
      }

      // Pre-fill message
      const detailsInput = document.getElementById('projectDetails');
      if (detailsInput) {
        detailsInput.value = `Inquiring for ${selectedIndustry}. Estimated initial scope from solution configurator: ${estimatedWeeksEl ? estimatedWeeksEl.textContent : 'standard velocity'}.`;
        detailsInput.focus();
      }
    });
  }

  // 7. CONTACT MODAL FUNCTIONALITY
  const contactModal = document.getElementById('contactModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const navContactBtn = document.getElementById('navContactBtn');
  const btnAviationInquiry = document.getElementById('btnAviationInquiry');
  const btnHospitalityInquiry = document.getElementById('btnHospitalityInquiry');
  const modalSubjectInput = document.getElementById('modalSubject');
  const modalForm = document.getElementById('modalForm');
  const modalFeedback = document.getElementById('modalFeedback');

  window.openContactModal = (subject = '') => {
    if (!contactModal) return;
    if (modalSubjectInput && subject) {
      modalSubjectInput.value = subject;
    }
    if (typeof contactModal.showModal === 'function') {
      contactModal.showModal();
    } else {
      contactModal.setAttribute('open', 'true');
    }
  };

  const closeContactModal = () => {
    if (!contactModal) return;
    if (typeof contactModal.close === 'function') {
      contactModal.close();
    } else {
      contactModal.removeAttribute('open');
    }
  };

  if (navContactBtn) {
    navContactBtn.addEventListener('click', () => openContactModal('General Inquiry'));
  }
  if (drawerContactBtn) {
    drawerContactBtn.addEventListener('click', () => {
      closeDrawer();
      openContactModal('General Inquiry');
    });
  }
  if (btnAviationInquiry) {
    btnAviationInquiry.addEventListener('click', () => openContactModal('Aviation Dispatch Solutions'));
  }
  if (btnHospitalityInquiry) {
    btnHospitalityInquiry.addEventListener('click', () => openContactModal('Hospitality Guest Systems'));
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeContactModal);
  }

  // Close modal when clicking outside modal card
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      const rect = contactModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        closeContactModal();
      }
    });
  }

  // Target destination email requested by user
  const TARGET_EMAIL = 'Solutionsfkm@gmail.com';

  // Helper to trigger direct email and offer Gmail webmail fallback
  function dispatchInquiryEmail({ subject, body, feedbackEl, formEl, isModal = false }) {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_EMAIL)}&su=${encodedSubject}&body=${encodedBody}`;

    // Trigger default desktop/mobile email client
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      console.warn('Mail client trigger:', err);
    }

    if (feedbackEl) {
      feedbackEl.className = `${isModal ? 'modal-feedback' : 'form-feedback'} success`;
      feedbackEl.style.display = 'block';
      feedbackEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px; text-align: left;">
          <div>
            <strong>✓ Inquiry prepared for delivery to <span style="text-decoration: underline;">${TARGET_EMAIL}</span></strong>
          </div>
          <div style="font-size: 13px; line-height: 1.45; opacity: 0.95;">
            Your default email client has been launched with your details pre-filled. If it didn't open automatically, choose an option below to complete sending:
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
            <a href="${mailtoUrl}" style="display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; background: rgba(0, 0, 0, 0.15); border-radius: 6px; color: inherit; text-decoration: none; font-weight: 600; font-size: 12.5px; border: 1px solid rgba(255, 255, 255, 0.3);">
              ✉️ Open Mail App
            </a>
            <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 5px; padding: 6px 12px; background: rgba(24, 119, 242, 0.25); border-radius: 6px; color: inherit; text-decoration: none; font-weight: 600; font-size: 12.5px; border: 1px solid rgba(24, 119, 242, 0.4);">
              🌐 Send via Web Gmail ↗
            </a>
          </div>
        </div>
      `;
    }

    if (formEl) {
      formEl.reset();
    }
  }

  // Modal form submit
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName')?.value.trim() || 'Client';
      const email = document.getElementById('modalEmail')?.value.trim() || 'Not provided';
      const subject = document.getElementById('modalSubject')?.value.trim() || 'General Project Inquiry';
      const message = document.getElementById('modalMessage')?.value.trim() || '';

      const emailSubject = `[FKM Solutions Inquiry] ${subject} - ${name}`;
      const emailBody = `NEW PROJECT INQUIRY - FKM SOLUTIONS\n` +
        `----------------------------------------\n` +
        `Client Name: ${name}\n` +
        `Work Email: ${email}\n` +
        `Area / Subject: ${subject}\n\n` +
        `Project Brief & Requirements:\n` +
        `${message}\n` +
        `----------------------------------------\n` +
        `Direct recipient: ${TARGET_EMAIL}\n` +
        `Sent via FKM Solutions Corporate Portal`;

      dispatchInquiryEmail({
        subject: emailSubject,
        body: emailBody,
        feedbackEl: modalFeedback,
        formEl: modalForm,
        isModal: true
      });
    });
  }

  // 8. MAIN CONTACT FORM SUBMISSION ("Send Project Inquiry")
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('fullName')?.value.trim() || 'Client';
      const workEmail = document.getElementById('workEmail')?.value.trim() || 'Not provided';
      const companyName = document.getElementById('companyName')?.value.trim() || 'Not specified';
      const projectService = document.getElementById('projectService')?.value || 'General Inquiry';
      const projectDetails = document.getElementById('projectDetails')?.value.trim() || '';

      const emailSubject = `[FKM Solutions Inquiry] ${projectService} - ${fullName} (${companyName})`;
      const emailBody = `NEW PROJECT INQUIRY - FKM SOLUTIONS\n` +
        `========================================\n` +
        `Client Name: ${fullName}\n` +
        `Work Email: ${workEmail}\n` +
        `Company / Organization: ${companyName}\n` +
        `Primary Area of Interest: ${projectService}\n\n` +
        `Project Overview & Requirements:\n` +
        `${projectDetails}\n` +
        `========================================\n` +
        `Direct recipient: ${TARGET_EMAIL}\n` +
        `Sent via FKM Solutions Corporate Portal`;

      dispatchInquiryEmail({
        subject: emailSubject,
        body: emailBody,
        feedbackEl: formFeedback,
        formEl: contactForm,
        isModal: false
      });
    });
  }
});
