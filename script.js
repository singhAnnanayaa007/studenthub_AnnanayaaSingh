// ===== TASK MANAGER =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        li.innerHTML = `
            <div>
                <input type="checkbox" ${task.done ? "checked" : ""}>
                <span class="${task.done ? "completed" : ""}">${task.text}</span>
            </div>
            <button class="delete-btn">✕</button>
        `;

        // toggle
        li.querySelector("input").addEventListener("click", () => {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        });

        // delete
        li.querySelector("button").addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", () => {
    if (!taskInput.value.trim()) return;

    tasks.push({ text: taskInput.value, done: false });
    taskInput.value = "";

    saveTasks();
    renderTasks();
});


// ===== HABIT TRACKER =====
const habitsList = ["Read", "Exercise", "Drink Water"];

let habits = JSON.parse(localStorage.getItem("habits")) || {};
let lastReset = localStorage.getItem("lastReset");

const habitList = document.getElementById("habitList");
const resetBtn = document.getElementById("resetHabitsBtn");

function checkReset() {
    const today = new Date().toDateString();

    if (lastReset !== today) {
        habits = {};
        localStorage.setItem("lastReset", today);
    }
}

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
    checkReset();
    habitList.innerHTML = "";

    habitsList.forEach(habit => {
        const li = document.createElement("li");
        li.className = "habit-item";

        const done = habits[habit] || false;

        li.innerHTML = `
            <span>${habit}</span>
            <button class="habit-btn ${done ? "done" : "not-done"}">
                ${done ? "Done" : "Mark"}
            </button>
        `;

        li.querySelector("button").addEventListener("click", () => {
            habits[habit] = !done;
            saveHabits();
            renderHabits();
        });

        habitList.appendChild(li);
    });

    saveHabits();
}

resetBtn.addEventListener("click", () => {
    habits = {};
    saveHabits();
    renderHabits();
});

// ===== STICKY NOTES =====
let notes = JSON.parse(localStorage.getItem("notes")) || [];

const noteTitle = document.getElementById("noteTitle");
const noteBody = document.getElementById("noteBody");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <button onclick="deleteNote(${index})">X</button>
            <h4>${note.title}</h4>
            <p>${note.body}</p>
        `;

        // Click to edit (simple inline edit)
        div.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return;

            const newTitle = prompt("Edit title:", note.title);
            const newBody = prompt("Edit note:", note.body);

            if (newTitle !== null && newBody !== null) {
                notes[index] = { title: newTitle, body: newBody };
                saveNotes();
                renderNotes();
            }
        });

        notesContainer.appendChild(div);
    });

    saveNotes();
}

function addNote() {
    if (!noteTitle.value.trim() && !noteBody.value.trim()) return;

    notes.push({
        title: noteTitle.value,
        body: noteBody.value
    });

    noteTitle.value = "";
    noteBody.value = "";

    renderNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

addNoteBtn.addEventListener("click", addNote);

// INIT
renderNotes();


// ===== INIT =====
renderTasks();
renderHabits();