import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

export const axiosAuth = axios.create({
  withCredentials: true,
})

//to use for request towards api that do not need authentication header.
export const axiosReq = axios.create()