"use strict";
// Get DOM elements
const taskInput = document.getElementById("task");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("add");
const taskList = document.getElementById("taskList");
// Define a class for tasks with category
class Task {
    constructor(name, completed, category) {
        this.name = name;
        this.completed = completed;
        this.category = category;
    }
}
// Create an array to store tasks
let tasks = [];
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
function toggleTaskCompletion(index) {
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
                            <p class="complete-btn">${task.completed ? "!✅" : "✅"}</p>
                            <p class="delete-btn">❌</p>
                        <div>
                    <div>
                     `;
        const completeBtn = li.querySelector(".complete-btn");
        const deleteBtn = li.querySelector(".delete-btn");
        completeBtn.addEventListener("click", () => toggleTaskCompletion(index));
        deleteBtn.addEventListener("click", () => deleteTask(index));
        taskList.appendChild(li);
    });
}
// Function to delete a task
function deleteTask(index) {
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
