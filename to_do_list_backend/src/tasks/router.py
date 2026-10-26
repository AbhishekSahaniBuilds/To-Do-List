from fastapi import APIRouter

# modules
import src.tasks.controller as task_controller
import src.tasks.dto as task_dto

task_route = APIRouter(prefix="/tasks")


# Create a new task
@task_route.post("/create/{user_id}")
def create_task(user_id: str, body: task_dto.TaskSchema):
    return task_controller.create_task(user_id=user_id, body=body)


# Get all task
@task_route.get("/get/{user_id}")
def get_task(user_id: str):
    return task_controller.get_task(user_id=user_id)


# Delete a task
@task_route.delete("/delete/{user_id}")
def delete_task(user_id: str, body: task_dto.TaskDeleteSchema):
    return task_controller.delete_task(user_id=user_id, body=body)


# Complete a task
@task_route.put("/complete/{user_id}")
def complete_task(user_id: str, body: task_dto.TaskSchema):
    return task_controller.complete_task(user_id=user_id, body=body)
