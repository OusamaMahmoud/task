import axios from "axios";

export const API_KEY =
  localStorage.getItem("apiKey") || "67d376eee2dcbf7e4ebe4d4c";

const apiClint = axios.create({
  baseURL: "https://api.makcorps.com",
});

export default apiClint;
