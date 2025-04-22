interface Task {
    id: number;
    text: string;
    completed: boolean;
}


const input = document.getElementById("quote-input") as HTMLInputElement;
const button = document.getElementById("add-button") as HTMLButtonElement;
const list = document.getElementById("quote-list") as HTMLUListElement;
const clearBtn = document.getElementById("clear-button") as HTMLButtonElement;

let tasks: Task[] = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {

    const stored = localStorage.getItem("tasks");
    if (stored) {
        tasks = JSON.parse(stored);
        renderTasks();
    }
}

function renderTasks() {
    list.innerHTML = "";
    input.value = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.className = task.completed ? "completed" : "";

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        })

        // add delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = 'X';
        delBtn.className = 'delete-btn';

        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.appendChild(delBtn);
        list.appendChild(li);
    });

}

button.addEventListener("click", () => {
    const tasktext = input.value.trim();

    if (tasktext !== "") {
        const newTask: Task = {
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

clearBtn.addEventListener("click", ()=>{
    tasks = [];
    saveTasks();
    renderTasks();
});

loadTask();