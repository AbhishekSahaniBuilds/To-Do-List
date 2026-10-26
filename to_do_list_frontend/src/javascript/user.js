// imports/exports
import {
  server_create_user,
  server_delete_user,
  server_get_user,
} from "../apis/user.js";

// =========================================================
//     Helper: Handle API Response Validation & Errors
// =========================================================
const handleApiResponse = (response) => {
  if (response?.["api_status"] === "Failed") {
    alert("Something went wrong");
    return null;
  }

  if (response?.["response"]?.["status"] === "Failed") {
    alert(response["response"]["message"]);
    return null;
  }

  return response;
};

// =========================================================
//      Get, Create and Delete user
// =========================================================

// Get a user
export const get_user = async (username, password) => {
  try {
    const rawResponse = await server_get_user(username, password);
    const response = handleApiResponse(rawResponse);
    if (!response) return;

    return response["response"] || response;
  } catch (error) {
    console.error(error);
  }
};

// Create a new user
export const create_user = async (username, password) => {
  try {
    const rawResponse = await server_create_user(username, password);
    const response = handleApiResponse(rawResponse);
    if (!response) return;

    const new_user = response["response"]
      ? response["response"]["id"]
      : response["id"];

    return new_user;
  } catch (error) {
    console.error(error);
  }
};
// Delete a user
export const delete_user = async (username, password) => {
  try {
    const rawResponse = await server_delete_user(username, password);
    const response = handleApiResponse(rawResponse);
    if (!response) return;

    return response["response"] || response;
  } catch (error) {
    console.error(error);
  }
};
