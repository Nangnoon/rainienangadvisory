// Rainie Financial Advisory - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initScrollReveal();
  initScrollProgress();
  initMobileMenu();
  initSmoothScroll();
  initCounterAnimation();
});

// Navigation scroll effect
function initNavigation() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
      nav.classList.add('shadow-lg');
      nav.classList.remove('shadow-none');
    } else {
      nav.classList.remove('shadow-lg');
      nav.classList.add('shadow-none');
    }
    
    lastScroll = currentScroll;
  });
}

// Scroll reveal animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
}

// Scroll progress bar
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Close button inside mobile nav
  const closeBtn = mobileNav ? mobileNav.querySelector('button') : null;
  if (closeBtn && mobileNav) {
    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close on link click
  if (mobileNav) {
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Counter animation for statistics
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// Form validation
function validateForm(form) {
  const inputs = form.querySelectorAll('[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('border-red-500');
    } else {
      input.classList.remove('border-red-500');
    }
  });
  
  return isValid;
}

// Contact form submission
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm(form)) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! Rainie will get back to you soon.');
    form.reset();
  });
}

// Tab switching for services
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Update button states
      tabButtons.forEach(btn => {
        btn.classList.remove('active', 'border-teal-500', 'text-teal-600');
        btn.classList.add('border-transparent', 'text-gray-500');
      });
      button.classList.add('active', 'border-teal-500', 'text-teal-600');
      button.classList.remove('border-transparent', 'text-gray-500');
      
      // Update panel visibility
      tabPanels.forEach(panel => {
        panel.classList.add('hidden');
        if (panel.getAttribute('data-tab') === targetTab) {
          panel.classList.remove('hidden');
        }
      });
    });
  });
}

// Testimonial slider
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;
  
  const slides = slider.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  let currentSlide = 0;
  
  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-teal-500', i === index);
      dot.classList.toggle('bg-gray-300', i !== index);
    });
  };
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
      showSlide(currentSlide);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
      showSlide(currentSlide);
    });
  }
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      showSlide(currentSlide);
    });
  });
  
  // Auto-play
  setInterval(() => {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  }, 5000);
  
  showSlide(0);
}

// Initialize additional components on specific pages
window.initContactForm = initContactForm;
window.initTabs = initTabs;
window.initTestimonialSlider = initTestimonialSlider;


