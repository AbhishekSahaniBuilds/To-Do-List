//====imports====================================
//=====apis=========
//root api
import { root } from "../apis/root.js";
//task apis
import {
  server_get_task,
  server_create_task,
  server_delete_task,
  server_complete_task,
} from "../apis/task.js";

// Global State & Elements
let user_logged_in = localStorage.getItem("user_logged_in") === "true";
let user = localStorage.getItem("user_id");
let deleting_task_mode = false;

//================================================
const task_list = document.querySelector(".task_list");
const task_feild = document.querySelector("#task_feild");
const add_task = document.querySelector("#add_task");
const delete_tasks = document.querySelector("#delete_tasks");

//==================================
// Setup
//==================================
const setup = async () => {
  //Introduction
  const introduction = async () => {
    let response = await root();
    if (response["api_status"] === "Succeed") {
      console.log(response["response"]);
      console.log(`user_logged_in: ${user_logged_in}`);
    }
  };

  // login user
  const startup_login_user = async () => {
    if (user_logged_in) {
      try {
        user = localStorage.getItem("user_id");
        if (!user) {
          user_logged_in = false;
        }
      } catch (error) {
        user_logged_in = false;
      }
    }
    localStorage.setItem("user_logged_in", user_logged_in);
    localStorage.setItem("user_id", user || "");
  };

  // Load all user existing task from database
  const load_tasks = async () => {
    if (user_logged_in) {
      let response = await server_get_task(user);

      if (
        response["api_status"] === "Succeed" &&
        response["response"]["status"] === "Succeed"
      ) {
        let existing_tasks = response["response"]["tasks"];
        for (const existing_task of existing_tasks) {
          await create_task(
            existing_task["title"],
            existing_task["is_completed"],
            true,
          );
        }
      } else {
        user_logged_in = false;
        localStorage.removeItem("user_logged_in");
        localStorage.removeItem("user_id");

        alert(
          "Session expired or account no longer exists. Create new account to save your tasks.",
        );
        window.location.reload();
        return;
      }
    }
  };

  try {
    //await introduction();
    await startup_login_user();
    await load_tasks();
  } catch (error) {
    user_logged_in = false;
    console.error(`Something went wrong: ${error}`);
  }
};

setup();

//===================================
// CRUD Operations
//===================================
const create_task = async (
  title,
  is_completed = false,
  is_initial_load = false,
) => {
  try {
    for (const task of task_list.children) {
      if (
        task.innerText === title &&
        (task.classList.contains("tasks") ||
          task.classList.contains("completed_tasks"))
      ) {
        alert("Task already exists!");
        return;
      }
    }

    const new_task = document.createElement("button");
    new_task.innerText = title;

    if (is_completed) {
      new_task.classList.add("completed_tasks");
    } else {
      new_task.classList.add("tasks");
    }

    new_task.addEventListener("click", () => on_click(new_task));

    if (user_logged_in && !is_initial_load) {
      let api_response = await server_create_task(user, title, is_completed);
      if (
        api_response["api_status"] === "Succeed" &&
        api_response["response"]["status"] === "Succeed"
      ) {
        task_list.appendChild(new_task);
      } else {
        if (api_response["api_status"] === "Failed") {
          console.error(api_response);
        } else if (api_response["response"]["status"] === "Failed") {
          console.error(api_response["response"]["message"]);
        }
      }
    } else {
      task_list.appendChild(new_task);
    }
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  }
};

const on_click = (task) => {
  if (deleting_task_mode === false) {
    if (task.classList.contains("tasks")) {
      complete_task(task);
    } else if (task.classList.contains("completed_tasks")) {
      delete_task(task);
    }
  } else {
    delete_task(task);
  }
};

const complete_task = async (task) => {
  try {
    if (user_logged_in) {
      let title = task.innerText;
      let api_response = await server_complete_task(user, title);
      if (
        api_response["api_status"] === "Succeed" &&
        api_response["response"]["status"] === "Succeed"
      ) {
        task.classList.replace("tasks", "completed_tasks");
      } else {
        if (api_response["api_status"] === "Failed") {
          console.error(api_response);
        } else if (api_response["response"]["status"] === "Failed") {
          console.error(api_response["response"]["message"]);
        }
      }
    } else {
      task.classList.replace("tasks", "completed_tasks");
    }
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  }
};

const delete_task = async (task) => {
  try {
    if (user_logged_in) {
      let title = task.innerText;
      let api_response = await server_delete_task(user, title);
      if (
        api_response["api_status"] === "Succeed" &&
        api_response["response"]["status"] === "Succeed"
      ) {
        task.remove();
      } else {
        if (api_response["api_status"] === "Failed") {
          console.error(api_response);
        } else if (api_response["response"]["status"] === "Failed") {
          console.error(api_response["response"]["message"]);
        }
      }
    } else {
      task.remove();
    }
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  }
};

//====================================================
// Event Listeners
//====================================================
// Click to add task
add_task.addEventListener("click", () => {
  const task_info = task_feild.value;
  if (task_info.trim() !== "") {
    create_task(task_info);
    task_feild.value = "";
  }
});

// Enter key to add task
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && document.activeElement === task_feild) {
    const task_info = task_feild.value;
    if (task_info.trim() !== "") {
      create_task(task_info);
      task_feild.value = "";
    }
  }
});

// Delete mode toggle switch
delete_tasks.addEventListener("click", () => {
  deleting_task_mode = !deleting_task_mode;
  if (delete_tasks.firstElementChild) {
    delete_tasks.firstElementChild.classList.toggle("is_active");
  }
});
