

const taskModal = document.getElementById("taskModal");
const createTaskBtn = document.getElementById("createTaskBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const taskForm = document.getElementById("taskForm");

const todoTasks = document.getElementById("todoTasks");
const progressTasks = document.getElementById("progressTasks");
const doneTasks = document.getElementById("doneTasks");

const todoCount = document.getElementById("todoCount");
const progressCount = document.getElementById("progressCount");
const doneCount = document.getElementById("doneCount");


document.addEventListener("DOMContentLoaded", loadTasks);

createTaskBtn.addEventListener("click", openModal);

closeModalBtn.addEventListener("click", closeModal);

cancelBtn.addEventListener("click", closeModal);

taskModal.addEventListener("click", function (event) {
    if (event.target === taskModal) {
        closeModal();
    }
});

taskForm.addEventListener("submit", createTask);


async function loadTasks() {
    try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
            throw new Error("Failed to load tasks");
        }

        const tasks = await response.json();

        displayTasks(tasks);
    } catch (error) {
        console.error(error);
        alert("Unable to load tasks.");
    }
}


function displayTasks(tasks) {
    todoTasks.innerHTML = "";
    progressTasks.innerHTML = "";
    doneTasks.innerHTML = "";

    let todoTotal = 0;
    let progressTotal = 0;
    let doneTotal = 0;

    tasks.forEach(task => {
        const taskCard = createTaskCard(task);

        if (task.status === "todo") {
            todoTasks.appendChild(taskCard);
            todoTotal++;
        } else if (task.status === "in_progress") {
            progressTasks.appendChild(taskCard);
            progressTotal++;
        } else if (task.status === "done") {
            doneTasks.appendChild(taskCard);
            doneTotal++;
        }
    });

    todoCount.textContent = todoTotal;
    progressCount.textContent = progressTotal;
    doneCount.textContent = doneTotal;

    showEmptyMessage(todoTasks, todoTotal);
    showEmptyMessage(progressTasks, progressTotal);
    showEmptyMessage(doneTasks, doneTotal);
}


function createTaskCard(task) {
    const card = document.createElement("div");
    card.className = "task-card";

    const title = document.createElement("h3");
    title.textContent = task.title;

    const description = document.createElement("p");
    description.textContent = task.description;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    if (task.status !== "todo") {
        const previousBtn = document.createElement("button");
        previousBtn.className = "previous-btn";
        previousBtn.textContent = "Previous";
        previousBtn.addEventListener("click", () => moveTask(task.id, getPreviousStatus(task.status)));
        actions.appendChild(previousBtn);
    } else {
        actions.appendChild(document.createElement("span"));
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(deleteBtn);

    if (task.status !== "done") {
        const nextBtn = document.createElement("button");
        nextBtn.className = "next-btn";
        nextBtn.textContent = "Next";
        nextBtn.addEventListener("click", () => moveTask(task.id, getNextStatus(task.status)));
        actions.appendChild(nextBtn);
    }

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(actions);

    return card;
}


function getNextStatus(status) {
    if (status === "todo") {
        return "in_progress";
    }

    if (status === "in_progress") {
        return "done";
    }

    return "done";
}


function getPreviousStatus(status) {
    if (status === "done") {
        return "in_progress";
    }

    if (status === "in_progress") {
        return "todo";
    }

    return "todo";
}


async function moveTask(taskId, newStatus) {
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: newStatus
            })
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        await loadTasks();
    } catch (error) {
        console.error(error);
        alert("Unable to move task.");
    }
}


async function createTask(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title || !description) {
        alert("Title and description are required.");
        return;
    }

    try {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to create task");
        }

        taskForm.reset();
        closeModal();

        await loadTasks();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}


async function deleteTask(taskId) {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        await loadTasks();
    } catch (error) {
        console.error(error);
        alert("Unable to delete task.");
    }
}


function showEmptyMessage(container, count) {
    if (count === 0) {
        const message = document.createElement("div");
        message.className = "empty-message";
        message.textContent = "No tasks";
        container.appendChild(message);
    }
}


function openModal() {
    taskModal.classList.add("active");
    document.getElementById("title").focus();
}


function closeModal() {
    taskModal.classList.remove("active");
    taskForm.reset();
}