// Get DOM elements
const taskInput = document.getElementById("task") as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLSelectElement;
const addBtn = document.getElementById("add") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;

// Define a class for tasks with category
class Task {
  constructor(
    public name: string,
    public completed: boolean,
    public category: string
  ) {}
}

// Create an array to store tasks
let tasks: Task[] = [];

// Function to add a task
function addTask() {
  const taskName = taskInput.value;
  const category = categoryInput.value || "General"; // Default category if not specified

  if (taskName) {
    const task = new Task(taskName, false, category);
    tasks.push(task);
    saveTasksToLocalStorage(); // Save tasks to local storage
    taskInput.value = "";
    renderTasks();
  }
}

// Function to toggle task completion
function toggleTaskCompletion(index: number) {
  tasks[index].completed = !tasks[index].completed;
  saveTasksToLocalStorage(); // Save tasks to local storage
  renderTasks();
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
                    <div class="task-list">
                        <div class="taskNameCategory">
                            <span class='taskName'>${task.name}</span>
                            <span class="category"> ${task.category}</span>
                        </div>
                        <div class="task-btns">
                            <button class="complete-btn">${
                              task.completed ? "!✅" : "✅"
                            }</button>
                            <button class="delete-btn">❌</button>
                        <div>
                    <div>
                     `;

    const completeBtn = li.querySelector(".complete-btn") as HTMLButtonElement;
    const deleteBtn = li.querySelector(".delete-btn") as HTMLButtonElement;

    completeBtn.addEventListener("click", () => toggleTaskCompletion(index));
    deleteBtn.addEventListener("click", () => deleteTask(index));
    taskList.appendChild(li);
  });
}

// Function to delete a task
function deleteTask(index: number) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage(); // Save tasks to local storage
  renderTasks();
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
}

// Get tasks from local storage on page load
getTasksFromLocalStorage();

// Event listener for adding tasks
addBtn.addEventListener("click", addTask);

// Initial rendering
renderTasks();
