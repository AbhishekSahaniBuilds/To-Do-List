from bson import ObjectId
import src.tasks.dto as task_dto
import src.utils.database.crud_data as crud_data


# Create a new task
def create_task(user_id: ObjectId, body: task_dto.TasksSchema):
    data = body.model_dump()
    try:
        tasks = crud_data.insert_task(user_id=user_id, data=data)
    except Exception as e:
        return {"status": "Failed", "message": f"Something went wrong: {e}"}
    else:
        return {
            "status": "Succeed",
            "message": "Task created successfully...",
            "task": data,
            "task_count": len(tasks),
            "tasks": tasks,
        }


# Get all task
def get_task(user_id: ObjectId):
    try:
        tasks = crud_data.get_task(user_id=user_id)
    except Exception as e:
        return {"status": "Failed", "message": f"Something went wrong: {e}"}
    else:
        return {
            "status": "Succeed",
            "message": "Task get successfully...",
            "task_count": len(tasks),
            "tasks": tasks,
        }


# Delete a task
def delete_task(user_id: ObjectId, body: task_dto.TaskDeleteSchema):
    data = body.model_dump()
    try:
        tasks = crud_data.delete_task(user_id=user_id, data=data)
    except Exception as e:
        return {"status": "Failed", "message": f"Something went wrong: {e}"}
    else:
        return {
            "status": "Succeed",
            "message": "Task deleted successfully...",
            "task_count": len(tasks),
            "task": data,
            "tasks": tasks,
        }


# Complete a task
def complete_task(user_id: ObjectId, body: task_dto.TaskSchema):
    data = body.model_dump()
    try:
        crud_data.complete_task(user_id=user_id, data=data)
    except Exception as e:
        return {"status": "Failed", "message": f"Something went wrong: {e}"}
    else:
        return {
            "status": "Succeed",
            "message": "Task completed successfully...",
        }
