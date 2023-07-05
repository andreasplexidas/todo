import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

connection = psycopg2.connect(
    host=os.environ.get("DB_HOST"),
    port=os.environ.get("DB_PORT"),
    user=os.environ.get("DB_USER"),
    password=os.environ.get("DB_PASSWORD"),
    database=os.environ.get("DB_NAME"),
)


# Database and table names
table_name = "todos"


def setup_db(connection, table_name):
    # Create the todos table if it doesn't exist
    create_table_query = f"""
        CREATE TABLE IF NOT EXISTS {table_name} (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            completed BOOLEAN NOT NULL
        );
    """
    cursor = connection.cursor()
    cursor.execute(create_table_query)
    connection.commit()
    cursor.close()

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM " + table_name)
    todos = cursor.fetchall()
    cursor.close()

    if len(todos) == 0:
        # list of rows to be inserted
        todos = [
            (1, "Sample Todo 1", False),
            (2, "Sample Todo 2", True),
            (3, "Sample Todo 3", False),
        ]

        # executing the sql statement
        cursor = connection.cursor()
        cursor.executemany(f"INSERT INTO {table_name} VALUES(%s,%s,%s)", todos)
        connection.commit()
        cursor.close()


setup_db(connection, table_name)


# Routes
@app.route("/todos", methods=["GET"])
def get_todos():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM " + table_name)
    todos = cursor.fetchall()
    cursor.close()
    return jsonify(
        [
            {"id": todo[0], "title": todo[1], "completed": bool(todo[2])}
            for todo in todos
        ]
    )


@app.route("/todos", methods=["POST"])
def add_todo():
    todo = request.get_json()
    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO "
        + table_name
        + " (id, title, completed) VALUES (%s, %s, %s)",
        (todo["id"], todo["title"], todo["completed"]),
    )
    connection.commit()
    cursor.close()
    return jsonify({"message": "Todo added successfully"})


@app.route("/todos/<id>", methods=["PUT"])
def update_todo(id):
    todo = request.get_json()
    cursor = connection.cursor()
    cursor.execute(
        f"UPDATE {table_name} SET completed = %s WHERE id = %s",
        (todo["completed"], id),
    )
    connection.commit()
    cursor.close()
    return jsonify({"message": "Todo updated successfully"})


@app.route("/todos/<id>", methods=["DELETE"])
def delete_todo(id):
    cursor = connection.cursor()
    delete_query = f"DELETE FROM {table_name} WHERE id = %s"
    cursor.execute(delete_query, (id,))
    connection.commit()
    cursor.close()
    return jsonify({"message": "Todo deleted successfully"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

