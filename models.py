

from database import get_db


class Task:

    @staticmethod
    def get_all():
        conn = get_db()

        rows = conn.execute(
            "SELECT * FROM tasks ORDER BY id DESC"
        ).fetchall()

        conn.close()

        return [dict(row) for row in rows]

    @staticmethod
    def create(title, description):
        conn = get_db()

        cursor = conn.execute(
            """
            INSERT INTO tasks (title, description, status)
            VALUES (?, ?, ?)
            """,
            (title, description, "todo")
        )

        conn.commit()

        task_id = cursor.lastrowid

        row = conn.execute(
            "SELECT * FROM tasks WHERE id = ?",
            (task_id,)
        ).fetchone()

        conn.close()

        return dict(row)

    @staticmethod
    def update_status(task_id, status):
        conn = get_db()

        row = conn.execute(
            "SELECT * FROM tasks WHERE id = ?",
            (task_id,)
        ).fetchone()

        if row is None:
            conn.close()
            return None

        conn.execute(
            "UPDATE tasks SET status = ? WHERE id = ?",
            (status, task_id)
        )

        conn.commit()

        row = conn.execute(
            "SELECT * FROM tasks WHERE id = ?",
            (task_id,)
        ).fetchone()

        conn.close()

        return dict(row)

    @staticmethod
    def delete(task_id):
        conn = get_db()

        row = conn.execute(
            "SELECT id FROM tasks WHERE id = ?",
            (task_id,)
        ).fetchone()

        if row is None:
            conn.close()
            return False

        conn.execute(
            "DELETE FROM tasks WHERE id = ?",
            (task_id,)
        )

        conn.commit()
        conn.close()

        return True