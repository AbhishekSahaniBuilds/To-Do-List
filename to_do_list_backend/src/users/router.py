from fastapi import APIRouter

import src.users.controller as user_controller
import src.users.dto as user_dto

user_route = APIRouter(prefix="/users")


@user_route.post("/getId/{user_id}")
def get_user_with_id(user_id: str):
    return user_controller.get_user_with_id(user_id=user_id)


# Get a user
@user_route.post("/get")
def get_user(body: user_dto.UserInfoSchema):
    return user_controller.get_user(body=body)


# Create a new user
@user_route.post("/create")
def create_user(body: user_dto.UserSchema):
    return user_controller.create_user(body=body)


# Delete a user
@user_route.delete("/delete")
def delete_user(body: user_dto.UserInfoSchema):
    return user_controller.delete_user(body=body)
