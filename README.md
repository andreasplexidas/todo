Features

Add new todos: Users can enter a new task in the input field and click the "Add" button to add it to their todo list.
Mark as completed: Users can mark a todo as completed by checking the corresponding checkbox.
Delete todos: Users can delete a todo by clicking the "Delete" button next to it.
Persistence: The todo list is stored in a PostgreSQL database, ensuring that the todos are saved even if the server is restarted.

Technologies Used

Front-end: HTML, CSS, JavaScript
Back-end: Python, Flask (web framework)
Database: PostgreSQL
Containerization: Docker, Docker Compose

TIP Before cloning create a folder(client)with the app.js,Dockerfilec,index.html),anothe file for the server(requirement.txt,main.py,Dockerfile),another for theinit-mongo.js, and out of these files are the gitignore and docker-compose.yml.All of these files are in a file named todo

Installation and Setup

Clone the repository: git clone [repository URL]
Navigate to the project directory: cd todo
Build and run the Docker containers: docker-compose up
Access the Todo App in your web browser: http://localhost:8080

# todo
