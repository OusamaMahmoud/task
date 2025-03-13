import axios from "axios";

export const API_KEY = "67d22971cba2cd5a20769d6c";

const apiClint = axios.create({
  baseURL: "https://api.makcorps.com",
});

export default apiClint;
