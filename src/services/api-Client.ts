import axios from "axios";

const apiClint = axios.create({
  baseURL: "https://api.makcorps.com",
});

export default apiClint;
