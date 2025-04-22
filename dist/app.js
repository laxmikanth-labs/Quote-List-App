"use strict";
var input = document.getElementById("quote-input");
var button = document.getElementById("add-button");
var list = document.getElementById("quote-list");
var clearBtn = document.getElementById("clear-button");
var tasks = [];
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTask() {
    var stored = localStorage.getItem("tasks");
    if (stored) {
        tasks = JSON.parse(stored);
        renderTasks();
    }
}
function renderTasks() {
    list.innerHTML = "";
    input.value = "";
    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.textContent = task.text;
        li.className = task.completed ? "completed" : "";
        li.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });
        // add delete button
        var delBtn = document.createElement("button");
        delBtn.textContent = 'X';
        delBtn.className = 'delete-btn';
        delBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            tasks = tasks.filter(function (t) { return t.id !== task.id; });
            saveTasks();
            renderTasks();
        });
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}
button.addEventListener("click", function () {
    var tasktext = input.value.trim();
    if (tasktext !== "") {
        var newTask = {
            id: Date.now(),
            text: tasktext,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
    }
    input.innerHTML = "";
    input.placeholder = "Enter a new task";
});
clearBtn.addEventListener("click", function () {
    tasks = [];
    saveTasks();
    renderTasks();
});
loadTask();
