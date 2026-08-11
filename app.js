// Build ticker content (duplicated for seamless loop) — only runs if a ticker is present on the page
(function () {
  const items = ["ICU AMBULANCE","VENTILATOR SUPPORT","FREEZER BOX","A/C COMFORT","24/7 DISPATCH","60KM COVERAGE"];
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const build = () => items.map(i => `<span class="ticker-item">${i}</span>`).join('');
  track.innerHTML = build() + build();
})();

// FAQ accordion — only runs if FAQ items are present on the page
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// Conversion tracking: tel: and WhatsApp (wa.me) clicks are the two key conversions, site-wide
document.addEventListener('click', function (e) {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href');

  if (href.startsWith('tel:')) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: 'call_click', link_url: href });

    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        'send_to': 'AW-18377593288/cjwyCPLfz98cEMijj7tE'
      });
      gtag('event', 'call_click', { event_category: 'engagement', event_label: href });
    }
  }

  if (href.includes('wa.me')) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: 'whatsapp_click', link_url: href });
    if (typeof gtag === 'function') {
      gtag('event', 'whatsapp_click', { event_category: 'engagement', event_label: href });
    }
  }
});

// Restrained scroll-reveal only — fully skipped for prefers-reduced-motion, content stays in final state
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero: one-time fade + rise on load, kept short so Call/WhatsApp buttons aren't delayed
  gsap.from('.hero .eyebrow, .hero h1, .hero p.lead, .hero-actions, .trust-row, .page-hero .breadcrumb, .page-hero .eyebrow, .page-hero h1, .page-hero p.lead', {
    opacity: 0, y: 20, duration: 0.55, ease: 'power2.out', stagger: 0.05,
    clearProps: 'opacity,transform'
  });

  // Section headers: fade + rise just before fully in view
  document.querySelectorAll('.section-head').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  // Card rows: fade + rise with a small stagger per card
  document.querySelectorAll('.svc-grid, .why-grid, .fleet-grid').forEach((grid) => {
    gsap.from(grid.children, {
      opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', stagger: 0.08,
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: grid, start: 'top 85%' }
    });
  });
}
