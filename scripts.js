document.addEventListener("DOMContentLoaded", loadTasks);

function showTab(tab) {
    const tabs = document.querySelectorAll('.todo-list');
    tabs.forEach(t => t.classList.remove('active'));
    document.getElementById(tab).classList.add('active');

    const tabButtons = document.querySelectorAll('.tab');
    tabButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.tab[onclick="showTab('${tab}')"]`).classList.add('active');

    const todoInput = document.querySelector('.todo-input');
    const deleteAllButton = document.querySelector('.delete-all');
    
    if (tab === 'completed') {
        todoInput.style.display = 'none';
        deleteAllButton.style.display = 'block';
    } else {
        todoInput.style.display = 'flex';
        deleteAllButton.style.display = 'none';
    }
}

function addTask() {
    const taskText = document.getElementById('new-task').value;
    if (taskText.trim() === '') return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    saveTask(task);
    renderTasks();
    document.getElementById('new-task').value = '';
}

function toggleTask(checkbox) {
    const taskId = checkbox.parentElement.getAttribute('data-id');
    const tasks = getTasks();
    const task = tasks.find(t => t.id == taskId);
    task.completed = checkbox.checked;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id != taskId);
    saveTasks(tasks);
    renderTasks();
}

function deleteAll() {
    const tasks = getTasks().filter(task => !task.completed);
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

function renderTask(task) {
    const allList = document.getElementById('all');
    const activeList = document.getElementById('active');
    const completedList = document.getElementById('completed');

    const taskItem = document.createElement('div');
    taskItem.className = 'todo-item';
    taskItem.setAttribute('data-id', task.id);
    taskItem.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(this)">
        <label>${task.text}</label>
    `;

    const taskItemWithDelete = taskItem.cloneNode(true);
    taskItemWithDelete.innerHTML += '<button onclick="deleteTask('+ task.id +')">X</button>';

    if (task.completed) {
        completedList.appendChild(taskItemWithDelete);
    } else {
        activeList.appendChild(taskItem);
    }

    allList.appendChild(taskItem.cloneNode(true));
}

function renderTasks() {
    const allList = document.getElementById('all');
    const activeList = document.getElementById('active');
    const completedList = document.getElementById('completed');

    allList.innerHTML = '';
    activeList.innerHTML = '';
    completedList.innerHTML = '';

    const tasks = getTasks();
    tasks.forEach(task => renderTask(task));
}

function loadTasks() {
    renderTasks();
}
