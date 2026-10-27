/**
 * ANGELL PORTFOLIO - INTERACTIVE JAVASCRIPT
 * Handles modal embedding, scroll reveals, active navigation, and mobile drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Google Drive Config
  const DRIVE_FOLDER_ID = '1lHvphZJsTvEF-g6FkZyYKyuXcfyXnMCj';
  const DRIVE_EMBED_URL = `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#grid`;
  const DRIVE_SHARE_URL = `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}?usp=sharing`;

  const CERTIFICATION_ITEMS = [
    {
      title: 'Computer Hardware Basics',
      category: 'Certification',
      image: 'assets/images/cert/Computer Hardware basics .webp'
    },
    {
      title: 'Introduction to AI Literacy and Responsible Use',
      category: 'Certification',
      image: 'assets/images/cert/Introduction to AI Literacy and Responsible Use.webp'
    }
  ];

  // DOM Elements
  const header = document.querySelector('.header');
  const certificationCards = document.getElementById('certificationCards');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  // Modal Elements
  const driveModal = document.getElementById('driveModal');
  const modalIframe = document.getElementById('modalDriveIframe');
  const modalTitle = document.getElementById('modalActivityTitle');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOpenDriveLink = document.getElementById('modalOpenDriveLink');
  
  // --- Header Scroll Effect ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
      scrollTopBtn?.classList.add('visible');
    } else {
      header?.classList.remove('scrolled');
      scrollTopBtn?.classList.remove('visible');
    }
  });

  // --- Mobile Navigation Toggle ---
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // Active page is marked in each HTML file; no hash-scroll tracking required.
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const target = link.getAttribute('href');
    const isCurrent = target === currentPage;
    link.classList.toggle('active', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  function renderCertificationCards() {
    if (!certificationCards) return;

    certificationCards.innerHTML = CERTIFICATION_ITEMS.map((item) => `
      <div class="activity-card certification-card">
        <div class="activity-media cert-image-wrap" style="height: 300px;">
          <img decoding="async" src="${item.image}" alt="${item.title}" class="cert-image-only">
          <span class="activity-category cert-label">${item.category}</span>
        </div>
      </div>
    `).join('');

    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length || !('IntersectionObserver' in window)) { revealElements.forEach(el => el.classList.add('active')); return; }
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Google Drive Embedded Modal Functions ---
  window.openDriveModal = function(activityTitle = 'Drive Submissions') {
    if (!driveModal || !modalIframe) return;

    // Set modal title
    if (modalTitle) {
      modalTitle.textContent = activityTitle;
    }

    // Set iframe source to Google Drive embedded folder
    if (modalIframe.src !== DRIVE_EMBED_URL) {
      modalIframe.src = DRIVE_EMBED_URL;
    }

    // Update direct share link
    if (modalOpenDriveLink) {
      modalOpenDriveLink.href = DRIVE_SHARE_URL;
    }

    // Show modal with animation
    driveModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function closeDriveModal() {
    if (!driveModal) return;
    driveModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeDriveModal);
  }

  if (driveModal) {
    driveModal.addEventListener('click', (e) => {
      if (e.target === driveModal) {
        closeDriveModal();
      }
    });
  }

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && driveModal && driveModal.classList.contains('active')) {
      closeDriveModal();
    }
  });

  // Attach event listeners to all open-drive-btn buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-drive-btn');
    if (btn) {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'Google Drive Folder';
      window.openDriveModal(title);
    }
  });

  renderCertificationCards();

  // --- Scroll To Top Button ---
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
