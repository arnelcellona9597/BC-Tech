/* BC Tech: "Book a free call" calendar. Request-based: we email the request, then confirm by email. */
(() => {
  const root = document.getElementById('booking');
  if (!root || !window.BCForms) return;
  const $ = (s, c = root) => c.querySelector(s);

  const days = root.dataset.days.split(',').map(Number);
  const slots = root.dataset.slots.split(',');
  const windowDays = Number(root.dataset.window);
  const leadHours = Number(root.dataset.lead);

  // Manila is UTC+8 all year (no daylight saving), so this Date's fields read as Philippine wall time.
  const phNow = () => new Date(Date.now() + (8 * 60 + new Date().getTimezoneOffset()) * 60000);
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (dt) => `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
  const dayStart = (dt) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  const slotTime = (dt, t) => { const [h, m] = t.split(':').map(Number); return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), h, m); };
  const label12 = (t) => { const [h, m] = t.split(':').map(Number); return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`; };
  const longDate = (dt) => dt.toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const monthName = (dt) => dt.toLocaleDateString('en-PH', { month: 'long', year: 'numeric' });

  const today = dayStart(phNow());
  const last = new Date(today.getFullYear(), today.getMonth(), today.getDate() + windowDays);
  const openSlots = (dt) => {
    const earliest = new Date(phNow().getTime() + leadHours * 3600000);
    return slots.filter((t) => slotTime(dt, t) >= earliest);
  };
  const bookable = (dt) => dt >= today && dt <= last && days.includes(dt.getDay()) && openSlots(dt).length > 0;

  const grid = $('#cal-grid');
  const title = $('#cal-title');
  const prev = $('#cal-prev');
  const next = $('#cal-next');
  const slotBox = $('#slots');
  const slotHelp = $('#slot-help');
  const detail = $('#book-details');
  const summary = $('#book-summary');
  const steps = Array.from(root.querySelectorAll('.b-steps li'));
  const form = $('#book-form');
  const status = $('.form-status', form);

  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  let picked = null;
  let pickedTime = null;

  const setStep = (n) => steps.forEach((li, i) => { li.classList.toggle('now', i === n); li.classList.toggle('done', i < n); li.toggleAttribute('aria-current', i === n); });

  const render = () => {
    title.textContent = monthName(view);
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < first.getDay(); i++) cells.push('<span class="cal-blank" aria-hidden="true"></span>');
    let focusable = null;
    for (let n = 1; n <= count; n++) {
      const dt = new Date(view.getFullYear(), view.getMonth(), n);
      const ok = bookable(dt);
      const sel = picked && iso(picked) === iso(dt);
      if (ok && (sel || (!focusable && !picked))) focusable = n;
      cells.push(`<button type="button" class="cal-day${iso(dt) === iso(today) ? ' today' : ''}" data-d="${iso(dt)}" aria-label="${longDate(dt)}${ok ? '' : ', not available'}" ${ok ? '' : 'disabled'} aria-pressed="${sel ? 'true' : 'false'}" tabindex="-1">${n}</button>`);
    }
    grid.innerHTML = cells.join('');
    const enabled = grid.querySelectorAll('.cal-day:not(:disabled)');
    const stop = grid.querySelector('.cal-day[aria-pressed="true"]') || enabled[0];
    if (stop) stop.setAttribute('tabindex', '0');
    prev.disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
    next.disabled = new Date(view.getFullYear(), view.getMonth() + 1, 1) > last;
  };

  const renderSlots = () => {
    if (!picked) { slotBox.innerHTML = ''; slotHelp.hidden = false; return; }
    slotHelp.hidden = true;
    const list = openSlots(picked);
    slotBox.innerHTML = list.map((t) => `<button type="button" class="slot" data-t="${t}" aria-pressed="${pickedTime === t ? 'true' : 'false'}">${label12(t)}</button>`).join('');
  };

  const updateSummary = () => {
    if (picked && pickedTime) {
      detail.hidden = false;
      summary.querySelector('span').textContent = `${longDate(picked)} at ${label12(pickedTime)} (Philippine Time)`;
      setStep(2);
    } else {
      detail.hidden = true;
      setStep(picked ? 1 : 0);
    }
  };

  grid.addEventListener('click', (e) => {
    const b = e.target.closest('.cal-day');
    if (!b || b.disabled) return;
    const [y, m, dd] = b.dataset.d.split('-').map(Number);
    picked = new Date(y, m - 1, dd);
    pickedTime = null;
    render(); renderSlots(); updateSummary();
    grid.querySelector('.cal-day[aria-pressed="true"]').focus();
  });

  // Keyboard: arrows move between available days, PageUp/PageDown change month
  grid.addEventListener('keydown', (e) => {
    const cur = e.target.closest('.cal-day');
    if (!cur) return;
    const all = Array.from(grid.querySelectorAll('.cal-day'));
    let i = all.indexOf(cur);
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (step) {
      e.preventDefault();
      const dir = step > 0 ? 1 : -1;
      for (let j = i + step; j >= 0 && j < all.length; j += dir * (Math.abs(step) === 7 ? 7 : 1)) {
        if (!all[j].disabled) { cur.tabIndex = -1; all[j].tabIndex = 0; all[j].focus(); break; }
      }
    } else if (e.key === 'PageDown' && !next.disabled) { e.preventDefault(); next.click(); }
    else if (e.key === 'PageUp' && !prev.disabled) { e.preventDefault(); prev.click(); }
  });

  slotBox.addEventListener('click', (e) => {
    const b = e.target.closest('.slot');
    if (!b) return;
    pickedTime = b.dataset.t;
    renderSlots(); updateSummary();
    slotBox.querySelector('.slot[aria-pressed="true"]').focus();
  });

  prev.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); render(); });
  next.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); render(); });

  // Jump to the first month that has an available day
  for (let k = 0; k < 3 && !Array.from({ length: 31 }, (_, n) => new Date(view.getFullYear(), view.getMonth(), n + 1)).some((dt) => dt.getMonth() === view.getMonth() && bookable(dt)); k++) {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
  }
  render(); renderSlots(); setStep(0);

  window.BCForms.attach(form, {
    build: (f) => {
      const fd = new FormData(f);
      fd.set('date', iso(picked));
      fd.set('time', pickedTime);
      return fd;
    },
    done: () => {
      picked = null; pickedTime = null;
      render(); renderSlots(); updateSummary();
      status.focus && status.setAttribute('tabindex', '-1');
    },
  });
  // Block submit until a day and time are chosen
  form.addEventListener('submit', (e) => {
    if (!picked || !pickedTime) {
      e.preventDefault(); e.stopImmediatePropagation();
      status.className = 'form-status bad';
      status.textContent = 'Please choose a day and a time first.';
    }
  }, true);
})();
