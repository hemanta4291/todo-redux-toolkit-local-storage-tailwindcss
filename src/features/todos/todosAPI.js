import axios from "axios";


export const getTodos = async () => {

    const response = await axios.get("https://jsonplaceholder.typicode.com/todos?page=1&_limit=5");

    return response.data;
};
