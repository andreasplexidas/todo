window.addEventListener('DOMContentLoaded', () => {
    // API base URL
    const baseUrl = 'http://localhost:5000';

    // Add a new todo
    function addTodo() {
        var input = document.getElementById('newTodoInput');
        var newTodo = {
            id: Math.floor(Math.random() * 1000000).toString(),
            title: input.value,
            completed: false
        };
        var xhr = new XMLHttpRequest();
        xhr.open('POST', baseUrl + '/todos');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log('Add response:', response);
                input.value = '';
                getTodos();
            } else {
                console.error('Error:', xhr.status);
            }
        };
        xhr.send(JSON.stringify(newTodo));
    }

    // Get todos list
    function getTodos() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', baseUrl + '/todos');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var todos = JSON.parse(xhr.responseText);
                displayTodos(todos);
            } else {
                console.error('Error:', xhr.status);
            }
        };
        xhr.send();
    }

    // Display todos in the HTML
    function displayTodos(todos) {
        var todosList = document.getElementById('todosList');
        todosList.innerHTML = '';
        todos.forEach(function(todo) {
            var li = document.createElement('li');
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.onchange = function() {
                updateTodoStatus(todo.id, checkbox.checked);
            };
            var span = document.createElement('span');
            span.textContent = todo.title;
            if (todo.completed) {
                span.classList.add('completed');
            }
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                deleteTodoById(todo.id);
            };
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteButton);
            todosList.appendChild(li);
        });
    }

    // Update a todo's status
    function updateTodoStatus(id, completed) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', baseUrl + '/todos/' + id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log('Update response:', response);
                getTodos();
            } else {
                console.error('Error:', xhr.status);
            }
        };
        xhr.send(JSON.stringify({ completed: completed }));
    }

    // Delete a todo by ID
    function deleteTodoById(id) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', baseUrl + '/todos/' + id);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                console.log('Delete response:', response);
                getTodos();
            } else {
                console.error('Error:', xhr.status);
            }
        };
        xhr.send();
    }

document.getElementById('add-button').addEventListener('click', addTodo);

    // Initial load of todos
    getTodos();
});
