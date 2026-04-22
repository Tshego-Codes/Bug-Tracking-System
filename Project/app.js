function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}
//This is where the data is being initialized. If there is no data in localStorage, it will return an empty array.
let issues = loadData("issues");
let people = loadData("people");
let projects = loadData("projects");

//This fnction saves all the data.
function saveAll() {
    saveData("issues", issues);
    saveData("people", people);
    saveData("projects", projects);
}

//This is the structure  of the issue object. It is used to create a new issue when the user submits the form.
/*All of you should follow this format */
function createIssueObject(data) {
    return {
        id: generateId(),
        summary: data.summary,
        description: data.description,
        reporter: data.reporter,
        dateCreated: data.dateCreated,
        projectId: data.projectId,
        assignedTo: data.assignedTo,
        status: data.status, // open, resolved, overdue
        priority: data.priority, // low, medium, high
        targetDate: data.targetDate,
        resolutionDate: data.resolutionDate || null,
        resolutionSummary: data.resolutionSummary || ""
    };
}



//This is the structure of the person object. It is used to create a new person when the user submits the form.
function createPerson(id, name, surname, email, username) {
    return { id, name, surname, email, username };
}

//This is the structure of the project object. It is used to create a new project when the user submits the form.
function createProject(id, name) {
    return { id, name };
}

//This function generates a unique ID for each issue, person, and project. It uses the current timestamp and a random number to ensure uniqueness.
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

//This function gets an issue by its ID. It is used to display the issue details when the user clicks on an issue in the list.
function getIssueById(id) {
    return issues.find(issue => issue.id == id);
}

//This function updates an issue in the issues array. It is used to save the changes when the user edits an issue.
function updateIssue(updatedIssue) {
    let index = issues.findIndex(i => i.id == updatedIssue.id);
    if (index !== -1) {
        issues[index] = updatedIssue;
        saveAll();
    }
}

//This function deletes an issue from the issues array. It is used to remove an issue when the user clicks the delete button.
function deleteIssue(id) {
    issues = issues.filter(i => i.id != id);
    saveAll();
}

//This function updates the status of an issue based on the current date and the target date. 
// If the issue is not resolved and the target date has 
// passed, it sets the status to "overdue".
function updateStatusBasedOnDate(issue) {
    let today = new Date();
    let target = new Date(issue.targetDate);

    if (issue.status !== "resolved" && target < today) {
        issue.status = "overdue";
    }
}

//This function adds a new issue to the issues array. It is used to create a new issue when the user submits the form.
/* Used by person 2*/
function addIssue(issueData) {
    let newIssue = createIssueObject(issueData);
    issues.push(newIssue);
    saveAll();
}
//
function addPerson(personData) {
    let newPerson = createPerson(
        generateId(),
        personData.name,
        personData.surname,
        personData.email,
        personData.username
    );
    people.push(newPerson);
    saveAll();
}

function addProject(projectData) {
    let newProject = createProject(
        generateId(),
        projectData.name
    );
    projects.push(newProject);
    saveAll();
}


//Default data for testing purposes. This will only run if there is no data in localStorage. It creates two people and two projects to work with.
if (people.length === 0) {
    people.push(
        createPerson(generateId(), "John", "Doe", "john@mail.com", "jdoe"),
        createPerson(generateId(), "Jane", "Smith", "jane@mail.com", "jsmith")
    );
}

if (projects.length === 0) {
    projects.push(
        createProject(generateId(), "Bug Tracker"),
        createProject(generateId(), "Website Redesign")
    );
}

saveAll();


//This function adds a new project to the projects array. It is used to create a new project when the user submits the form.
 /*Used by person 3 */
function getAllPeople() {
    return people;
}
//This function adds a new project to the projects array. It is used to create a new project when the user submits the form.
/*Used by person 3 */
function getAllProjects() {
    return projects;
}


//This function adds a new project to the projects array. It is used to create a new project when the user submits the form.
/* Used by person 4. The one who is responsible for the UI */
function getAllIssues() {
    issues.forEach(issue => updateStatusBasedOnDate(issue));
    saveAll(); // Save the updated statuses to localStorage
    return issues;
}

// END 
// ===========================================================================================================================================================//
// ===========================================================================================================================================================//

// ===========================================================================================================================================================//
// DASHBOARD JS

const labels = document.querySelectorAll(".stat-lbl");

labels.forEach((label, index) => {
    // 1. Get the current text and remove any accidental whitespace at the ends
    let text = label.innerText.trim();
    
    // 2. Capitalize the first letter and attach the rest of the original string
    let capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    
    // 3. Apply the logic based on the index
    if (index === 0) {
        // For the first card, just apply the capitalized text
        label.innerText = capitalizedText;
    } else {
        // For all other cards, append " Tickets" to the end
        label.innerText = `${capitalizedText} Tickets`;
    }
});

// style the issue tracker heading

let issueCardHeading = document.querySelector(".top-bar h1");

issueCardHeading.textContent = "Summary of Tickets";
issueCardHeading.style.color = "white";
issueCardHeading.style.fontSize = "30px";

//



let statNum = document.getElementsByClassName("stat-num");

for (let i = 0; i < statNum.length; i++) {
    statNum[i].style.color = "black";
    statNum[i].style.fontSize = "35px";
}

//stat labels

let statLabels = document.getElementsByClassName("stat-lbl");
for (let i = 0; i < statLabels.length; i++) {
    statLabels[i].style.color = "darkGray";
    statLabels[i].style.fontSize = "25px";
}


// Select the container using its ID
let statsBar = document.getElementById("stats-bar");

// Change the grid layout to exactly 2 columns of equal width
if (statsBar) {
    statsBar.style.gridTemplateColumns = "repeat(2, 1fr)";
    statsBar.style.gap = "20px";
}

if (statsBar && statsBar.firstElementChild) {
    // 1. Keep the 2-column layout for the container
    statsBar.style.gridTemplateColumns = "repeat(2, 1fr)";

    // 2. Target the first card and make it span full width
    statsBar.firstElementChild.style.gridColumn = "1 / -1";
}

// stat card styling

let statCard = document.querySelectorAll(".stat-card");

statCard.forEach(card => {
    card.style.padding = "30px 10px"
    card.style.display = "flex"
    card.style.alignItems = "center";
    card.style.gap = "20px"
    card.style.minHeight = "100px";

})


// Select all the statistic cards
statCard.forEach((card, index) => {
    // 1. Target the specific elements inside the card
    const numberEl = card.querySelector(".stat-num"); 
    const labelEl = card.querySelector(".stat-lbl");   

    // 2. Store the original values so we can revert them later
    // We grab the text right away before any hovering happens
    const originalLabelText = labelEl ? labelEl.innerText : "";
    
    // 3. Handle the Hover State (Mouse Enter)
    card.addEventListener("mouseenter", () => {
        // Reduce background opacity (using rgba for white at 70% opacity)
        card.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        card.style.outline = "3px solid white";
        card.style.outlineOffset = "-3px";
        // Change text and number colors to dark blue
        if(numberEl){
            numberEl.style.opacity = 0;
        }
        if (labelEl) {
            labelEl.style.color = "white"; 
            labelEl.style.fontSize = "25px";
            // Check if it is the first card (Index 0)
            if (index === 0) {
                labelEl.innerText = "View All Tickets";
            } else {
                labelEl.innerText = `View ${originalLabelText}`;
            }
        }
    });

    // 4. Handle the Default State (Mouse Leave)
    card.addEventListener("mouseleave", () => {
        // Revert the background color back to solid white
        card.style.backgroundColor = "rgb(255, 255, 255)";

        numberEl.style.display = "flex";

        // Revert the colors (empty string gives control back to your CSS file)
        if (numberEl) numberEl.style.opacity = 100;
        if (labelEl) {
            labelEl.style.color = "gray";
            labelEl.style.fontSize = "25px";

            // Put the original text back
            labelEl.innerText = originalLabelText; 
        }
    });
});




// Select all elements that have both 'btn' and 'primary' classes

const primaryButtons = document.querySelectorAll(".btn.primary");

primaryButtons.forEach(button => {
    // 1. Apply the default static styles
    button.innerText = "+ Quick Add Ticket";
    button.style.fontWeight = "bold";
    button.style.backgroundColor = "transparent"; 
    button.style.color = "white";
    button.style.padding = "20px";
    button.style.border = "none"; 
    button.style.boxShadow = "inset 0 0 0 2px white"; 
    
    // Add a smooth transition so the hover effect doesn't snap instantly
    button.style.transition = "all 0.3s ease";

    // 2. Handle the Hover State (Mouse Enter)
    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "white";
        button.style.color = "black";
    });

    // 3. Handle the Default State (Mouse Leave)
    button.addEventListener("mouseleave", () => {
        // Revert back to the styles we set in step 1
        button.style.backgroundColor = "transparent";
        button.style.color = "white";
    });
});

// END DASHBOARD JS
// ===========================================================================================================================================================//
// ===========================================================================================================================================================//

// TICKET JS 

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


// END TICKET  JS
// ===========================================================================================================================================================//
// ===========================================================================================================================================================//

// PEOPLE JS



//  PERSON CRUD FUNCTIONS 
// This function adds a new person to the people array.
// It is called when the user submits the add person form.
function addPerson(name, surname, email, username) {
    // Check if username already exists
    let existingPerson = getPersonByUsername(username);
    if (existingPerson) {
        alert("Username already exists. Please choose a different username.");
        return false;
    }

    let newPerson = createPerson(generateId(), name, surname, email, username);
    people.push(newPerson);
    saveAll();
    renderPeopleTable();
    alert("Person added successfully!");
    return true;
}

// This function updates an existing person in the people array.
// It is called when the user submits the edit person form.
function updatePerson(id, name, surname, email, username) {
    let index = people.findIndex(p => p.id == id);
    if (index !== -1) {
        // Check if new username already exists (excluding current person)
        let existingPerson = people.find(p => p.username === username && p.id != id);
        if (existingPerson) {
            alert("Username already exists. Please choose a different username.");
            return false;
        }

        people[index] = { id: id, name: name, surname: surname, email: email, username: username };
        saveAll();
        renderPeopleTable();
        alert("Person updated successfully!");
        return true;
    }
    return false;
}

// This function deletes a person from the people array.
// It checks if the person is assigned to any issues before deleting.
function deletePerson(id) {
    let person = getPersonById(id);
    if (!person) return false;

    // Check if person is assigned to any issues
    let assignedIssues = issues.filter(issue => issue.assignedTo === person.username);
    if (assignedIssues.length > 0) {
        if (!confirm(`Warning: ${person.name} ${person.surname} is assigned to ${assignedIssues.length} issue(s). Delete anyway?`)) {
            return false;
        }
    }

    people = people.filter(p => p.id != id);
    saveAll();
    renderPeopleTable();
    alert("Person deleted successfully!");
    return true;
}

// This function gets a person by their username.
// It is used when assigning issues to people.
function getPersonByUsername(username) {
    return people.find(p => p.username === username);
}

// This function returns all people as an array.
// It is used by Person 2 and Person 4 to populate dropdowns.
function getAllPeople() {
    return people;
}

// This function returns people formatted for dropdown selects.
// It is used by Person 2 for issue assignment dropdown.
function getPeopleDropdownOptions() {
    return people.map(person => ({
        value: person.username,
        label: `${person.name} ${person.surname} (${person.username})`
    }));
}

// This function renders the people table in the UI.
// It displays all people with edit and delete buttons.
function renderPeopleTable() {
    let tbody = document.getElementById("peopleTable");
    if (!tbody) return;

    if (people.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">No people found. Add a person above.</td></tr>';
        return;
    }

    tbody.innerHTML = "";
    people.forEach(person => {
        tbody.innerHTML += `
            <tr>
                <td>${escapeHtml(person.name)} ${escapeHtml(person.surname)}</td>
                <td>${escapeHtml(person.email)}</td>
                <td>${escapeHtml(person.username)}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="openEditPersonModal('${person.id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deletePerson('${person.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// PROJECT CRUD FUNCTIONS 

// This function adds a new project to the projects array.
// It is called when the user submits the add project form.
function addProject(name) {
    // Check if project name already exists
    let existingProject = projects.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existingProject) {
        alert("Project name already exists. Please choose a different name.");
        return false;
    }

    let newProject = createProject(generateId(), name);
    projects.push(newProject);
    saveAll();
    renderProjectsTable();
    alert("Project added successfully!");
    return true;
}

// This function updates an existing project in the projects array.
// It is called when the user submits the edit project form.
function updateProject(id, name) {
    let index = projects.findIndex(p => p.id == id);
    if (index !== -1) {
        // Check if new name already exists (excluding current project)
        let existingProject = projects.find(p => p.name.toLowerCase() === name.toLowerCase() && p.id != id);
        if (existingProject) {
            alert("Project name already exists. Please choose a different name.");
            return false;
        }

        projects[index] = { id: id, name: name };
        saveAll();
        renderProjectsTable();
        alert("Project updated successfully!");
        return true;
    }
    return false;
}

// This function deletes a project from the projects array.
// It checks if the project has any linked issues before deleting.
function deleteProject(id) {
    let project = getProjectById(id);
    if (!project) return false;

    // Check if project has any issues
    let linkedIssues = issues.filter(issue => issue.projectId == id);
    if (linkedIssues.length > 0) {
        if (!confirm(`Warning: Project "${project.name}" has ${linkedIssues.length} issue(s). Delete anyway?`)) {
            return false;
        }
    }

    projects = projects.filter(p => p.id != id);
    saveAll();
    renderProjectsTable();
    alert("Project deleted successfully!");
    return true;
}

// This function returns all projects as an array.
// It is used by Person 2 and Person 4 to populate dropdowns.
function getAllProjects() {
    return projects;
}

// This function returns projects formatted for dropdown selects.
// It is used by Person 2 for issue project selection dropdown.
function getProjectsDropdownOptions() {
    return projects.map(project => ({
        value: project.id,
        label: project.name
    }));
}

// This function renders the projects table in the UI.
// It displays all projects with edit and delete buttons.
function renderProjectsTable() {
    let tbody = document.getElementById("projectsTable");
    if (!tbody) return;

    if (projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-center">No projects found. Add a project above.</td></tr>';
        return;
    }

    tbody.innerHTML = "";
    projects.forEach(project => {
        tbody.innerHTML += `
            <tr>
                <td>${escapeHtml(project.name)}</td>
                <td><code>${escapeHtml(project.id)}</code></td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="openEditProjectModal('${project.id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProject('${project.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// MODAL FORM HANDLERS 

// This function opens the add person modal with empty fields.
function openAddPersonModal() {
    document.getElementById("personModalTitle").innerText = "Add Person";
    document.getElementById("personId").value = "";
    document.getElementById("personName").value = "";
    document.getElementById("personSurname").value = "";
    document.getElementById("personEmail").value = "";
    document.getElementById("personUsername").value = "";

    let modal = new bootstrap.Modal(document.getElementById("personModal"));
    modal.show();
}

// This function opens the edit person modal with existing person data.
function openEditPersonModal(id) {
    let person = getPersonById(id);
    if (person) {
        document.getElementById("personModalTitle").innerText = "Edit Person";
        document.getElementById("personId").value = person.id;
        document.getElementById("personName").value = person.name;
        document.getElementById("personSurname").value = person.surname;
        document.getElementById("personEmail").value = person.email;
        document.getElementById("personUsername").value = person.username;

        let modal = new bootstrap.Modal(document.getElementById("personModal"));
        modal.show();
    }
}

// This function saves a person from the modal form (add or edit).
function savePersonFromModal() {
    let id = document.getElementById("personId").value;
    let name = document.getElementById("personName").value.trim();
    let surname = document.getElementById("personSurname").value.trim();
    let email = document.getElementById("personEmail").value.trim();
    let username = document.getElementById("personUsername").value.trim();

    if (!name || !surname || !email || !username) {
        alert("Please fill in all fields");
        return;
    }

    if (id) {
        updatePerson(id, name, surname, email, username);
    } else {
        addPerson(name, surname, email, username);
    }

    let modal = bootstrap.Modal.getInstance(document.getElementById("personModal"));
    modal.hide();
    clearPersonForm();
}

// This function clears the person form fields.
function clearPersonForm() {
    document.getElementById("personName").value = "";
    document.getElementById("personSurname").value = "";
    document.getElementById("personEmail").value = "";
    document.getElementById("personUsername").value = "";
}

// This function opens the add project modal with empty field.
function openAddProjectModal() {
    document.getElementById("projectModalTitle").innerText = "Add Project";
    document.getElementById("projectId").value = "";
    document.getElementById("projectName").value = "";

    let modal = new bootstrap.Modal(document.getElementById("projectModal"));
    modal.show();
}

// This function opens the edit project modal with existing project data.
function openEditProjectModal(id) {
    let project = getProjectById(id);
    if (project) {
        document.getElementById("projectModalTitle").innerText = "Edit Project";
        document.getElementById("projectId").value = project.id;
        document.getElementById("projectName").value = project.name;

        let modal = new bootstrap.Modal(document.getElementById("projectModal"));
        modal.show();
    }
}

// This function saves a project from the modal form (add or edit).
function saveProjectFromModal() {
    let id = document.getElementById("projectId").value;
    let name = document.getElementById("projectName").value.trim();

    if (!name) {
        alert("Please enter a project name");
        return;
    }

    if (id) {
        updateProject(id, name);
    } else {
        addProject(name);
    }

    let modal = bootstrap.Modal.getInstance(document.getElementById("projectModal"));
    modal.hide();
    clearProjectForm();
}

// This function clears the project form fields.
function clearProjectForm() {
    document.getElementById("projectName").value = "";
}

// HELPER FUNCTIONS

// This function escapes HTML special characters to prevent XSS attacks.
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// This function initializes the Person 3 UI when the page loads.
function initPerson3() {
    if (document.getElementById("peopleTable")) {
        renderPeopleTable();
    }
    if (document.getElementById("projectsTable")) {
        renderProjectsTable();
    }
}

//  EXPORT FUNCTIONS FOR OTHER MEMBERS

// These functions are used by Person 2 and Person 4
window.getAllPeople = getAllPeople;
window.getAllProjects = getAllProjects;
window.getPeopleDropdownOptions = getPeopleDropdownOptions;
window.getProjectsDropdownOptions = getProjectsDropdownOptions;
window.getPersonById = getPersonById;
window.getProjectById = getProjectById;
window.getPersonByUsername = getPersonByUsername;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerson3);
} else {
    initPerson3();
}

// END PEOPLE JS
// ===========================================================================================================================================================//
// ===========================================================================================================================================================//