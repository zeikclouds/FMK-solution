/**
 * FKM SOLUTIONS - INTERACTIVE APPLICATION CONTROLLER
 * A Premier Technology Innovation Partner
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initEstimator();
  initContactForm();
  initSmoothScroll();
  initVisualTabs();
  initVideoControls();
  initLightbox();
  initBackToTop();
  initCardTilt();
});

/* ==========================================================================
   1. NAVBAR & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinksItems = document.querySelectorAll('.nav-link');

  // Sticky navbar with blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Active section observer
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-links a[href*='${sectionId}']`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================================
   2. ANIMATED NUMBER COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1500; // ms
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = isDecimal ? target.toFixed(1) : target;
              clearInterval(timer);
            } else {
              counter.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsBanner = document.querySelector('.hero-stats-banner');
  if (statsBanner) {
    observer.observe(statsBanner);
  }
}

/* ==========================================================================
   3. INTERACTIVE PROJECT SCOPE ESTIMATOR
   ========================================================================== */
const estimatorData = {
  'Custom Software': {
    time: '6 - 10 Weeks',
    team: 'Lead Architect, 2 Senior Full-Stack Engineers, QA Lead',
    serviceKey: 'Custom Software'
  },
  'Mobile Applications': {
    time: '8 - 12 Weeks',
    team: 'Mobile Architect (iOS/Android), UI/UX Designer, Cloud Backend Dev, QA',
    serviceKey: 'Mobile Applications'
  },
  'Aviation Tech': {
    time: '8 - 14 Weeks',
    team: 'Aviation Systems Architect, 2 High-Throughput Engineers, Integration Specialist',
    serviceKey: 'Aviation Ecosystems'
  },
  'Hospitality Tech': {
    time: '6 - 10 Weeks',
    team: 'Hospitality Solutions Lead, PMS Integrator, Senior Frontend Dev, QA',
    serviceKey: 'Hospitality Solutions'
  },
  'Process Automation': {
    time: '3 - 6 Weeks',
    team: 'RPA & Automation Specialist, Integration Engineer, Workflow Analyst',
    serviceKey: 'Process Automation'
  },
  'Digital Strategy': {
    time: '2 - 4 Weeks',
    team: 'Principal Consultant, Enterprise Solutions Architect, Data Analyst',
    serviceKey: 'Digital Strategy'
  }
};

let currentTrack = 'Custom Software';
let currentScale = 'Growth Platform';

function initEstimator() {
  const serviceButtons = document.querySelectorAll('#serviceOptions .calc-option-btn');
  const scaleButtons = document.querySelectorAll('#scaleOptions .calc-option-btn');
  const addonCloud = document.getElementById('addonCloud');
  const addonSecurity = document.getElementById('addonSecurity');
  const addonSLA = document.getElementById('addonSLA');

  const estTrack = document.getElementById('estTrack');
  const estScale = document.getElementById('estScale');
  const estTimeline = document.getElementById('estTimeline');
  const estTeam = document.getElementById('estTeam');
  const applyBtn = document.getElementById('applyEstimateBtn');

  function updateEstimate() {
    const trackInfo = estimatorData[currentTrack] || estimatorData['Custom Software'];
    
    // Calculate timeline adjustments
    let timeText = trackInfo.time;
    if (currentScale === 'Rapid MVP') {
      timeText = currentTrack === 'Digital Strategy' ? '1 - 2 Weeks' : '4 - 6 Weeks';
    } else if (currentScale === 'Enterprise Modernization') {
      timeText = currentTrack === 'Digital Strategy' ? '4 - 8 Weeks' : '12 - 18 Weeks';
    }

    // Add-on notations
    let teamText = trackInfo.team;
    if (addonCloud && addonCloud.checked) {
      teamText += ', DevOps Engineer';
    }
    if (addonSecurity && addonSecurity.checked) {
      teamText += ', SecOps Specialist';
    }
    if (addonSLA && addonSLA.checked) {
      teamText += ' + Dedicated Support Tier';
    }

    if (estTrack) estTrack.textContent = currentTrack;
    if (estScale) estScale.textContent = currentScale;
    if (estTimeline) estTimeline.textContent = timeText;
    if (estTeam) estTeam.textContent = teamText;
  }

  // Track button events
  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTrack = btn.getAttribute('data-service');
      updateEstimate();
    });
  });

  // Scale button events
  scaleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      scaleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentScale = btn.getAttribute('data-scale');
      updateEstimate();
    });
  });

  // Addon checkbox events
  [addonCloud, addonSecurity, addonSLA].forEach(chk => {
    if (chk) chk.addEventListener('change', updateEstimate);
  });

  // Apply Estimate to Consultation Form
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const trackInfo = estimatorData[currentTrack];
      const targetServiceKey = (trackInfo && trackInfo.serviceKey) ? trackInfo.serviceKey : currentTrack;
      selectServiceInForm(targetServiceKey);

      const messageField = document.getElementById('clientMessage');
      if (messageField) {
        messageField.value = `[Estimator Configuration]\nIndustry / Service Track: ${currentTrack}\nProject Scale: ${currentScale}\nRequested Timeline: ${estTimeline ? estTimeline.textContent : 'Standard'}\n\nProject Overview & Requirements:\n`;
        messageField.focus();
      }

      // Smooth scroll to contact section
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  updateEstimate();
}

/* ==========================================================================
   4. HELPER: SELECT SERVICE IN CONTACT FORM
   ========================================================================== */
function selectServiceInForm(serviceName) {
  const serviceDropdown = document.getElementById('clientService');
  if (serviceDropdown) {
    for (let i = 0; i < serviceDropdown.options.length; i++) {
      if (serviceDropdown.options[i].value === serviceName) {
        serviceDropdown.selectedIndex = i;
        break;
      }
    }
  }

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Make available globally for inline onclick
window.selectServiceInForm = selectServiceInForm;

/* ==========================================================================
   5. CONSULTATION FORM SUBMISSION HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultationForm');
  const statusMsg = document.getElementById('formStatusMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const service = document.getElementById('clientService').value;

      if (!name || !email || !service) {
        alert('Please fill out all required fields marked with *');
        return;
      }

      // Display simulated high-touch submission confirmation
      if (statusMsg) {
        statusMsg.innerHTML = `
          <strong>Thank you, ${name}!</strong><br>
          Your consultation request for <em>${service}</em> has been securely received.<br>
          A Senior Technical Consultant from <strong>FKM Solutions</strong> will review your details and contact you at <code>${email}</code> within 24 business hours.
        `;
        statusMsg.className = 'form-status-msg success';
        statusMsg.style.display = 'block';

        // Reset form inputs except status
        form.reset();

        // Auto-dismiss or keep visible
        setTimeout(() => {
          statusMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    });
  }
}

/* ==========================================================================
   6. SMOOTH SCROLLING FOR ALL INTERNAL ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   7. HERO VISUAL TABS SWITCHER (Video, Slide & Neural Core)
   ========================================================================== */
function initVisualTabs() {
  const tabVideo = document.getElementById('tabHeroVideo');
  const tabPitch = document.getElementById('tabPitchDeck');
  const tabNeural = document.getElementById('tabNeuralCore');

  const viewVideo = document.getElementById('viewHeroVideo');
  const viewPitch = document.getElementById('viewPitchDeck');
  const viewNeural = document.getElementById('viewNeuralCore');

  const heroVideo = document.getElementById('heroInlineVideo');

  const setTab = (activeTab, activeView) => {
    [tabVideo, tabPitch, tabNeural].forEach(t => t && t.classList.remove('active'));
    [viewVideo, viewPitch, viewNeural].forEach(v => {
      if (v) {
        v.classList.remove('active');
        v.style.display = 'none';
      }
    });

    if (activeTab) activeTab.classList.add('active');
    if (activeView) {
      activeView.classList.add('active');
      activeView.style.display = 'block';
    }

    // Pause hero video if switching to other views, play when active
    if (heroVideo) {
      if (activeView === viewVideo) {
        heroVideo.play().catch(() => {});
      } else {
        heroVideo.pause();
      }
    }
  };

  if (tabVideo && viewVideo) {
    tabVideo.addEventListener('click', () => setTab(tabVideo, viewVideo));
  }
  if (tabPitch && viewPitch) {
    tabPitch.addEventListener('click', () => setTab(tabPitch, viewPitch));
  }
  if (tabNeural && viewNeural) {
    tabNeural.addEventListener('click', () => setTab(tabNeural, viewNeural));
  }
}

/* ==========================================================================
   7b. VIDEO PLAYBACK & OVERLAY CONTROLS
   ========================================================================== */
function initVideoControls() {
  const heroVideo = document.getElementById('heroInlineVideo');
  const playPauseBtn = document.getElementById('heroVideoPlayPauseBtn');
  const muteBtn = document.getElementById('heroVideoMuteBtn');

  if (heroVideo && playPauseBtn) {
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');

    playPauseBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play().then(() => {
          if (playIcon) playIcon.style.display = 'none';
          if (pauseIcon) pauseIcon.style.display = 'block';
        }).catch(() => {});
      } else {
        heroVideo.pause();
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
      }
    });

    heroVideo.addEventListener('play', () => {
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'block';
    });

    heroVideo.addEventListener('pause', () => {
      if (playIcon) playIcon.style.display = 'block';
      if (pauseIcon) pauseIcon.style.display = 'none';
    });
  }

  if (heroVideo && muteBtn) {
    const mutedIcon = muteBtn.querySelector('.muted-icon');
    const unmutedIcon = muteBtn.querySelector('.unmuted-icon');

    muteBtn.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      if (heroVideo.muted) {
        if (mutedIcon) mutedIcon.style.display = 'block';
        if (unmutedIcon) unmutedIcon.style.display = 'none';
      } else {
        if (mutedIcon) mutedIcon.style.display = 'none';
        if (unmutedIcon) unmutedIcon.style.display = 'block';
      }
    });
  }

  // Intersection observer to auto-pause video when scrolled out of viewport
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (!entry.isIntersecting) {
          if (!video.paused) {
            video.pause();
            video.dataset.wasPlaying = 'true';
          }
        } else {
          if (video.dataset.wasPlaying === 'true' && video.id === 'heroInlineVideo') {
            const viewVideo = document.getElementById('viewHeroVideo');
            if (viewVideo && viewVideo.style.display !== 'none') {
              video.play().catch(() => {});
            }
          }
        }
      });
    }, { threshold: 0.25 });

    if (heroVideo) videoObserver.observe(heroVideo);
    const theaterVideo = document.getElementById('theaterVideo');
    if (theaterVideo) videoObserver.observe(theaterVideo);
  }
}

/* ==========================================================================
   8. IMAGE LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('imageLightbox');
  const openBtn = document.getElementById('openLightboxBtn');
  const heroImg = document.getElementById('heroBannerImg');
  const closeBtn = document.getElementById('lightboxClose');
  const backdrop = document.getElementById('lightboxBackdrop');

  if (!lightbox) return;

  const openModal = () => {
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (heroImg) {
    heroImg.style.cursor = 'zoom-in';
    heroImg.addEventListener('click', openModal);
  }
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. FLOATING BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. INTERACTIVE CARD 3D TILT
   ========================================================================== */
function initCardTilt() {
  const card = document.querySelector('.hero-visual-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1024) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 5;
    const rotateY = (x / (rect.width / 2)) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

