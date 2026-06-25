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


// ===== INIT =====
renderTasks();
renderHabits();