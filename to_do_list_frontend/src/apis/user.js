// =========================================================
//     User Module API Client
// =========================================================

<<<<<<< HEAD
const base_url = "https://to-do-list-8mi5.onrender.com";
=======
import { base_url } from "../config.js";
>>>>>>> 4e9cc084a7042430776a409fcd0b63611043dbb5
const user_router = base_url + "/users";

/**
 * Generic helper to handle fetch requests, error parsing, and status mapping.
 */
async function sendUserRequest(endpoint, method, username, password) {
  try {
    const response = await fetch(`${user_router}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      try {
        const error_data = await response.json();
        return { api_status: "Failed", response: error_data };
      } catch {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }
    }

    const data = await response.json();
    return { api_status: "Succeed", response: data };
  } catch (error) {
    return { api_status: "Failed", error: error.message || error };
  }
}

export async function server_get_user_with_id(user_id) {
  try {
    const response = await fetch(`${user_router}/getId/${user_id}`, {
      method: "POST",
    });

    if (!response.ok) {
      try {
        const error_data = await response.json();
        return { api_status: "Failed", response: error_data };
      } catch {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }
    }

    const data = await response.json();
    return { api_status: "Succeed", response: data };
  } catch (error) {
    return { api_status: "Failed", error: error.message || error };
  }
}

// Get a user
export async function server_get_user(username, password) {
  return sendUserRequest("get", "POST", username, password);
}

// Create new user
export async function server_create_user(username, password) {
  return sendUserRequest("create", "POST", username, password);
}

// Delete a user
export async function server_delete_user(username, password) {
  return sendUserRequest("delete", "DELETE", username, password);
}
