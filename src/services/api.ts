import axios from "axios";

// TODO: create reusable axios api instance which uses the BASE_URL from config.ts

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
