// ==================== HEADER SCROLL ====================
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll);
onScroll();

// ==================== MOBILE MENU ====================
const burger = document.getElementById('burger');
const headerNav = document.getElementById('headerNav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  headerNav.classList.toggle('open');
  document.body.style.overflow = headerNav.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
headerNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    headerNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Mobile dropdown toggle
const dropdownToggle = headerNav.querySelector('.dropdown__toggle');
if (dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropdownToggle.parentElement.classList.toggle('open');
    }
  });
}

// ==================== COUNTERS ====================
const counters = document.querySelectorAll('[data-count]');

const animateCounter = (el) => {
  const target = parseFloat(el.getAttribute('data-count'));
  const decimals = (target % 1 !== 0) ? 1 : 0;
  const duration = 1500;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = (eased * target).toFixed(decimals);
    el.textContent = current;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

// ==================== REVEAL ON SCROLL ====================
const revealElements = document.querySelectorAll('.service-card, .why-card, .section-head');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 3) * 0.1}s`;
  revealObserver.observe(el);
});

// ==================== FORM HANDLER ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const formSuccess = document.getElementById('formSuccess');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.contact__submit');
    submitBtn.textContent = 'Отправляем...';
    submitBtn.disabled = true;

    // Simulate async submission (replace with real AJAX endpoint as needed)
    setTimeout(() => {
      contactForm.hidden = true;
      formSuccess.hidden = false;
      submitBtn.textContent = 'Обсудить проект';
      submitBtn.disabled = false;
      contactForm.reset();
    }, 1200);
  });
}

// ==================== MODAL ====================
const modal = document.getElementById('serviceModal');

if (modal) {
  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-modal-open="serviceModal"]').forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

// ==================== ACTIVE NAV LINK ====================
// Активная страница в меню помечается классом header__link--active в HTML,
// поэтому пересечение секций для якорей больше не требуется.

// ==================== FAQ ACCORDION ====================
const faqQuestions = document.querySelectorAll('.faq-item__question');

faqQuestions.forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
  });
});
