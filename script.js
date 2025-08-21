// Part 1: Mastering JavaScript Basics - Variables and Conditionals
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearTasksBtn = document.getElementById('clearTasksBtn');
let tasks = []; // Array to store tasks
let taskCounter = 0; // Counter for total tasks

// Check if input is valid before adding task
function isValidTask(task) {
    if (task.trim() === '') {
        alert('Please enter a task!');
        return false;
    }
    if (tasks.includes(task)) {
        alert('This task already exists!');
        return false;
    }
    return true;
}

// Part 2: JavaScript Functions - Custom Functions
// Function to add a new task
function addTask(taskText) {
    if (!isValidTask(taskText)) return;
    
    tasks.push(taskText);
    taskCounter++;
    
    // Create new list item
    const li = document.createElement('li');
    li.textContent = taskText;
    
    // Add toggle completion button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Complete';
    toggleBtn.onclick = () => toggleTaskCompletion(li);
    li.appendChild(toggleBtn);
    
    taskList.appendChild(li);
    updateTaskCount();
    taskInput.value = ''; // Clear input
}

// Function to toggle task completion status
function toggleTaskCompletion(taskElement) {
    taskElement.classList.toggle('completed');
    updateTaskCount();
}

// Part 3: JavaScript Loops - Loop Examples
// Loop 1: Update task count using forEach
function updateTaskCount() {
    let completedTasks = 0;
    taskList.querySelectorAll('li').forEach(task => {
        if (task.classList.contains('completed')) {
            completedTasks++;
        }
    });
    taskCount.textContent = `Tasks: ${taskCounter} (Completed: ${completedTasks})`;
}

// Loop 2: Clear completed tasks using for loop
function clearCompletedTasks() {
    const allTasks = taskList.getElementsByTagName('li');
    for (let i = allTasks.length - 1; i >= 0; i--) {
        if (allTasks[i].classList.contains('completed')) {
            taskList.removeChild(allTasks[i]);
            taskCounter--;
        }
    }
    // Update tasks array to remove completed tasks
    tasks = tasks.filter(task => {
        const li = Array.from(taskList.getElementsByTagName('li')).find(
            item => item.textContent.includes(task)
        );
        return li && !li.classList.contains('completed');
    });
    updateTaskCount();
}

// Part 4: DOM Interactions
// Interaction 1: Add task on button click
addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
});

// Interaction 2: Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(taskInput.value);
    }
});

// Interaction 3: Clear completed tasks on button click
clearTasksBtn.addEventListener('click', () => {
    clearCompletedTasks();
});
