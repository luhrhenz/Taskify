const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

window.addEventListener("DOMContentLoaded", showSavedTasks);
addBtn.addEventListener("click", addTask);

function addTask() {
  const text = input.value.trim();
  if (text === "") {
    alert("Please type a task!");
    return;
  }

  const li = makeTaskItem(text);
  todoList.appendChild(li);
  saveTasks();
  input.value = "";
}

function makeTaskItem(text, createdAt = new Date(), done = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const date = document.createElement("small");
  date.textContent = "Created: " + formatDate(createdAt);

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";

  li.appendChild(span);
  li.appendChild(date);
  li.appendChild(delBtn);

  if (done) li.classList.add("done");

  span.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  delBtn.addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  return li;
}

function formatDate(date) {
  return date.toLocaleDateString() + " - " + date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function saveTasks() {
  const allTasks = [];

  todoList.querySelectorAll("li").forEach((li) => {
    const text = li.querySelector("span").textContent;
    const done = li.classList.contains("done");
    const time = li.querySelector("small").textContent.replace("Created: ", "");
    const dateObj = new Date();
    allTasks.push({
      text,
      done,
      createdAt: dateObj.toISOString(),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function showSavedTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];

  saved.forEach((task) => {
    const li = makeTaskItem(task.text, new Date(task.createdAt), task.done);
    todoList.appendChild(li);
  });
}


