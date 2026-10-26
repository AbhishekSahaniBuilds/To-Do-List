from bson import ObjectId
import src.users.dto as user_dto
import src.utils.database.crud_user as crud_user
from fastapi import HTTPException, status


def get_user_with_id(user_id: str):
    # 1. Fetch from CRUD layer
    user = crud_user.get_user_with_id(user_id=user_id)

    # 2. Check if user exists
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    # 3. Convert ObjectId to string for Pydantic/FastAPI serialization
    user_id_str = str(user["_id"])
    user["_id"] = user_id_str

    return {
        "status": "Succeed",
        "message": "User fetched successfully...",
        "user": user,
        "id": user_id_str,
    }


# Get a user
def get_user(body: user_dto.UserInfoSchema):
    user_info = body.model_dump()
    try:
        user = crud_user.get_user(user_info=user_info)
    except Exception as e:
        return {"status": "Failed", "message": f"Something went wrong: {e}"}
    else:
        return {
            "status": "Succeed",
            "message": "User get successfully...",
            "user": user,
            "id": user["_id"],
        }


# Create a new user
def create_user(body: user_dto.UserSchema):
    user_info = body.model_dump()
    try:
        user = crud_user.create_user(user_info=user_info)
    except Exception as e:
        return {"status": "Failed", "message": f"Something went wrong: {e}"}
    else:
        return {
            "status": "Succeed",
            "message": "User created successfully...",
            "user": user,
            "id": user["_id"],
        }


# Delete user
def delete_user(body: user_dto.UserInfoSchema):
    user_info = body.model_dump()
    try:
        user = crud_user.delete_user(user_info=user_info)
    except Exception as e:
        return {"status": "Failed", "message": f"Something went wrong: {e}"}
    else:
        return {
            "status": "Succeed",
            "message": "User deleted successfully...",
            "user": user,
        }


# Succeed
