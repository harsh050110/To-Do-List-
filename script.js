const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("taskButton");
const taskList = document.getElementById("tasklist");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation(); 
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}
addButton.addEventListener("click", () => {
  const text = taskInput.value.trim(); 

  if (text === "") return; 


  tasks.push({ text: text, completed: false });

  saveTasks();
  renderTasks();

  taskInput.value = "";
});

renderTasks();
