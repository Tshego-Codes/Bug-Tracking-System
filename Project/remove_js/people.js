

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




