//=================task module==========================

import { base_url } from "../config.js";
const task_router = base_url + "/tasks";

//Get all Tasks
export async function server_get_task(user_id) {
  try {
    const response = await fetch(`${task_router}/get/${user_id}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return { api_status: "Succeed", response: data };
  } catch (error) {
    return { api_status: "Failed", error: error };
  }
}

//Create new task
export async function server_create_task(user_id, title, is_completed) {
  try {
    const response = await fetch(`${task_router}/create/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_completed: is_completed,
      }),
    });

    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return { api_status: "Succeed", response: data };
  } catch (error) {
    return { api_status: "Failed", error: error };
  }
}
//Delete a Task
export async function server_delete_task(user_id, title) {
  try {
    const response = await fetch(`${task_router}/delete/${user_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return { api_status: "Succeed", response: data };
  } catch (error) {
    return { api_status: "Failed", error: error };
  }
}

// Complete a task
export async function server_complete_task(user_id, title) {
  try {
    const response = await fetch(`${task_router}/complete/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    const data = await response.json();
    return { api_status: "Succeed", response: data };
  } catch (error) {
    return { api_status: "Failed", error: error };
  }
}
