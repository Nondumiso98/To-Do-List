// Selectors
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const reminderTimeInput = document.getElementById('reminder-time');
const taskList = document.getElementById('task-list');
const emailReminderBtn = document.getElementById('email-reminder-btn');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach((task) => addTaskToUI(task.text, task.reminderTime, task.id, task.completed));
});

// Add a task
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    const task = taskInput.value.trim();
    const reminderTime = reminderTimeInput.value;

    if (task && reminderTime) {
        const taskId = Date.now(); // Use timestamp as unique ID
        const newTask = { id: taskId, text: task, reminderTime: reminderTime, completed: false };
        saveTaskToLocalStorage(newTask);
        addTaskToUI(task, reminderTime, taskId);
        taskInput.value = ''; // Clear the input
        reminderTimeInput.value = ''; // Clear the input
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
function addTaskToUI(task, reminderTime, taskId, isCompleted = false) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${isCompleted ? 'checked' : ''}>
        <span>${task}</span>
        <span>${new Date(reminderTime).toLocaleString()}</span>
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

document.addEventListener('DOMContentLoaded', () => {
    const currentTimeElement = document.getElementById('current-time');

    function updateTime() {
        const now = new Date();
        const formattedTime = now.toLocaleString();
        currentTimeElement.textContent = formattedTime;
    }

    setInterval(updateTime, 1000);
    updateTime();
});