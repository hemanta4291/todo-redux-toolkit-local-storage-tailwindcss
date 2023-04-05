import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/todos?page=1&_limit=5",
});

export default axiosInstance;
