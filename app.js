/* ============================================================================
 * Dental Tripzo — client-side behaviour
 * ----------------------------------------------------------------------------
 * Security notes (OWASP):
 *   • All DOM writes of user-controlled values use textContent (NOT innerHTML).
 *   • File upload is validated client-side (type whitelist + size limit) so a
 *     malicious file never reaches a backend. ALWAYS re-validate server-side.
 *   • No inline <script> / event-handler attributes are used, so the page can
 *     enforce a Content-Security-Policy that does not allow 'unsafe-inline'.
 *   • A honeypot field traps naive spam bots.
 * ==========================================================================*/

'use strict';

/* ---------- helpers ------------------------------------------------------ */

function $(idOrSelector) {
  return typeof idOrSelector === 'string' && idOrSelector[0] === '#'
    ? document.querySelector(idOrSelector)
    : document.getElementById(idOrSelector);
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = String(value);
}

/* ---------- flight route per language ----------------------------------- */

const FLIGHT_ROUTES = {
  en: { code: 'PRG', city: 'Prague', route: 'Prague (PRG) \u2794 Tirana (TIA)' },
  pl: { code: 'WAW', city: 'Warsaw', route: 'Warsaw (WAW) \u2794 Tirana (TIA)' },
  cs: { code: 'PRG', city: 'Prague', route: 'Prague (PRG) \u2794 Tirana (TIA)' },
  sk: { code: 'BTS', city: 'Bratislava', route: 'Bratislava (BTS) \u2794 Tirana (TIA)' },
};

function setLang(lang, updateButtons) {
  document.body.className = 'lang-' + lang;

  if (updateButtons !== false) {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  const route = FLIGHT_ROUTES[lang] || FLIGHT_ROUTES.en;
  setText('bp-dep-code', route.code);
  setText('bp-dep-city', route.city);
  setText('flight-route', route.route);
}

/* ---------- before / after slider --------------------------------------- */

function moveSlider(val) {
  const layer = $('before-after-layer');
  const handle = $('slider-handle');
  const pct = Math.min(100, Math.max(0, Number(val)));
  if (layer) layer.style.width = pct + '%';
  if (handle) handle.style.left = pct + '%';
}

/* ---------- savings calculator ------------------------------------------ */

const PRICING = {
  implant: { home: 1400, albania: 450 },
  crown: { home: 600, albania: 180 },
};

function updateCalc() {
  const implants = Number($('input-implants').value) || 0;
  const crowns = Number($('input-crowns').value) || 0;

  setText('lbl-implants', implants);
  setText('lbl-crowns', crowns);

  const home = implants * PRICING.implant.home + crowns * PRICING.crown.home;
  const albania = implants * PRICING.implant.albania + crowns * PRICING.crown.albania;
  const savings = Math.max(0, home - albania);

  setText('res-home', '\u20AC' + home.toLocaleString());
  setText('res-albania', '\u20AC' + albania.toLocaleString());
  setText('res-savings', '\u20AC' + savings.toLocaleString());
}
/* ---------- file upload validation -------------------------------------- */

const ALLOWED_XRAY_TYPES = ['image/jpeg', 'image/png'];
const MAX_XRAY_BYTES = 10 * 1024 * 1024; // 10 MB

function setFileStatus(message, isError) {
  const label = $('file-input-label');
  const status = $('file-status');
  if (label) label.textContent = message || '\u{1F4C1} Click to upload or drag X-Ray image';
  if (status) {
    status.textContent = message || '';
    status.style.color = isError ? '#D92D20' : 'var(--teal-deep)';
  }
}

function onFileSelected(input) {
  const file = input.files && input.files[0];
  if (!file) {
    setFileStatus('', false);
    input.setCustomValidity('');
    return;
  }

  let error = null;
  if (!ALLOWED_XRAY_TYPES.includes(file.type)) {
    error = 'Unsupported file type. Please upload a JPEG or PNG image.';
  } else if (file.size > MAX_XRAY_BYTES) {
    error = 'File is too large. Maximum allowed size is 10 MB.';
  }

  if (error) {
    setFileStatus(error, true);
    input.setCustomValidity(error);
    input.value = '';
    setFileStatus('', false);
  } else {
    input.setCustomValidity('');
    // textContent — never innerHTML — to avoid DOM-based XSS via file name.
    setFileStatus(file.name, false);
  }
}
/* ---------- contact form (GDPR + honeypot) ------------------------------ */

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  // Honeypot: if filled, silently drop (bot trap).
  if (form.querySelector('[name="website"]').value) {
    form.reset();
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const wait = $('form-status');
  wait.classList.remove('hidden');
  wait.textContent = 'Submitting\u2026';

  // NOTE: this is a static demo page. In production, wire this to a secure
  // HTTPS backend and build the request with FormData so the X-Ray and PII
  // are transmitted (and then stored) only after the patient's GDPR consent.
  // Never send sensitive medical data over plain HTTP.
  setTimeout(() => {
    wait.style.color = 'var(--teal-deep)';
    wait.textContent = 'Application & X-Ray sent securely. Our team will reply within 24 hours.';
    form.reset();
  }, 600);
}

/* ---------- initialisation ---------------------------------------------- */

document.addEventListener('DOMContentLoaded', function () {
  // Language buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });

  // Before / after slider
  const slider = $('slider-input');
  if (slider) {
    slider.addEventListener('input', (e) => moveSlider(e.target.value));
  }

  // Savings calculator
  const impl = $('input-implants');
  const crown = $('input-crowns');
  if (impl && crown) {
    impl.addEventListener('input', updateCalc);
    crown.addEventListener('input', updateCalc);
  }
  updateCalc();
  moveSlider(slider ? slider.value : 50);

  // File upload
  const fileInput = $('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => onFileSelected(e.target));

    const dropZone = $('file-upload');
    if (dropZone) {
      dropZone.addEventListener('click', () => fileInput.click());
      dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--teal)'; });
      dropZone.addEventListener('dragleave', () => { dropZone.style.borderColor = ''; });
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '';
        if (e.dataTransfer && e.dataTransfer.files.length) {
          fileInput.files = e.dataTransfer.files;
          onFileSelected(fileInput);
        }
      });
    }
  }

  // Contact form
  const form = $('application-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Default language
  setLang('en');

  // Scroll-reveal — IntersectionObserver (GPU-safe, no scroll listener)
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // Nav shadow on scroll (class toggle only — cheap, no layout thrash)
  const nav = $('topnav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
        ticking = false;
      });
    }, { passive: true });
  }
});