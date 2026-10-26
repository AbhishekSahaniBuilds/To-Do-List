from bson import ObjectId
from pydantic import BaseModel, Field, BeforeValidator
from typing_extensions import Annotated

PyObjectId = Annotated[
    str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)
]


class TaskSchema(BaseModel):
    title: str
    is_completed: bool = False


class TaskDeleteSchema(BaseModel):
    title: str
