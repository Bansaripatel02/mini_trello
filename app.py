from flask import Flask, render_template, request, jsonify
from database import init_db
from models import Task

app = Flask(__name__)

init_db()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.get_all()
    return jsonify(tasks)


@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    title = data.get("title", "").strip()
    description = data.get("description", "").strip()

    if not title:
        return jsonify({"error": "Title is required"}), 400

    task = Task.create(title, description)

    return jsonify(task), 201


@app.route("/api/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()
    status = data.get("status")

    valid_statuses = ["todo", "in_progress", "done"]

    if status not in valid_statuses:
        return jsonify({"error": "Invalid status"}), 400

    task = Task.update_status(task_id, status)

    if task is None:
        return jsonify({"error": "Task not found"}), 404

    return jsonify(task)


@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    deleted = Task.delete(task_id)

    if not deleted:
        return jsonify({"error": "Task not found"}), 404

    return jsonify({"message": "Task deleted successfully"})


if __name__ == "__main__":
    app.run(debug=True)