// Selectors
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach((task) => addTaskToUI(task.text, task.id, task.completed));
});

// Add a task
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    const task = taskInput.value.trim();

    if (task) {
        const taskId = Date.now(); // Use timestamp as unique ID
        const newTask = { id: taskId, text: task, completed: false };
        saveTaskToLocalStorage(newTask);
        addTaskToUI(task, taskId);
        taskInput.value = ''; // Clear the input
    }
});

// Remove a task
function removeTask(taskId, li) {
    li.remove(); // Remove from UI
    removeTaskFromLocalStorage(taskId);
}

// Complete a task
function completeTask(li, taskId) {
    li.classList.toggle('completed');
    toggleTaskCompletionInLocalStorage(taskId, li.classList.contains('completed'));
}

// Add task to UI
function addTaskToUI(task, taskId, isCompleted = false) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${task}
        <div>
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    if (isCompleted) {
        li.classList.add('completed');
    }

    // Event listeners for buttons
    li.querySelector('.complete-btn').addEventListener('click', () => completeTask(li, taskId));
    li.querySelector('.delete-btn').addEventListener('click', () => removeTask(taskId, li));

    taskList.appendChild(li);
}

// Local Storage: Save task
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Local Storage: Remove task
function removeTaskFromLocalStorage(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Local Storage: Toggle task completion
function toggleTaskCompletionInLocalStorage(taskId, isCompleted) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: isCompleted } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
