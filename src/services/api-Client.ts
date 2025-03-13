import axios from "axios";

// export const API_KEY = "67d22971cba2cd5a20769d6c"; shato946
//export const API_KEY = "67d204bd266d6d5a34ea0bf2"; ousama.mah113
//export const API_KEY = "67d345193ea4ed7e22adaeef"; // fake
export const API_KEY = "67d338743ea4ed7e22adaeee"; // tasneem.mah113

const apiClint = axios.create({
  baseURL: "https://api.makcorps.com",
});

export default apiClint;
