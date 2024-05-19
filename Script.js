let customCategories = []; // Array to store custom categories

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    const taskCategory = document.getElementById('task-category').value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'task-text';
    newTask.appendChild(taskSpan);

    const categorySpan = document.createElement('span');
    categorySpan.textContent = `(${taskCategory})`;
    categorySpan.className = 'task-category';
    newTask.appendChild(categorySpan);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = function() {
        const newText = prompt('Edit task:', taskSpan.textContent);
        if (newText) {
            taskSpan.textContent = newText;
        }
    };
    newTask.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        taskList.removeChild(newTask);
    };
    newTask.appendChild(deleteButton);

    const upButton = document.createElement('button');
    upButton.textContent = 'Up';
    upButton.className = 'up';
    upButton.onclick = function() {
        const prevTask = newTask.previousElementSibling;
        if (prevTask) {
            taskList.insertBefore(newTask, prevTask);
        }
    };
    newTask.appendChild(upButton);

    const downButton = document.createElement('button');
    downButton.textContent = 'Down';
    downButton.className = 'down';
    downButton.onclick = function() {
        const nextTask = newTask.nextElementSibling;
        if (nextTask) {
            taskList.insertBefore(nextTask, newTask);
        }
    };
    newTask.appendChild(downButton);

    newTask.setAttribute('data-category', taskCategory.toLowerCase());

    taskList.appendChild(newTask);

    taskInput.value = '';
    document.getElementById('task-category').value = ''; // Clear category input after adding task

    // If the category is not already in the custom categories array and it's not a default category, add it
    if (!customCategories.includes(taskCategory.toLowerCase()) && !['work', 'personal', 'health', 'home', 'social', 'miscellaneous'].includes(taskCategory.toLowerCase())) {
        customCategories.push(taskCategory.toLowerCase());
        updateFilterButtons(); // Update filter buttons to include the new category
    }
}

function updateFilterButtons() {
    const filtersContainer = document.querySelector('.filters');
    filtersContainer.innerHTML = ''; // Clear existing filter buttons
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.onclick = function() {
        filterTasks('All');
    };
    filtersContainer.appendChild(allButton);

    // Add default category buttons
    const defaultCategories = ['Work', 'Personal', 'Health', 'Home', 'Social', 'Miscellaneous'];
    defaultCategories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = function() {
            filterTasks(category);
        };
        filtersContainer.appendChild(button);
    });

    // Add custom category buttons
    customCategories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = function() {
            filterTasks(category);
        };
        filtersContainer.appendChild(button);
    });
}

function filterTasks(category) {
    const taskList = document.getElementById('task-list');
    const tasks = taskList.getElementsByTagName('li');

    for (let task of tasks) {
        const taskCategory = task.getAttribute('data-category');
        if (category === 'All' || taskCategory === category.toLowerCase()) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    }
}

function searchTasks() {
    const searchBar = document.getElementById('search-bar');
    const searchText = searchBar.value.toLowerCase();
    const taskList = document.getElementById('task-list');
    const tasks = taskList.getElementsByTagName('li');

    for (let task of tasks) {
        const taskText = task.getElementsByClassName('task-text')[0].textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    }
}
