// --- STORAGE UTILITIES ---
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function generateId(prefix) {
    const base = Date.now().toString(36);
    const rand = Math.random().toString(36).slice(2, 6);
    return prefix ? `${prefix}${base}${rand}` : `${base}${rand}`;
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// --- FACTORY LOGIC ---
function createPerson(id, name, surname, email, username) {
    return { id: id || generateId("p"), name, surname, email, username };
}

function createProject(id, name) {
    return { id: id || generateId("pr"), name };
}

function createTicketObject(data) {
    return {
        id: data.id || nextTicketId(),
        summary: data.summary || "",
        description: data.description || "",
        reporter: data.reporter || "",
        date: data.date || data.dateCreated || new Date().toISOString().slice(0, 10),
        project: data.project || data.projectId || "",
        assignee: data.assignee || data.assignedTo || "",
        status: data.status || "open",
        priority: data.priority || "medium",
        target: data.target || data.targetDate || "",
        resolved: data.resolved || data.resolutionDate || "",
        resolution: data.resolution || data.resolutionSummary || ""
    };
}

// --- DEFAULT SEED DATA ---
const DEFAULT_PEOPLE = [
    { id: "p1", name: "Tlotlego", surname: "Mahomed", email: "Tlotlego@dev.co", username: "tlotmah" },
    { id: "p2", name: "Karabo", surname: "Molefi", email: "Karabo@dev.co", username: "karmol" },
    { id: "p3", name: "Tshepo", surname: "Matsepe", email: "Tshepo@dev.co", username: "tshmat" },
    { id: "p4", name: "Tshegofatso", surname: "Nchabeleng", email: "Tshegofatso@dev.co", username: "tshmch" },
    { id: "p5", name: "Liam", surname: "Venter", email: "Liam@dev.co", username: "liaven" }
];

const DEFAULT_PROJECTS = [
    { id: "pr1", name: "Phoenix Portal" },
    { id: "pr2", name: "DataSync API" },
    { id: "pr3", name: "MobileFirst App" }
];

const DEFAULT_BUGS = [
    { id: "T-001", summary: "Login button unresponsive on mobile", description: "The login button does not respond to tap events on iOS Safari 16.", reporter: "karmol", date: "2026-01-10", project: "pr1", assignee: "p2", status: "resolved", priority: "high", target: "2026-01-15", resolved: "2026-01-14", resolution: "Fixed event listener conflict with passive touch handlers." },
    { id: "T-002", summary: "Dashboard charts fail to load", description: "Recharts component throws a null reference when data array is empty.", reporter: "tshmat", date: "2026-01-12", project: "pr1", assignee: "p3", status: "open", priority: "medium", target: "2026-01-20", resolved: "", resolution: "" },
    { id: "T-003", summary: "API returns 500 on empty payload", description: "POST /sync endpoint crashes instead of returning 400 for missing required fields.", reporter: "tlotmah", date: "2026-01-13", project: "pr2", assignee: "p1", status: "overdue", priority: "high", target: "2026-01-16", resolved: "", resolution: "" },
    { id: "T-004", summary: "Pagination breaks at page 3", description: "Page 3 renders duplicate records pulled from page 2.", reporter: "tshmch", date: "2026-01-14", project: "pr2", assignee: "p4", status: "open", priority: "low", target: "2026-01-25", resolved: "", resolution: "" },
    { id: "T-005", summary: "Push notifications not delivered on Android", description: "FCM token registration fails silently on Android 13.", reporter: "liaven", date: "2026-01-15", project: "pr3", assignee: "p5", status: "open", priority: "high", target: "2026-01-22", resolved: "", resolution: "" },
    { id: "T-006", summary: "Profile picture upload exceeds 1 MB limit", description: "No validation on file size; server rejects but UI shows a success message.", reporter: "karmol", date: "2026-01-16", project: "pr3", assignee: "p2", status: "resolved", priority: "medium", target: "2026-01-20", resolved: "2026-01-19", resolution: "Added client-side file size check before upload." },
    { id: "T-007", summary: "Date picker ignores timezone offset", description: "Selecting a date in UTC+2 saves as UTC, shifting the stored value by 2 hours.", reporter: "tshmat", date: "2026-01-17", project: "pr1", assignee: "p3", status: "open", priority: "medium", target: "2026-01-28", resolved: "", resolution: "" },
    { id: "T-008", summary: "Search returns no results for accented characters", description: "Searching cafe with accents returns nothing; plain cafe works fine.", reporter: "tlotmah", date: "2026-01-18", project: "pr2", assignee: "p1", status: "overdue", priority: "low", target: "2026-01-21", resolved: "", resolution: "" },
    { id: "T-009", summary: "Memory leak in data polling service", description: "Polling interval is not cleared on component unmount, causing a memory leak.", reporter: "tshmch", date: "2026-01-19", project: "pr2", assignee: "p4", status: "open", priority: "high", target: "2026-01-26", resolved: "", resolution: "" },
    { id: "T-010", summary: "Onboarding flow skips step 2", description: "After completing step 1, clicking Next jumps directly to step 3.", reporter: "liaven", date: "2026-01-20", project: "pr3", assignee: "p5", status: "resolved", priority: "medium", target: "2026-01-24", resolved: "2026-01-23", resolution: "Fixed step index logic in the wizard component." }
];

// --- STATE MANAGEMENT ---
let people = loadData("people");
if (!Array.isArray(people)) people = [];

let projects = loadData("projects");
if (!Array.isArray(projects)) projects = [];

// Fully reverted to "bugs" to reconnect with your 13 saved tickets
let bugs = loadData("bugs"); 
if (!Array.isArray(bugs)) bugs = [];

function savePeopleAndProjects() {
    saveData("people", people);
    saveData("projects", projects);
}

function saveAllBugs() {
    saveData("bugs", bugs);
}

function seedStores() {
    if (people.length === 0) {
        people = DEFAULT_PEOPLE.map(p => createPerson(p.id, p.name, p.surname, p.email, p.username));
    }
    if (projects.length === 0) {
        projects = DEFAULT_PROJECTS.map(p => createProject(p.id, p.name));
    }
    if (bugs.length === 0) {
        bugs = DEFAULT_BUGS.map(b => createTicketObject(b));
    }
    savePeopleAndProjects();
    saveAllBugs();
}

// --- DATA ACCESS METHODS ---
function getPersonById(id) { return people.find(p => p.id === id) || null; }
function getProjectById(id) { return projects.find(p => p.id === id) || null; }
function getPersonByUsername(username) { return people.find(p => p.username === username) || null; }
function getBugById(id) { return bugs.find(b => b.id === id) || null; }

function getAllPeople() { return people; }
function getAllProjects() { return projects; }

function personName(id) {
    const p = getPersonById(id);
    return p ? `${p.name} ${p.surname}` : "Unassigned";
}

function projectName(id) {
    const p = getProjectById(id);
    return p ? p.name : "Unknown";
}

function nextTicketId() {
    if (!bugs.length) return "T-001";
    const nums = bugs.map(b => parseInt(String(b.id).replace("T-", ""), 10) || 0);
    return "T-" + String(Math.max(...nums) + 1).padStart(3, "0");
}

function updateTicketStatusFromDate(ticket) {
    if (!ticket.target || ticket.status === "resolved") return;
    const target = new Date(ticket.target);
    const today = new Date();
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (target < today) {
        ticket.status = "overdue";
    }
}

function getAllIssues() {
    let changed = false;
    bugs.forEach(bug => {
        const before = bug.status;
        updateTicketStatusFromDate(bug);
        if (before !== bug.status) changed = true;
    });

    if (changed) saveAllBugs();
    return bugs;
}

// --- UI RENDERING ---
function renderStats(currentBugs) {
    const statsBar = document.getElementById("stats-bar");
    if (!statsBar) return;

    const open = currentBugs.filter(b => b.status === "open").length;
    const resolved = currentBugs.filter(b => b.status === "resolved").length;
    const overdue = currentBugs.filter(b => b.status === "overdue").length;
    const high = currentBugs.filter(b => b.priority === "high").length;

    statsBar.innerHTML = `
      <div class="stat-card"><div class="stat-num">${currentBugs.length}</div><div class="stat-lbl">Total tickets</div></div>
      <div class="stat-card c-open"><div class="stat-num">${open}</div><div class="stat-lbl">Open</div></div>
      <div class="stat-card c-resolved"><div class="stat-num">${resolved}</div><div class="stat-lbl">Resolved</div></div>
      <div class="stat-card c-overdue"><div class="stat-num">${overdue}</div><div class="stat-lbl">Overdue</div></div>
      <div class="stat-card c-high"><div class="stat-num">${high}</div><div class="stat-lbl">High priority</div></div>
    `;
}

function renderList() {
    const list = document.getElementById("ticket-list");
    if (!list) return;

    const currentBugs = getAllIssues();
    //renderStats(currentBugs);

    const statusEl = document.getElementById("f-status");
    const priorityEl = document.getElementById("f-priority");
    const projectEl = document.getElementById("f-project");
    const searchEl = document.getElementById("f-search");

    if (!statusEl || !priorityEl || !projectEl || !searchEl) return;

    const selectedProject = projectEl.value;
    projectEl.innerHTML = '<option value="">All projects</option>' +
        projects.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("");
    projectEl.value = selectedProject;

    const st = statusEl.value;
    const pr = priorityEl.value;
    const pj = projectEl.value;
    const q = searchEl.value.toLowerCase().trim();

    const filtered = currentBugs.filter(b => {
        if (st && b.status !== st) return false;
        if (pr && b.priority !== pr) return false;
        if (pj && b.project !== pj) return false;
        // Added safety check to ensure b.summary exists before lowercasing
        if (q && (!b.summary || !b.summary.toLowerCase().includes(q)) && !String(b.id).toLowerCase().includes(q)) return false;
        return true;
    });

    if (!filtered.length) {
        list.innerHTML = '<div class="empty">No tickets match the current filters.</div>';
        return;
    }

    list.innerHTML = filtered.map(b => `
      <div class="ticket-card" onclick="openDetail('${b.id}')">
        <div class="tc-top">
          <span class="tc-id">${b.id}</span>
          <span class="tc-summary">${escapeHtml(b.summary)}</span>
          <span class="badge ${b.priority}">${b.priority}</span>
          <span class="badge ${b.status}">${b.status}</span>
        </div>
        <div class="tc-meta">
          <span>&#128193; ${escapeHtml(projectName(b.project))}</span>
          <span>&#128100; ${escapeHtml(personName(b.assignee))}</span>
          <span>&#128197; Target: ${b.target || "-"}</span>
          <span>Reported: ${b.date || "-"}</span>
        </div>
      </div>
    `).join("");
}

// --- TICKET MODALS & LOGIC ---
function openCreate(prefill) {
    const modalBox = document.getElementById("modal-box");
    const modalBg = document.getElementById("modal-bg");
    if (!modalBox || !modalBg) return;

    let b;
    let isEdit = false;

    // Strict type-checking: Ensures a button click (MouseEvent) isn't accidentally treated as a ticket
    if (prefill && typeof prefill === 'object' && prefill.id && typeof prefill.summary === 'string') {
        b = prefill;
        isEdit = true;
    } else {
        b = createTicketObject({});
        b.id = ""; // Clears the ID so the save function knows to generate a new one
    }

    modalBox.innerHTML = `
      <h2>${isEdit ? `Edit ticket ${b.id}` : "New ticket"}</h2>

      <div class="field">
        <label>Summary *</label>
        <input id="f-sum" value="${escapeHtml(b.summary)}" placeholder="Short description of the issue">
      </div>

      <div class="field">
        <label>Description</label>
        <textarea id="f-desc">${escapeHtml(b.description)}</textarea>
      </div>

      <div class="form-row">
        <div class="field">
          <label>Reporter username</label>
          <input id="f-rep" value="${escapeHtml(b.reporter)}" placeholder="e.g. sdlamini">
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
            <option value="">- Unassigned -</option>
            ${projects.map(p => `<option value="${p.id}"${b.project === p.id ? " selected" : ""}>${escapeHtml(p.name)}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Assigned to</label>
          <select id="f-assign">
            <option value="">- Unassigned -</option>
            ${people.map(p => `<option value="${p.id}"${b.assignee === p.id ? " selected" : ""}>${escapeHtml(p.name)} ${escapeHtml(p.surname)}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="field">
          <label>Status</label>
          <select id="f-stat">
            <option value="open"${b.status === "open" ? " selected" : ""}>open</option>
            <option value="resolved"${b.status === "resolved" ? " selected" : ""}>resolved</option>
            <option value="overdue"${b.status === "overdue" ? " selected" : ""}>overdue</option>
          </select>
        </div>
        <div class="field">
          <label>Priority</label>
          <select id="f-pri">
            <option value="low"${b.priority === "low" ? " selected" : ""}>low</option>
            <option value="medium"${b.priority === "medium" ? " selected" : ""}>medium</option>
            <option value="high"${b.priority === "high" ? " selected" : ""}>high</option>
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
        <textarea id="f-ressum">${escapeHtml(b.resolution)}</textarea>
      </div>

      <div class="modal-actions">
        <button class="btn primary" onclick="saveTicket('${isEdit ? b.id : ""}')">
          ${isEdit ? "Save changes" : "Create ticket"}
        </button>
        ${isEdit ? `<button class="btn danger" onclick="deleteTicket('${b.id}')">Delete ticket</button>` : ""}
        <button class="btn" onclick="closeModal()">Cancel</button>
      </div>
    `;

    modalBg.style.display = "flex";
}

function saveTicket(editId) {
    const summaryEl = document.getElementById("f-sum");
    if (!summaryEl) return;

    const sum = summaryEl.value.trim();
    if (!sum) {
        alert("Summary is required.");
        return;
    }

    const ticketData = {
        id: editId || undefined,
        summary: sum,
        description: document.getElementById("f-desc")?.value.trim(),
        reporter: document.getElementById("f-rep")?.value.trim(),
        date: document.getElementById("f-date")?.value,
        project: document.getElementById("f-proj")?.value,
        assignee: document.getElementById("f-assign")?.value,
        status: document.getElementById("f-stat")?.value,
        priority: document.getElementById("f-pri")?.value,
        target: document.getElementById("f-target")?.value,
        resolved: document.getElementById("f-res")?.value,
        resolution: document.getElementById("f-ressum")?.value.trim()
    };

    const ticket = createTicketObject(ticketData);

    if (editId) {
        const idx = bugs.findIndex(b => b.id === editId);
        if (idx > -1) bugs[idx] = ticket;
    } else {
        bugs.unshift(ticket);
    }

    saveAllBugs();
    closeModal();
    refreshConnectedUi();
}

function deleteTicket(id) {
    if (!confirm("Are you sure you want to delete this ticket? This cannot be undone.")) return;
    bugs = bugs.filter(b => b.id !== id);
    saveAllBugs();
    closeModal();
    refreshConnectedUi();
}

function openDetail(id) {
    const b = getBugById(id);
    const modalBox = document.getElementById("modal-box");
    const modalBg = document.getElementById("modal-bg");
    if (!b || !modalBox || !modalBg) return;

    modalBox.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap">
        <span style="font-size:12px;color:#888;font-weight:600">${b.id}</span>
        <span class="badge ${b.status}">${b.status}</span>
        <span class="badge ${b.priority}">${b.priority} priority</span>
      </div>
      <h2 style="margin-bottom:0.75rem">${escapeHtml(b.summary)}</h2>
      <p style="font-size:13px;color:#555;line-height:1.7;margin-bottom:1rem">${escapeHtml(b.description) || '<em style="color:#aaa">No description provided.</em>'}</p>

      <div class="detail-grid">
        <div class="detail-item"><label>Project</label><span>${escapeHtml(projectName(b.project))}</span></div>
        <div class="detail-item"><label>Assigned to</label><span>${escapeHtml(personName(b.assignee))}</span></div>
        <div class="detail-item"><label>Reporter</label><span>${escapeHtml(b.reporter || "-")}</span></div>
        <div class="detail-item"><label>Date identified</label><span>${b.date || "-"}</span></div>
        <div class="detail-item"><label>Target resolution</label><span>${b.target || "-"}</span></div>
        <div class="detail-item"><label>Actual resolution</label><span>${b.resolved || "-"}</span></div>
      </div>

      ${b.resolution ? `
        <div class="resolution-box">
          <p class="res-label">Resolution summary</p>
          <p class="res-text">${escapeHtml(b.resolution)}</p>
        </div>` : ""}

      <div class="modal-actions" style="margin-top:1.25rem">
        <button class="btn primary" onclick="openCreate(getBugById('${b.id}'))">Edit ticket</button>
        <button class="btn" onclick="closeModal()">Close</button>
      </div>
    `;

    modalBg.style.display = "flex";
}

function closeModal() {
    const modalBg = document.getElementById("modal-bg");
    if (modalBg) modalBg.style.display = "none";
}

function bgClose(e) {
    if (e.target && e.target.id === "modal-bg") closeModal();
}

// --- PEOPLE & PROJECTS LOGIC ---
function renderPeopleTable() {
    const tbody = document.getElementById("peopleTable");
    if (!tbody) return;

    if (people.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">No people found. Add a person above.</td></tr>';
        return;
    }

    tbody.innerHTML = people.map(person => `
      <tr>
        <td>${escapeHtml(person.name)} ${escapeHtml(person.surname)}</td>
        <td>${escapeHtml(person.email)}</td>
        <td>${escapeHtml(person.username)}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="openEditPersonModal('${person.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deletePerson('${person.id}')">Delete</button>
        </td>
      </tr>
    `).join("");
}

function renderProjectsTable() {
    const tbody = document.getElementById("projectsTable");
    if (!tbody) return;

    if (projects.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-center">No projects found. Add a project above.</td></tr>';
        return;
    }

    tbody.innerHTML = projects.map(project => `
      <tr>
        <td>${escapeHtml(project.name)}</td>
        <td><code>${escapeHtml(project.id)}</code></td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editProject('${project.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteProject('${project.id}')">Delete</button>
        </td>
      </tr>
    `).join("");
}

function refreshConnectedUi() {
    renderPeopleTable();
    renderProjectsTable();
    renderStats(getAllIssues());
    renderPeopleProjectStats();
    renderList();
}

function addPerson(name, surname, email, username) {
    const normalizedUsername = (username || "").trim();
    const exists = people.some(p => p.username.toLowerCase() === normalizedUsername.toLowerCase());
    if (exists) {
        alert("Username already exists. Please choose a different username.");
        return false;
    }

    people.push(createPerson(null, name.trim(), surname.trim(), email.trim(), normalizedUsername));
    savePeopleAndProjects();
    refreshConnectedUi();
    alert("Person added successfully!");
    return true;
}

function updatePerson(id, name, surname, email, username) {
    const index = people.findIndex(p => p.id === id);
    if (index === -1) return false;

    const normalizedUsername = (username || "").trim();
    const exists = people.some(p => p.id !== id && p.username.toLowerCase() === normalizedUsername.toLowerCase());
    if (exists) {
        alert("Username already exists. Please choose a different username.");
        return false;
    }

    people[index] = createPerson(id, name.trim(), surname.trim(), email.trim(), normalizedUsername);
    savePeopleAndProjects();
    refreshConnectedUi();
    alert("Person updated successfully!");
    return true;
}

function deletePerson(id) {
    const person = getPersonById(id);
    if (!person) return false;

    const assignedCount = bugs.filter(b => b.assignee === person.id || b.assignee === person.username).length;
    if (assignedCount > 0) {
        const canDelete = confirm(`Warning: ${person.name} ${person.surname} is assigned to ${assignedCount} ticket(s). Delete anyway?`);
        if (!canDelete) return false;
    }

    people = people.filter(p => p.id !== id);
    savePeopleAndProjects();
    refreshConnectedUi();
    alert("Person deleted successfully!");
    return true;
}

function addProject(name) {
    const projectNameValue = (name || "").trim();
    if (!projectNameValue) {
        alert("Please enter a project name");
        return false;
    }

    const exists = projects.some(p => p.name.toLowerCase() === projectNameValue.toLowerCase());
    if (exists) {
        alert("Project name already exists. Please choose a different name.");
        return false;
    }

    projects.push(createProject(null, projectNameValue));
    savePeopleAndProjects();
    refreshConnectedUi();
    alert("Project added successfully!");
    return true;
}

function updateProject(id, name) {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    const projectNameValue = (name || "").trim();
    const exists = projects.some(p => p.id !== id && p.name.toLowerCase() === projectNameValue.toLowerCase());
    if (exists) {
        alert("Project name already exists. Please choose a different name.");
        return false;
    }

    projects[index] = createProject(id, projectNameValue);
    savePeopleAndProjects();
    refreshConnectedUi();
    alert("Project updated successfully!");
    return true;
}

function deleteProject(id) {
    const project = getProjectById(id);
    if (!project) return false;

    const linkedCount = bugs.filter(b => b.project === id || b.projectId === id).length;
    if (linkedCount > 0) {
        const canDelete = confirm(`Warning: Project "${project.name}" has ${linkedCount} ticket(s). Delete anyway?`);
        if (!canDelete) return false;
    }

    projects = projects.filter(p => p.id !== id);
    savePeopleAndProjects();
    refreshConnectedUi();
    alert("Project deleted successfully!");
    return true;
}

// --- FORM HANDLERS ---
function getPeopleDropdownOptions() {
    return people.map(person => ({ value: person.id, label: `${person.name} ${person.surname} (${person.username})` }));
}

function getProjectsDropdownOptions() {
    return projects.map(project => ({ value: project.id, label: project.name }));
}

function openAddPersonModal() {
    const title = document.getElementById("personModalTitle");
    if (title) title.innerText = "Add Person";

    clearPersonForm();

    const modalElement = document.getElementById("personModal");
    if (modalElement && window.bootstrap) {
        new bootstrap.Modal(modalElement).show();
    }
}

function openEditPersonModal(id) {
    const person = getPersonById(id);
    if (!person) return;

    const title = document.getElementById("personModalTitle");
    if (title) title.innerText = "Edit Person";

    const idEl = document.getElementById("personId");
    const nameEl = document.getElementById("personName");
    const surnameEl = document.getElementById("personSurname");
    const emailEl = document.getElementById("personEmail");
    const userEl = document.getElementById("personUsername");

    if (idEl) idEl.value = person.id;
    if (nameEl) nameEl.value = person.name;
    if (surnameEl) surnameEl.value = person.surname;
    if (emailEl) emailEl.value = person.email;
    if (userEl) userEl.value = person.username;

    const modalElement = document.getElementById("personModal");
    if (modalElement && window.bootstrap) {
        new bootstrap.Modal(modalElement).show();
    }
}

function clearPersonForm() {
    const idEl = document.getElementById("personId");
    const nameEl = document.getElementById("personName");
    const surnameEl = document.getElementById("personSurname");
    const emailEl = document.getElementById("personEmail");
    const userEl = document.getElementById("personUsername");

    if (idEl) idEl.value = "";
    if (nameEl) nameEl.value = "";
    if (surnameEl) surnameEl.value = "";
    if (emailEl) emailEl.value = "";
    if (userEl) userEl.value = "";
}

function savePersonFromModal() {
    const id = document.getElementById("personId")?.value;
    const name = document.getElementById("personName")?.value.trim() || "";
    const surname = document.getElementById("personSurname")?.value.trim() || "";
    const email = document.getElementById("personEmail")?.value.trim() || "";
    const username = document.getElementById("personUsername")?.value.trim() || "";

    if (!name || !surname || !email || !username) {
        alert("Please fill in all fields");
        return;
    }

    const saved = id ? updatePerson(id, name, surname, email, username) : addPerson(name, surname, email, username);
    if (!saved) return;

    const modalElement = document.getElementById("personModal");
    if (modalElement && window.bootstrap) {
        const instance = bootstrap.Modal.getInstance(modalElement);
        if (instance) instance.hide();
    }
    clearPersonForm();
}

function openAddProjectModal() {
    const title = document.getElementById("projectModalTitle");
    const idEl = document.getElementById("projectId");
    const nameEl = document.getElementById("projectName");

    if (title) title.innerText = "Add Project";
    if (idEl) idEl.value = "";
    if (nameEl) nameEl.value = "";

    const modalElement = document.getElementById("projectModal");
    if (modalElement && window.bootstrap) {
        new bootstrap.Modal(modalElement).show();
    }
}

function openEditProjectModal(id) {
    const project = getProjectById(id);
    if (!project) return;

    const title = document.getElementById("projectModalTitle");
    const idEl = document.getElementById("projectId");
    const nameEl = document.getElementById("projectName");

    if (title) title.innerText = "Edit Project";
    if (idEl) idEl.value = project.id;
    if (nameEl) nameEl.value = project.name;

    const modalElement = document.getElementById("projectModal");
    if (modalElement && window.bootstrap) {
        new bootstrap.Modal(modalElement).show();
    }
}

function clearProjectForm() {
    const nameEl = document.getElementById("projectName");
    if (nameEl) nameEl.value = "";
}

function clearPersonPageForm() {
    const firstNameEl = document.getElementById("firstName");
    const surnameEl = document.getElementById("surname");
    const emailEl = document.getElementById("email");
    const usernameEl = document.getElementById("username");

    if (firstNameEl) firstNameEl.value = "";
    if (surnameEl) surnameEl.value = "";
    if (emailEl) emailEl.value = "";
    if (usernameEl) usernameEl.value = "";
}

function addPersonFromPage() {
    const firstName = document.getElementById("firstName")?.value.trim() || "";
    const surname = document.getElementById("surname")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const username = document.getElementById("username")?.value.trim() || "";

    if (!firstName || !surname || !email || !username) {
        alert("Please fill in all fields");
        return;
    }

    const saved = addPerson(firstName, surname, email, username);
    if (saved) clearPersonPageForm();
}

function editProject(id) {
    const project = getProjectById(id);
    if (!project) return;

    const form = document.getElementById("projectForm");
    const nameEl = document.getElementById("projectName");
    if (nameEl) nameEl.value = project.name;
    if (form) form.dataset.editProjectId = id;
}

function addProjectFromPage() {
    const form = document.getElementById("projectForm");
    const name = document.getElementById("projectName")?.value.trim() || "";
    const editId = form?.dataset.editProjectId || "";

    if (!name) {
        alert("Please enter a project name");
        return;
    }

    const saved = editId ? updateProject(editId, name) : addProject(name);
    if (!saved) return;

    if (form && form.dataset.editProjectId) {
        delete form.dataset.editProjectId;
    }
    clearProjectForm();
}

function clearForm() {
    clearPersonPageForm();
    clearProjectForm();

    const form = document.getElementById("projectForm");
    if (form && form.dataset.editProjectId) {
        delete form.dataset.editProjectId;
    }
}

function saveProjectFromModal() {
    const id = document.getElementById("projectId")?.value;
    const name = document.getElementById("projectName")?.value.trim() || "";

    if (!name) {
        alert("Please enter a project name");
        return;
    }

    const saved = id ? updateProject(id, name) : addProject(name);
    if (!saved) return;

    const modalElement = document.getElementById("projectModal");
    if (modalElement && window.bootstrap) {
        const instance = bootstrap.Modal.getInstance(modalElement);
        if (instance) instance.hide();
    }
    clearProjectForm();
}

// --- INIT APP ---
function initApp() {
    seedStores();
    refreshConnectedUi();
}

// --- GLOBAL BINDINGS ---
window.getAllPeople = getAllPeople;
window.getAllProjects = getAllProjects;
window.getAllIssues = getAllIssues;
window.getPeopleDropdownOptions = getPeopleDropdownOptions;
window.getProjectsDropdownOptions = getProjectsDropdownOptions;
window.getPersonById = getPersonById;
window.getProjectById = getProjectById;
window.getPersonByUsername = getPersonByUsername;
window.getBugById = getBugById;
window.openCreate = openCreate;
window.openDetail = openDetail;
window.closeModal = closeModal;
window.bgClose = bgClose;
window.saveTicket = saveTicket;
window.deleteTicket = deleteTicket;
window.savePersonFromModal = savePersonFromModal;
window.saveProjectFromModal = saveProjectFromModal;
window.openAddPersonModal = openAddPersonModal;
window.openEditPersonModal = openEditPersonModal;
window.openAddProjectModal = openAddProjectModal;
window.openEditProjectModal = openEditProjectModal;
window.addPersonFromPage = addPersonFromPage;
window.clearPersonPageForm = clearPersonPageForm;
window.addProjectFromPage = addProjectFromPage;
window.editProject = editProject;
window.clearForm = clearForm;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}


/* DASHBOARD STATS */
function renderPeopleProjectStats() {
    const container = document.getElementById("people-project-stats");
    if (!container) return; // If we aren't on the dashboard, skip this

    const totalPeople = getAllPeople().length;
    const totalProjects = getAllProjects().length;

    // We reuse your existing 'stat-card', 'stat-num', and 'stat-lbl' classes
    // so they look exactly like the ticket summary cards!
    container.innerHTML = `
      <div class="stat-card">
        <div class="stat-num">${totalPeople}</div>
        <div class="stat-lbl">Total People</div>
      </div>
      <div class="stat-card">
        <div class="stat-num">${totalProjects}</div>
        <div class="stat-lbl">Total Projects</div>
      </div>
    `;
}
