from bson import ObjectId
import src.utils.database.db as db
from fastapi import HTTPException


# Create a new task
def insert_task(user_id: ObjectId, data: dict):
    user = db.collection.find_one({"_id": ObjectId(user_id)})
    if user:
        orig_id = user["_id"]
        user["_id"] = str(user["_id"])

        tasks = user.get("tasks", [])
        if data in tasks:
            raise HTTPException(409, detail="Task already exists")
        tasks.append(data)

        db.collection.update_one({"_id": orig_id}, {"$set": {"tasks": tasks}})
        return tasks
    else:
        raise HTTPException(404, detail="User not found")


# Get all task
def get_task(user_id: ObjectId):
    user = db.collection.find_one({"_id": ObjectId(user_id)})
    if user:
        tasks = user.get("tasks", [])
        return tasks
    else:
        raise HTTPException(404, detail="User not found")


# Delete a task
def delete_task(user_id: ObjectId, data: dict):
    user = db.collection.find_one({"_id": ObjectId(user_id)})
    if user:
        orig_id = user["_id"]
        user["_id"] = str(user["_id"])
        tasks = user.get("tasks", [])

        for task in tasks:
            if task["title"] == data["title"]:
                tasks.remove(task)
                db.collection.update_one({"_id": orig_id}, {"$set": {"tasks": tasks}})
                return tasks
            else:
                continue
        raise HTTPException(404, detail="Task not found")
    else:
        raise HTTPException(404, detail="User not found")


# ==============
# Complete Task
# ==============


def complete_task(user_id: ObjectId, data: dict):
    user = db.collection.find_one({"_id": ObjectId(user_id)})
    if user:
        orig_id = user["_id"]
        user["_id"] = str(user["_id"])
        tasks = user.get("tasks", [])

        for task in tasks:
            if task["title"] == data["title"]:
                task["is_completed"] = True
                db.collection.update_one({"_id": orig_id}, {"$set": {"tasks": tasks}})
                return tasks
            else:
                continue
        raise HTTPException(404, detail="Task not found")
    else:
        raise HTTPException(404, detail="User not found")
