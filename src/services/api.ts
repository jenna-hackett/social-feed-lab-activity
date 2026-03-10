import axios from "axios";

const api = axios.create({
  baseURL: "http://api.aegisai.xyz",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// helper function to get error message from api responses
export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const messageFromServer = (err.response?.data as any)?.error;
    if (typeof messageFromServer === "string" && messageFromServer.trim()) {
      return messageFromServer;
    }
    if (err.response) return `request failed (${err.response.status})`;
    return "network error (check base url / server)";
  }
  return "something went wrong";
}
