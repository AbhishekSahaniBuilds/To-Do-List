// imports
import { get_user } from "../user.js";

// elements / global states
const form_username = document.querySelector("#username_input");
const form_password = document.querySelector("#password_input");

// form errors
const username_error = document.querySelector("#username_error");
const password_error = document.querySelector("#password_error");
const form_submit = document.querySelector("#submit_button");
const register_form = document.querySelector(".login");

// user details state
let username = null;
let password = null;

async function handleFormSubmit(event) {
  event.preventDefault();

  // Reset errors to none
  username_error.innerText = "";
  password_error.innerText = "";

  let isFormValid = true;
  const usernameValue = form_username.value.trim();
  const passwordValue = form_password.value;
  const alphanumericRegex = /^[a-zA-Z0-9_]+$/;

  // Username validation
  if (usernameValue.length < 3) {
    username_error.innerText = "Username must be at least 3 characters!";
    isFormValid = false;
  } else if (!alphanumericRegex.test(usernameValue)) {
    username_error.innerText = "Username can only contain letters and numbers.";
    isFormValid = false;
  }

  // Password validation
  if (passwordValue.length < 6) {
    password_error.innerText = "Password must be at least 6 characters!";
    isFormValid = false;
  }

  if (!isFormValid) return;

  try {
    username = usernameValue;
    password = passwordValue;
    const result = await get_user(username, password);

    if (result) {
      form_username.value = "";
      form_password.value = "";
      let user_id = result["id"];
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("user_logged_in", true);
      window.location.href = "../../index.html";
    }
  } catch (error) {
    console.error("Registration failed: ", error);
  }
}

register_form.addEventListener("submit", handleFormSubmit);
