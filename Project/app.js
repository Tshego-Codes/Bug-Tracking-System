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