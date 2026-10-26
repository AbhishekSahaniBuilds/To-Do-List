const base_url = "http://127.0.0.1:8000";

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
