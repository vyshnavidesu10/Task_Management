let tasks = [];
let deletedTasks = [];
let completedTasks = [];
let name = "";
let taskIdCounter = 0;

function getName() {
  name = document.getElementById("name").value;
  document.getElementById(
    "greeting"
  ).innerText = `Hello, ${name}! Here are your tasks:`;
}

function addTask() {
  const taskInput = document.getElementById("taskInput").value.trim();
  const taskDeadline = document.getElementById("taskDeadline").value;

  if (
    taskInput &&
    !tasks.some((task) => task.text.toLowerCase() === taskInput.toLowerCase())
  ) {
    tasks.push({
      id: taskIdCounter++,
      text: taskInput,
      completed: false,
      deadline: taskDeadline,
    });
    document.getElementById("taskInput").value = "";
    document.getElementById("taskDeadline").value = "";
    updateTaskList();
    updateProgress();
  } else if (taskInput) {
    alert("Task already exists. Please enter a new task.");
  }
}

function updateTaskList() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `${task.text} - <strong>Deadline:</strong> ${task.deadline}
            <button onclick="markCompleted(${task.id})">Complete</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="editTask(${task.id})">Edit</button>`;
    taskList.appendChild(taskItem);
  });
}

function markCompleted(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    completedTasks.push(tasks[index]);
    tasks.splice(index, 1);
    updateTaskList();
    updateProgress();
  }
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    deletedTasks.push(tasks[index]);
    tasks.splice(index, 1);
    updateTaskList();
  }
}

function showPending() {
  updateTaskList();
}

function showCompleted() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  completedTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `${task.text}  <strong>Deadline:</strong> ${task.deadline} <span>(Completed)</span>`;
    taskList.appendChild(taskItem);
  });
}

function showDeleted() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  deletedTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `${task.text} - <strong>Deadline:</strong> ${task.deadline} <span>(Deleted)</span>`;
    taskList.appendChild(taskItem);
  });
}

function showAllTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `${task.text} - <strong>Deadline:</strong> ${task.deadline} <span>(Pending)</span>`;
    taskList.appendChild(taskItem);
  });

  completedTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `${task.text} - <strong>Deadline:</strong> ${task.deadline} <span>(Completed)</span>`;
    taskList.appendChild(taskItem);
  });

  deletedTasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `${task.text} - <strong>Deadline:</strong> ${task.deadline} <span>(Deleted)</span>`;
    taskList.appendChild(taskItem);
  });
}

function updateProgress() {
  const totalTasks = tasks.length + completedTasks.length;
  const progressValue = totalTasks
    ? (completedTasks.length / totalTasks) * 100
    : 0;

  document.getElementById("taskProgress").value = progressValue;
  document.getElementById(
    "progressPercentage"
  ).innerText = `${progressValue.toFixed(2)}%`;
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
}

function editTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    console.error("Task not found");
    return;
  }

  const newTaskName = prompt("Edit your task", task.text);
  const newDeadline = prompt("Edit your deadline", task.deadline);

  if (newTaskName && newTaskName.trim() !== "") {
    task.text = newTaskName.trim();
    task.deadline = newDeadline.trim();
    updateTaskList();
  }
}
