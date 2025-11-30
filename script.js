const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const themeSelector = document.getElementById("themeSelector");

const BACKEND_URL = "http://localhost:5000";

// ----------------------
// Fetch tasks from backend
// ----------------------
async function loadTasks() {
  try {
    const response = await fetch(`${BACKEND_URL}/tasks`);
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (err) {
    console.error("Failed to load tasks:", err);
  }
}

// ----------------------
// Add task to backend
// ----------------------
async function addTask(text) {
  try {
    const response = await fetch(`${BACKEND_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      loadTasks(); // Reload tasks after adding
    } else {
      console.error("Failed to add task");
    }
  } catch (err) {
    console.error(err);
  }
}

// ----------------------
// Delete task from backend
// ----------------------
async function removeTask(index) {
  try {
    const response = await fetch(`${BACKEND_URL}/tasks/${index}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadTasks(); // Reload tasks after deleting
    } else {
      console.error("Failed to delete task");
    }
  } catch (err) {
    console.error(err);
  }
}

// ----------------------
// Render tasks on page
// ----------------------
function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.style.marginLeft = "10px";
    btn.onclick = () => removeTask(index);

    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

// ----------------------
// Theme toggle
// ----------------------
themeSelector.addEventListener("change", () => {
  document.body.className = themeSelector.value;
});

// ----------------------
// Add task button
// ----------------------
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;
  addTask(text);
  taskInput.value = "";
});

// ----------------------
// Initial load
// ----------------------
// Show an alert on button click
document.getElementById("clickMe").addEventListener("click", async function() {
    try {
        const response = await fetch("http://localhost:5000/api");
        const data = await response.json();
        alert("Backend says: " + data.message);
    } catch (error) {
        alert("Oops! Could not reach backend 😅");
    }
});
loadTasks();
