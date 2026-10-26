from pydantic import BaseModel, Field, BeforeValidator


class UserSchema(BaseModel):
    username: str
    password: str
    tasks: list = []


class UserInfoSchema(BaseModel):
    username: str
    password: str


class UserIdSchema(BaseModel):
    user_id: str
