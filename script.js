document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeJobCards();
  initializeButtons();
  setupEventListeners();
});

// Navigation functionality
function initializeNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
      updateActiveNavButton(this);
      updateNavUnderline(this);
    });
  });
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });

  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateActiveNavButton(button) {
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
}

function updateNavUnderline(button) {
  const underline = document.querySelector('.nav-underline');
  const navContainer = document.querySelector('.nav-container');
  
  const buttonRect = button.getBoundingClientRect();
  const containerRect = navContainer.getBoundingClientRect();
  
  underline.style.width = buttonRect.width + 'px';
  underline.style.left = (buttonRect.left - containerRect.left) + 'px';
}

// Job card toggle functionality
function initializeJobCards() {
  const jobCards = document.querySelectorAll('.job-card');
  
  jobCards.forEach(card => {
    card.addEventListener('click', function() {
      const details = this.querySelector('.job-details');
      if (details) {
        details.classList.toggle('show');
        this.style.background = details.classList.contains('show') ? 'white' : 'white';
      }
    });
  });
}

// Button functionality
function initializeButtons() {
  const downloadBtn = document.getElementById('downloadBtn');
  const contactBtn = document.getElementById('contactBtn');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadPDF);
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', showContactOptions);
  }
}

function downloadPDF() {
  showToast('Preparing PDF download... 📄');
  // In a real scenario, you'd use a library like html2pdf or jsPDF
  setTimeout(() => {
    window.print();
  }, 300);
}

function showContactOptions() {
  const email = 'prasadbabu.work@gmail.com';
  const phone = '+91 8500042622';
  
  const message = `Contact Options:\n\n📧 Email: ${email}\n📱 Phone: ${phone}`;
  
  // Copy email to clipboard
  navigator.clipboard.writeText(email).then(() => {
    showToast('Email copied to clipboard! 📧');
  }).catch(() => {
    showToast(`${message}`);
  });
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Setup additional event listeners
function setupEventListeners() {
  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Add animation to skill progress bars on scroll
  observeSkillBars();
}

// Animate skill bars on scroll
function observeSkillBars() {
  const skillProgress = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  });

  skillProgress.forEach(progress => {
    observer.observe(progress);
  });
}

// Store active section for page refresh
window.addEventListener('beforeunload', function() {
  const activeSection = document.querySelector('.section.active');
  if (activeSection) {
    localStorage.setItem('activeSection', activeSection.id);
  }
});

window.addEventListener('load', function() {
  const savedSection = localStorage.getItem('activeSection') || 'profile';
  const button = document.querySelector(`[data-section="${savedSection}"]`);
  if (button) {
    button.click();
  }
});