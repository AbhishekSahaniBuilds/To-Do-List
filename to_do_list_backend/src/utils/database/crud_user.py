from bson import ObjectId
import src.utils.database.db as db
from fastapi import HTTPException, status
from bson.errors import InvalidId


def clean_user_info(user_info: dict) -> dict:
    """Helper function to clean up the username consistently across all operations."""
    query = user_info.copy()
    if "username" in query and isinstance(query["username"], str):
        query["username"] = query["username"].strip().lower()
    return query


def get_user_with_id(user_id: str) -> dict | None:
    try:
        # Convert the string path parameter to a BSON ObjectId
        return db.collection.find_one({"_id": ObjectId(user_id)})
    except InvalidId:
        # Returns None if the string isn't a valid 24-character hex ObjectId
        return None


# Get a user
def get_user(user_info: dict) -> dict:
    cleaned_info = clean_user_info(user_info)

    user = db.collection.find_one(cleaned_info)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if "_id" in user:
        user["_id"] = str(user["_id"])

    return user


# Create a new user
def create_user(user_info: dict) -> dict:
    username = user_info.get("username", "")
    if isinstance(username, str):
        username = username.strip().lower()

    forbidden_letters = ["!", "@", "#", "$", "%", " ", "/", "*", "=", "+", "-", "?"]

    if not username:
        raise HTTPException(400, detail="Username cannot be empty")

    if any(letter in username for letter in forbidden_letters):
        raise HTTPException(
            400,
            detail=f"Username contains forbidden characters. Do not use: {' '.join(forbidden_letters)}",
        )

    user_info["username"] = username

    result = db.collection.update_one(
        {"username": username}, {"$setOnInsert": user_info}, upsert=True
    )

    if result.matched_count > 0:
        raise HTTPException(409, detail="User already exists")

    if result.upserted_id:
        user_info["_id"] = str(result.upserted_id)
    else:
        user_info["_id"] = str(user_info.get("_id"))

    return user_info


# Delete a user
def delete_user(user_info: dict):
    cleaned_info = clean_user_info(user_info)
    user = db.collection.find_one(cleaned_info)

    if user:
        db.collection.delete_one(cleaned_info)
        if "_id" in user:
            user["_id"] = str(user["_id"])
        return user
    else:
        raise HTTPException(404, detail="User not found")
