const nameInput = document.getElementById("name");
const dropdown = document.getElementById("dropdown");
const addButton = document.getElementById("add-button");
const dateInput = document.getElementById("date");
const taskInput = document.getElementById("task");
const taskList = document.querySelector(".tasklist");

const assignButton = document.getElementById("assign-button");
const clearButton = document.querySelector(".clear-button");
const resetButton = document.querySelector(".reset-button");

// Event Listeners
addButton.addEventListener("click", addName);
assignButton.addEventListener("click", addTask);
clearButton.addEventListener("click", clearCompleted);
resetButton.addEventListener("click", reset);

// Function to add teammate name
function addName() {
    if (nameInput.value.trim() === '') {
        alert("You must enter a teammate's name!");
        return;
    }

    const seenNames = new Set(Array.from(dropdown.options).slice(1).map(option => option.value));
    if (seenNames.has(nameInput.value)) {
        alert("Name already entered, enter a different name!");
        nameInput.value = '';
        return;
    }

    let newOption = document.createElement("option");
    newOption.value = nameInput.value;
    newOption.textContent = nameInput.value;
    dropdown.appendChild(newOption);

    dropdown.options[0].disabled = true;
    nameInput.value = '';
    sortDropdownOptions();
}

// Function to sort dropdown options alphabetically
function sortDropdownOptions() {
    const optionsArray = Array.from(dropdown.options).slice(1);
    optionsArray.sort((a, b) => a.text.localeCompare(b.text));
    optionsArray.forEach(option => dropdown.appendChild(option));
}

// Function to add a task
function addTask() {
    if (taskInput.value.trim() === '') {
        alert("You must enter a task!");
        return;
    }

    if (dateInput.value === '') {
        alert("You must enter a date!");
        return;
    }

    if (dropdown.selectedIndex === 0) {
        alert("You must assign a teammate!");
        return;
    }

    let enteredDate = new Date(dateInput.value);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (enteredDate < today) {
        alert("The due date cannot be earlier than today!");
        return;
    }

    let selectedTeammate = dropdown.value;
    let teammateSection = document.querySelector(`.tasksection[data-name="${selectedTeammate}"]`);

    if (!teammateSection) {
        teammateSection = createTeammateSection(selectedTeammate);
        taskList.appendChild(teammateSection);
    }

    let taskRow = createTaskRow(taskInput.value, dateInput.value);
    teammateSection.appendChild(taskRow);

    taskInput.value = '';
    dateInput.value = '';
    taskList.classList.remove("hidden");

    sortTeammateSections();
    sortTasksByDate(teammateSection);

    // Hide "No tasks right now" message when a task is added
    hideNoTasksMessage();
}

// Function to create a teammate section
function createTeammateSection(name) {
    let section = document.createElement("div");
    section.className = "tasksection";
    section.setAttribute("data-name", name);

    let header = document.createElement("div");
    header.className = "personname";
    header.innerHTML = `<span class="personname_h2">${name}</span>`;
    section.appendChild(header);

    let text = document.createElement("div");
    text.className = "text";
    text.innerHTML = '<span class="text"></span>';

    return section;
}

// Function to create a task row
function createTaskRow(taskDescription, dueDate) {
    let taskRow = document.createElement("div");
    taskRow.className = "task1";
    taskRow.innerHTML = `
        <span class="instruction">${taskDescription}</span>
        <div class="due-date">
            <span class="due-text">Due: ${dueDate}</span>
            <input type="checkbox" class="task-checkbox">
        </div>
    `;

    taskRow.querySelector('.task-checkbox').addEventListener('change', strikeTask);
    return taskRow;
}

// Function to sort teammate sections alphabetically
function sortTeammateSections() {
    let sections = Array.from(taskList.querySelectorAll(".tasksection"));
    sections.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
    sections.forEach(section => taskList.appendChild(section));
}

// Function to sort tasks by due date
function sortTasksByDate(section) {
    let tasks = Array.from(section.querySelectorAll(".task1"));
    tasks.sort((a, b) => {
        let dateA = new Date(a.querySelector(".due-text").textContent.slice(5));
        let dateB = new Date(b.querySelector(".due-text").textContent.slice(5));
        return dateA - dateB;
    });
    tasks.forEach(task => section.appendChild(task));
}

// Function to strike through completed tasks
function strikeTask() {
    let taskDescription = this.closest(".task1").querySelector(".instruction");
    if (this.checked) {
        taskDescription.style.textDecoration = "line-through";
    } else {
        taskDescription.style.textDecoration = "none";
    }
}

// Function to clear completed tasks
function clearCompleted() {
    let completedTasks = document.querySelectorAll(".task1 input[type='checkbox']:checked");

    if (completedTasks.length === 0) {
        alert("There are no completed tasks to clear.");
        return;
    }

    completedTasks.forEach(checkbox => {
        checkbox.closest(".task1").remove();
    });

    // Remove empty teammate sections
    let sections = document.querySelectorAll(".tasksection");
    sections.forEach(section => {
        if (section.querySelectorAll(".task1").length === 0) {
            section.remove();
        }
    });

    checkAndShowNoTasksMessage();
}

// Function to reset the task list and form
function reset() {
    const confirmation = confirm("Are you sure you want to reset all teammates and to-do items?");
    if (!confirmation) return;

    let sections = Array.from(taskList.querySelectorAll(".tasksection"));
    sections.forEach(section => section.remove());

    dropdown.innerHTML = '<option value="option1" selected disabled>Assign to</option>';
    nameInput.value = '';
    taskInput.value = '';
    dateInput.value = '';

    checkAndShowNoTasksMessage();
}

// Function to check if there are no tasks and show the message
function checkAndShowNoTasksMessage() {
    if (document.querySelectorAll(".task1").length === 0) {
        showNoTasksMessage();
    }
}

// Function to show "No tasks right now" message
function showNoTasksMessage() {
    const message = document.createElement("div");
    message.className = "text";
    message.innerHTML = '<span>No tasks right now. Please add a teammate and assign a task.</span>';
    taskList.innerHTML = '';  // Clear existing tasks
    taskList.appendChild(message);
}

// Function to hide "No tasks right now" message
function hideNoTasksMessage() {
    const message = document.querySelector(".tasklist .text");
    if (message) {
        message.remove();
    }
}
