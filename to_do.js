let taskList = [];

window.onload = function () {
  loadTasks();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText !== "") {
    taskList.push({ text: taskText, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");

    li.onclick = () => toggleTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function toggleTask(index) {
  taskList[index].completed = !taskList[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (stored) taskList = JSON.parse(stored);
  renderTasks();
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => {
      console.log('✅ Service Worker Registered');
    })
    .catch(error => {
      console.log('❌ Service Worker registration failed:', error);
    });
}