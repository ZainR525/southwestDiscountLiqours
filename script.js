(function () {
  'use strict';

  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const backToTop = document.getElementById('backToTop');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('scrolled', y > 8);
    if (backToTop) backToTop.classList.toggle('visible', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && mobileNav) {
    const setOpen = (open) => {
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileNav.hidden = !open;
    };
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });
    mobileNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => setOpen(false));
    });
  }

  if ('IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('.section, .hero-inner, .about-card, .service, .liquor-card');
    reveals.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  }

})();
