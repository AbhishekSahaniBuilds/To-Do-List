const base_url = "https://to-do-list-8mi5.onrender.com/";

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
