const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Allow adding tasks with the "Add" button or the "Enter" key
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    
    // Create span for the text
    const span = document.createElement('span');
    span.textContent = taskText;
    span.classList.add('task-content');
    
    // Mark task complete by clicking anywhere on the list item
    li.addEventListener('click', function(e) {
        // Prevent toggle if the user is clicking the delete button specifically
        if (!e.target.closest('.delete-btn')) {
            li.classList.toggle('completed');
        }
    });

    // Create a styled remove button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '✕'; 
    deleteBtn.classList.add('delete-btn');
    
    // Delete task with a fade-out animation
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Stops the click from bubbling up and triggering the completion toggle
        li.classList.add('fade-out');
        
        // Wait 300ms for the CSS animation to finish before removing it from the DOM
        setTimeout(() => {
            li.remove();
        }, 300);
    });

    // Assemble the list item and add it to the UI
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear input field and set focus back to it
    taskInput.value = '';
    taskInput.focus();
}