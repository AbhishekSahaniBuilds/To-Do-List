//imports
import { server_get_user_with_id } from "../apis/user.js";
import { delete_user } from "./user.js";

//elements
const account_info = document.querySelector("#account_info");
const logout_button = document.querySelector("#logout_user");
const delete_account_button = document.querySelector("#delete_account");
const account_information_section = document.querySelector(
  ".account_information_section",
);
const username_holder = document.querySelector("#username_holder");

//global_state
const is_logged_in = localStorage.getItem("user_logged_in");

if (is_logged_in && is_logged_in !== "false" && is_logged_in !== "null") {
  account_info.innerText = "You are successfully logged in!";
  logout_button.style.display = "inline";
  delete_account_button.style.display = "inline";
  account_information_section.style.display = "block";

  let username;
  try {
    let get_response = (
      await server_get_user_with_id(localStorage.getItem("user_id"))
    )["response"];
    if (get_response["status"] === "Succeed") {
      username = get_response["user"]["username"];
      username_holder.innerText = username;
    }
  } catch {
    username_holder.innerText = "__%ERROR%__";
  }
} else {
  account_info.innerText = "Login or create an account!";
  logout_button.style.display = "none";
  delete_account_button.style.display = "none";
  account_information_section.style.display = "none";
}

//logout button logic
logout_button.addEventListener("click", () => {
  if (window.confirm("Do you really want to logout?")) {
    try {
      localStorage.setItem("user_logged_in", false);
      localStorage.setItem("user_id", null);
    } catch (error) {
      console.error(error);
    } finally {
      alert("You are successfully logged out!");
      window.location.reload();
    }
  }
});

delete_account_button.addEventListener("click", async (event) => {
  if (window.confirm("Do you really want to delete this account?")) {
    try {
      let user = (
        await server_get_user_with_id(localStorage.getItem("user_id"))
      )["response"]["user"];
      let username = user["username"];
      let password = user["password"];
      await delete_user(username, password);
      window.location.href = "../../index.html";
    } catch (error) {
      console.error(error);
    }
  }
});
