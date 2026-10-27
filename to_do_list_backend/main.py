from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# modules
import src.utils.database.db as db
import src.tasks.router as task_router
import src.users.router as user_router


# ========================Lifespan==============================
@asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect_to_database()
    yield
    await db.disconnect_from_database()


# ================================================================


app = FastAPI(lifespan=lifespan)

# ========================CORS Configuration======================
origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "https://abhisheksahanibuilds.github.io",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ================================================================


# ========================Router==================================
@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "A simple To-Do list with memory",
        "language": "Python",
        "framework": "FastAPI",
    }


app.include_router(task_router.task_route)
app.include_router(user_router.user_route)

# ================================================================
if __name__ == "__main__":
    uvicorn.run(
        "main:app", host="127.0.0.1", port=8000, reload=True, reload_excludes=["env"]
    )
