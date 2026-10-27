<<<<<<< HEAD
const base_url = "https://to-do-list-8mi5.onrender.com";
=======
import { base_url } from "../config.js";
>>>>>>> 4e9cc084a7042430776a409fcd0b63611043dbb5

export async function root() {
  try {
    const response = await fetch(base_url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return { api_status: "Succeed", response: data };
  } catch (error) {
    return { api_status: "Failed", error: error };
  }
}
