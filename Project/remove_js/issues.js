  /* ─── Static data ─── */
  const PEOPLE = [
    { id: 'p1', name: 'Tlotlego',  surname: 'Mahomed',    email: 'Tlotlego@dev.co',  username: 'tlotmah' },
    { id: 'p2', name: 'Karabo', surname: 'Molefi',    email: 'Karabo@dev.co', username: 'karmol' },
    { id: 'p3', name: 'Tshepo',  surname: 'Matsepe', email: 'Tshepo@dev.co',  username: 'tshmat' },
    { id: 'p4', name: 'Tshegofatso', surname: 'Nchabeleng',      email: 'Tshegofatso@dev.co', username: 'tshmch' },
    { id: 'p5', name: 'Liam', surname: 'Venter',    email: 'Liam@dev.co', username: 'liaven' }
  ];
 
  const PROJECTS = [
    { id: 'pr1', name: 'Phoenix Portal' },
    { id: 'pr2', name: 'DataSync API' },
    { id: 'pr3', name: 'MobileFirst App' }
  ];
 
  /* ─── localStorage helpers ─── */
  function getBugs() {
    try { return JSON.parse(localStorage.getItem('bugs') || '[]'); } catch { return []; }
  }
  function saveBugs(b) { localStorage.setItem('bugs', JSON.stringify(b)); }
 
  /* ─── Seed 10 issues ─── */
  function seed() {
    if (getBugs().length > 0) return;
    const bugs = [
      { id:'T-001', summary:'Login button unresponsive on mobile',    description:'The login button does not respond to tap events on iOS Safari 16.',                           reporter:'karmol', date:'2026-01-10', project:'pr1', assignee:'p2', status:'resolved', priority:'high',   target:'2026-01-15', resolved:'2026-01-14', resolution:'Fixed event listener conflict with passive touch handlers.' },
      { id:'T-002', summary:'Dashboard charts fail to load',           description:'Recharts component throws a null reference when data array is empty.',                        reporter:'tshmat', date:'2026-01-12', project:'pr1', assignee:'p3', status:'open',     priority:'medium', target:'2026-01-20', resolved:'',           resolution:'' },
      { id:'T-003', summary:'API returns 500 on empty payload',        description:'POST /sync endpoint crashes instead of returning 400 for missing required fields.',           reporter:'tlotmah', date:'2026-01-13', project:'pr2', assignee:'p1', status:'overdue',  priority:'high',   target:'2026-01-16', resolved:'',           resolution:'' },
      { id:'T-004', summary:'Pagination breaks at page 3',             description:'Page 3 renders duplicate records pulled from page 2.',                                        reporter:'tshmch',   date:'2026-01-14', project:'pr2', assignee:'p4', status:'open',     priority:'low',    target:'2026-01-25', resolved:'',           resolution:'' },
      { id:'T-005', summary:'Push notifications not delivered on Android', description:'FCM token registration fails silently on Android 13.',                                   reporter:'liaven', date:'2026-01-15', project:'pr3', assignee:'p5', status:'open',     priority:'high',   target:'2026-01-22', resolved:'',           resolution:'' },
      { id:'T-006', summary:'Profile picture upload exceeds 1 MB limit', description:'No validation on file size; server rejects but UI shows a success message.',              reporter:'karmol', date:'2026-01-16', project:'pr3', assignee:'p2', status:'resolved', priority:'medium', target:'2026-01-20', resolved:'2026-01-19', resolution:'Added client-side file size check before upload.' },
      { id:'T-007', summary:'Date picker ignores timezone offset',     description:'Selecting a date in UTC+2 saves as UTC, shifting the stored value by 2 hours.',              reporter:'tshmat', date:'2026-01-17', project:'pr1', assignee:'p3', status:'open',     priority:'medium', target:'2026-01-28', resolved:'',           resolution:'' },
      { id:'T-008', summary:'Search returns no results for accented characters', description:'Searching "café" returns nothing; plain "cafe" works fine.',                       reporter:'tlotmah', date:'2026-01-18', project:'pr2', assignee:'p1', status:'overdue',  priority:'low',    target:'2026-01-21', resolved:'',           resolution:'' },
      { id:'T-009', summary:'Memory leak in data polling service',     description:'Polling interval is not cleared on component unmount, causing a memory leak.',               reporter:'tshmch',   date:'2026-01-19', project:'pr2', assignee:'p4', status:'open',     priority:'high',   target:'2026-01-26', resolved:'',           resolution:'' },
      { id:'T-010', summary:'Onboarding flow skips step 2',            description:'After completing step 1, clicking Next jumps directly to step 3.',                           reporter:'liaven', date:'2026-01-20', project:'pr3', assignee:'p5', status:'resolved', priority:'medium', target:'2026-01-24', resolved:'2026-01-23', resolution:'Fixed step index logic in the wizard component.' }
    ];
    saveBugs(bugs);
  }
 
  /* ─── Helpers ─── */
  function nextId() {
    const bugs = getBugs();
    if (!bugs.length) return 'T-011';
    const nums = bugs.map(b => parseInt(b.id.replace('T-', '')) || 0);
    return 'T-' + (Math.max(...nums) + 1).toString().padStart(3, '0');
  }
 
  function personName(id) {
    const p = PEOPLE.find(x => x.id === id);
    return p ? p.name + ' ' + p.surname : 'Unassigned';
  }
 
  function projectName(id) {
    const p = PROJECTS.find(x => x.id === id);
    return p ? p.name : 'Unknown';
  }
 
  function esc(s) {
    return (s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
 
  /* ─── Stats bar ─── */
  function renderStats(bugs) {
    const open     = bugs.filter(b => b.status === 'open').length;
    const resolved = bugs.filter(b => b.status === 'resolved').length;
    const overdue  = bugs.filter(b => b.status === 'overdue').length;
    const high     = bugs.filter(b => b.priority === 'high').length;
    document.getElementById('stats-bar').innerHTML = `
      <div class="stat-card"><div class="stat-num">${bugs.length}</div><div class="stat-lbl">Total tickets</div></div>
      <div class="stat-card c-open"><div class="stat-num">${open}</div><div class="stat-lbl">Open</div></div>
      <div class="stat-card c-resolved"><div class="stat-num">${resolved}</div><div class="stat-lbl">Resolved</div></div>
      <div class="stat-card c-overdue"><div class="stat-num">${overdue}</div><div class="stat-lbl">Overdue</div></div>
      <div class="stat-card c-high"><div class="stat-num">${high}</div><div class="stat-lbl">High priority</div></div>
    `;
  }
 
  /* ─── Render ticket list ─── */
  function renderList() {
    const bugs = getBugs();
    renderStats(bugs);
 
    /* Populate project filter (once) */
    const pjSel = document.getElementById('f-project');
    if (!pjSel.dataset.init) {
      PROJECTS.forEach(p => {
        const o = document.createElement('option');
        o.value = p.id; o.textContent = p.name;
        pjSel.appendChild(o);
      });
      pjSel.dataset.init = '1';
    }
 
    const st = document.getElementById('f-status').value;
    const pr = document.getElementById('f-priority').value;
    const pj = document.getElementById('f-project').value;
    const q  = document.getElementById('f-search').value.toLowerCase();
 
    const filtered = bugs.filter(b => {
      if (st && b.status   !== st) return false;
      if (pr && b.priority !== pr) return false;
      if (pj && b.project  !== pj) return false;
      if (q  && !b.summary.toLowerCase().includes(q) && !b.id.toLowerCase().includes(q)) return false;
      return true;
    });
 
    const list = document.getElementById('ticket-list');
    if (!filtered.length) {
      list.innerHTML = '<div class="empty">No tickets match the current filters.</div>';
      return;
    }
 
    list.innerHTML = filtered.map(b => `
      <div class="ticket-card" onclick="openDetail('${b.id}')">
        <div class="tc-top">
          <span class="tc-id">${b.id}</span>
          <span class="tc-summary">${esc(b.summary)}</span>
          <span class="badge ${b.priority}">${b.priority}</span>
          <span class="badge ${b.status}">${b.status}</span>
        </div>
        <div class="tc-meta">
          <span>&#128193; ${projectName(b.project)}</span>
          <span>&#128100; ${personName(b.assignee)}</span>
          <span>&#128197; Target: ${b.target || '—'}</span>
          <span>Reported: ${b.date || '—'}</span>
        </div>
      </div>
    `).join('');
  }
 
  /* ─── Create / Edit form ─── */
  function openCreate(prefill) {
    const isEdit = !!(prefill && prefill.id);
    const b = prefill || {
      id:'', summary:'', description:'', reporter:'',
      date: new Date().toISOString().slice(0, 10),
      project:'', assignee:'', status:'open', priority:'medium',
      target:'', resolved:'', resolution:''
    };
 
    document.getElementById('modal-box').innerHTML = `
      <h2>${isEdit ? 'Edit ticket ' + b.id : 'New ticket'}</h2>
 
      <div class="field">
        <label>Summary *</label>
        <input id="f-sum" value="${esc(b.summary)}" placeholder="Short description of the issue">
      </div>
 
      <div class="field">
        <label>Description</label>
        <textarea id="f-desc">${esc(b.description)}</textarea>
      </div>
 
      <div class="form-row">
        <div class="field">
          <label>Reporter username</label>
          <input id="f-rep" value="${esc(b.reporter)}" placeholder="e.g. sdlamini">
        </div>
        <div class="field">
          <label>Date identified</label>
          <input type="date" id="f-date" value="${b.date}">
        </div>
      </div>
 
      <div class="form-row">
        <div class="field">
          <label>Project</label>
          <select id="f-proj">
            ${PROJECTS.map(p => `<option value="${p.id}"${b.project === p.id ? ' selected' : ''}>${p.name}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>Assigned to</label>
          <select id="f-assign">
            <option value="">— Unassigned —</option>
            ${PEOPLE.map(p => `<option value="${p.id}"${b.assignee === p.id ? ' selected' : ''}>${p.name} ${p.surname}</option>`).join('')}
          </select>
        </div>
      </div>
 
      <div class="form-row">
        <div class="field">
          <label>Status</label>
          <select id="f-stat">
            <option value="open"${b.status === 'open' ? ' selected' : ''}>open</option>
            <option value="resolved"${b.status === 'resolved' ? ' selected' : ''}>resolved</option>
            <option value="overdue"${b.status === 'overdue' ? ' selected' : ''}>overdue</option>
          </select>
        </div>
        <div class="field">
          <label>Priority</label>
          <select id="f-pri">
            <option value="low"${b.priority === 'low' ? ' selected' : ''}>low</option>
            <option value="medium"${b.priority === 'medium' ? ' selected' : ''}>medium</option>
            <option value="high"${b.priority === 'high' ? ' selected' : ''}>high</option>
          </select>
        </div>
      </div>
 
      <div class="form-row">
        <div class="field">
          <label>Target resolution date</label>
          <input type="date" id="f-target" value="${b.target}">
        </div>
        <div class="field">
          <label>Actual resolution date</label>
          <input type="date" id="f-res" value="${b.resolved}">
        </div>
      </div>
 
      <div class="field">
        <label>Resolution summary</label>
        <textarea id="f-ressum">${esc(b.resolution)}</textarea>
      </div>
 
      <div class="modal-actions">
        <button class="btn primary" onclick="saveTicket(${isEdit ? `'${b.id}'` : 'null'})">
          ${isEdit ? 'Save changes' : 'Create ticket'}
        </button>
        ${isEdit ? `<button class="btn danger" onclick="deleteTicket('${b.id}')">Delete ticket</button>` : ''}
        <button class="btn" onclick="closeModal()">Cancel</button>
      </div>
    `;
 
    document.getElementById('modal-bg').style.display = 'flex';
  }
 
  /* ─── Save (create or update) ─── */
  function saveTicket(editId) {
    const sum = document.getElementById('f-sum').value.trim();
    if (!sum) { alert('Summary is required.'); return; }
 
    const bugs = getBugs();
    const ticket = {
      id:          editId || nextId(),
      summary:     sum,
      description: document.getElementById('f-desc').value.trim(),
      reporter:    document.getElementById('f-rep').value.trim(),
      date:        document.getElementById('f-date').value,
      project:     document.getElementById('f-proj').value,
      assignee:    document.getElementById('f-assign').value,
      status:      document.getElementById('f-stat').value,
      priority:    document.getElementById('f-pri').value,
      target:      document.getElementById('f-target').value,
      resolved:    document.getElementById('f-res').value,
      resolution:  document.getElementById('f-ressum').value.trim()
    };
 
    if (editId) {
      const i = bugs.findIndex(b => b.id === editId);
      if (i > -1) bugs[i] = ticket;
    } else {
      bugs.unshift(ticket);
    }
 
    saveBugs(bugs);
    closeModal();
    renderList();
  }
 
  /* ─── Delete ─── */
  function deleteTicket(id) {
    if (!confirm('Are you sure you want to delete this ticket? This cannot be undone.')) return;
    saveBugs(getBugs().filter(b => b.id !== id));
    closeModal();
    renderList();
  }
 
  /* ─── Detail view ─── */
  function openDetail(id) {
    const b = getBugs().find(x => x.id === id);
    if (!b) return;
 
    document.getElementById('modal-box').innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
        <span style="font-size:12px;color:#888;font-weight:600">${b.id}</span>
        <span class="badge ${b.status}">${b.status}</span>
        <span class="badge ${b.priority}">${b.priority} priority</span>
      </div>
      <h2 style="margin-bottom:0.75rem">${esc(b.summary)}</h2>
      <p style="font-size:13px;color:#555;line-height:1.7;margin-bottom:1rem">${esc(b.description) || '<em style="color:#aaa">No description provided.</em>'}</p>
 
      <div class="detail-grid">
        <div class="detail-item"><label>Project</label><span>${projectName(b.project)}</span></div>
        <div class="detail-item"><label>Assigned to</label><span>${personName(b.assignee)}</span></div>
        <div class="detail-item"><label>Reporter</label><span>${b.reporter || '—'}</span></div>
        <div class="detail-item"><label>Date identified</label><span>${b.date || '—'}</span></div>
        <div class="detail-item"><label>Target resolution</label><span>${b.target || '—'}</span></div>
        <div class="detail-item"><label>Actual resolution</label><span>${b.resolved || '—'}</span></div>
      </div>
 
      ${b.resolution ? `
        <div class="resolution-box">
          <p class="res-label">Resolution summary</p>
          <p class="res-text">${esc(b.resolution)}</p>
        </div>` : ''}
 
      <div class="modal-actions" style="margin-top:1.25rem">
        <button class="btn primary" onclick="openCreate(getBugById('${b.id}'))">Edit ticket</button>
        <button class="btn" onclick="closeModal()">Close</button>
      </div>
    `;
 
    document.getElementById('modal-bg').style.display = 'flex';
  }
 
  /* ─── Modal helpers ─── */
  function getBugById(id) { return getBugs().find(b => b.id === id); }
  function closeModal()   { document.getElementById('modal-bg').style.display = 'none'; }
  function bgClose(e)     { if (e.target.id === 'modal-bg') closeModal(); }
 
  /* ─── Init ─── */
  seed();
  renderList();