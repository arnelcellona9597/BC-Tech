/* BC Tech: contact and lead forms (progressive enhancement over a normal POST). */
(() => {
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const MSG = {
    required: 'Please fill this in.',
    email: 'Please enter a valid email, like name@example.com.',
    fail: 'Sorry, that did not go through. Please try again or email us at info@bctech.com.',
  };

  const setError = (field, text) => {
    const wrap = field.closest('.field');
    let err = wrap.querySelector('.err');
    if (!text) {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      if (err) err.remove();
      return;
    }
    field.setAttribute('aria-invalid', 'true');
    if (!err) {
      err = document.createElement('span');
      err.className = 'err';
      err.id = `${field.id}-err`;
      wrap.appendChild(err);
    }
    err.textContent = text;
    field.setAttribute('aria-describedby', err.id);
  };

  const check = (form) => {
    let first = null;
    $$('input[required], textarea[required], select[required]', form).forEach((f) => {
      const v = f.value.trim();
      let m = '';
      if (!v) m = MSG.required;
      else if (f.type === 'email' && !emailOk(v)) m = MSG.email;
      setError(f, m);
      if (m && !first) first = f;
    });
    return first;
  };

  const attach = (form, { build, done }) => {
    const status = form.querySelector('.form-status');
    const stamp = form.querySelector('[name="_t"]');
    if (stamp) stamp.value = String(Date.now());
    form.addEventListener('input', (e) => { if (e.target.matches('[aria-invalid]')) setError(e.target, ''); });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const bad = check(form);
      if (bad) { bad.focus(); status.textContent = ''; return; }
      form.classList.add('is-sending');
      status.className = 'form-status';
      status.textContent = 'Sending...';
      try {
        const res = await fetch(form.action, { method: 'POST', body: build ? build(form) : new FormData(form), headers: { Accept: 'application/json' } });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) throw new Error(data.error || MSG.fail);
        status.className = 'form-status ok';
        status.textContent = data.message || 'Thank you! We got your message and will reply soon.';
        form.reset();
        if (stamp) stamp.value = String(Date.now());
        if (done) done(data);
      } catch (err) {
        status.className = 'form-status bad';
        status.textContent = err.message && err.message.length < 160 ? err.message : MSG.fail;
      } finally {
        form.classList.remove('is-sending');
      }
    });
  };

  window.BCForms = { attach, check, setError };
  // Forms marked data-booking are wired up by booking.js
  $$('.js-form:not([data-booking])').forEach((f) => attach(f, {}));

  // Pricing buttons link here with ?package=Name so the message starts filled in
  const pkg = new URLSearchParams(location.search).get('package');
  const msg = document.querySelector('textarea[name="message"]');
  if (pkg && msg && !msg.value) msg.value = `Hi! I am interested in the "${pkg.slice(0, 60)}" package. `;
})();
