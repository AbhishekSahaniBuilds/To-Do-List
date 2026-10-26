import pymongo
from src.utils.settings import settings

connection_string = settings.DB_CONNECTION

client = None
tasks_info_db = None
collection = None


async def connect_to_database():
    global client, tasks_info_db, collection
    try:
        client = pymongo.MongoClient(connection_string)
        tasks_info_db = client["tasks_info"]
        collection = tasks_info_db["task_list"]
        collection.create_index("username", unique=True)

    except Exception as e:
        print(f"Failed to connect to database: {e}")
        raise e
    else:
        print("Connected to MongoDB successfully!")


async def disconnect_from_database():
    global client
    if client:
        client.close()
        print("Disconnected from MongoDB.")
