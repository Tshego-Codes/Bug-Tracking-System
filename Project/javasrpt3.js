//this adds a new person to people array and 
// creates new person when user submits the form.

function addPersonFromForm(name, surname, email, username) {
    let newPerson = createPerson(
        generateId(),
        name,
        surname,
        email,
        username
    );
    people.push(newPerson);
    saveAll();
    renderPeopleTable();
}



// updates an existing person in people array using the index to locate the object
// and used to save changes when user edits a person.

function updatePersonById(id, name, surname, email, username) {
    let index = people.findIndex(p => p.id == id);
    if (index !== -1) {
        people[index] = { id, name, surname, email, username };
        saveAll();
        renderPeopleTable();
    }
}



//This function deletes a person from array and removes a person when user clicks delete
//  and Checks if person has any issues before deleting
function deletePersonById(id) {

    let assignedIssues = issues.filter(issue => issue.assignedTo == getPersonById(id)?.username);
    if (assignedIssues.length > 0) {
        if (!confirm(`Warning: This person is assigned to ${assignedIssues.length} issue(s). Delete anyway?`)) {
            return false;
        }
    }
    people = people.filter(p => p.id != id);
    saveAll();
    renderPeopleTable();
    return true;
}



// get a person using their ID and find a person
//  when editing or displaying.
function getPersonById(id) {
    return people.find(p => p.id == id);
}


//adds a new project to projects array and it
//  creates a new project when the user submits the form.

function addProjectFromForm(name) {
    let newProject = createProject(
        generateId(),
        name
    );
    projects.push(newProject);
    saveAll();
    renderProjectsTable();
}

//updates an existing project in the projects array. It is used to save changes when the user edits a project.

function updateProjectById(id, name) {
    let index = projects.findIndex(p => p.id == id);
    if (index !== -1) {
        projects[index] = { id, name };
        saveAll();
        renderProjectsTable();
    }
}

//deletes a project from the projects array and its used in 
// order to remove a project when the user clicks the delete button.

function deleteProjectById(id) // Check if project has any issues before deleting
{

    let linkedIssues = issues.filter(issue => issue.projectId == id);
    if (linkedIssues.length > 0) {
        if (!confirm(`Warning: Project has ${linkedIssues.length} issue(s). Delete anyway?`)) {
            return false;
        }
    }
    projects = projects.filter(p => p.id != id);
    saveAll();
    renderProjectsTable();
    return true;
}





//this function opens the add person popup with empty fields.

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

//the function opens the edit person popup with existing person data.

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

//function saves a person from the popup
//  form ad it adds or edits.

function savePersonFromModal() {
    let id = document.getElementById("personId").value;
    let name = document.getElementById("personName").value.trim();
    let surname = document.getElementById("personSurname").value.trim();
    let email = document.getElementById("personEmail").value.trim();
    let username = document.getElementById("personUsername").value.trim();

    if (!name || !surname || !email || !username) {
        alert("Please fill all fields");
        return;
    }

    //It Checks if username already exists for new person
    let existingPerson = getPersonByUsername(username);
    if (!id && existingPerson) {
        alert("Username already exists. Please choose a different username.");
        return;
    }

    if (id) {
        updatePersonById(id, name, surname, email, username);
    } else {
        addPersonFromForm(name, surname, email, username);
    }

    bootstrap.Modal.getInstance(document.getElementById("personModal")).hide();
}

//this function opens the add project popup with empty field.

function openAddProjectModal() {
    document.getElementById("projectModalTitle").innerText = "Add Project";
    document.getElementById("projectId").value = "";
    document.getElementById("projectName").value = "";
    let modal = new bootstrap.Modal(document.getElementById("projectModal"));
    modal.show();
}

// function opens the edit project modal with
//  existing data.

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




