import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

const token = localStorage.getItem('token');

export const axiosReq = axios.create();
export const axiosAuth = axios.create({
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
})
