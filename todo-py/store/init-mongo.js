db = new Mongo().getDB('todo_db');
db.createCollection('todos');

var todos = [
    { id: '1', title: 'Sample Todo 1', completed: false },
    { id: '2', title: 'Sample Todo 2', completed: true },
    { id: '3', title: 'Sample Todo 3', completed: false }
    { id: '4', title: 'Sample Todo 4', completed: true }
    { id: '5', title: 'Sample Todo 5', completed: false }
];

db.todos.insertMany(todos);
