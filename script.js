const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function getTasks() {
  return (JSON.parse(localStorage.getItem("tasks")) || []);
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  listContainer.innerHTML = "";
  const tasks = getTasks();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
      <input type="checkbox" ${task.done ? "checked" : ""}>
      <span class= "task-span ${task.done ? "completed" : ""}">${task.text}</span>
      </label>
      
        <span class="delete-btn ${task.done ? "completed" : ""}"">🗑</span>
        <span class="edit-btn ${task.done ? "completed" : ""}"">🖋</span>
    `;
    listContainer.appendChild(li);

    //Attach event listeners
    const checkbox = li.querySelector("input");
    const editButton = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector(".task-span");
    const deleteButton = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", () => {
      tasks[index].done = checkbox.checked;
      saveTasks(tasks);
      renderTasks();
    });

    editButton.addEventListener("click", () => {
      const update = prompt("Edit Task:", taskSpan.textContent.trim());
      if (update !== null && update.trim() !== "") {
        tasks[index].text = update.trim();
        tasks[index].done = false;
        saveTasks(tasks);
        renderTasks();
      }
    });
    deleteButton.addEventListener("click", () => {
      if (confirm("Are you sure?")) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
      }
    });
  });    
}

function addTask() {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please write down a task");
    return;
  }

  const tasks = getTasks();
  tasks.push({ text: taskText, done: false });
  saveTasks(tasks);

  inputBox.value = "";
  renderTasks();
}

// Initial load
renderTasks();
