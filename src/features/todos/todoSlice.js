import { getTodos } from "./todosAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    todos: [],
};

// async thunk
export const fetchTodos = createAsyncThunk(
    "todo/fetchTodos",
    async () => {
        const todos = await getTodos();
        return todos;
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers:{
        createTodo:(state,action)=>{
            let uniqueId = +new Date().getTime().toString().slice(-4)
            state.todos.push({
                userId:1,
                id:uniqueId,
                title:action.payload,
                completed:false,
              })
            localStorage.setItem("todos", JSON.stringify(state.todos));
             
        },
        editTodo:(state,action)=>{
            console.log(action)
            state.todos.splice()
            state.todos = state.todos.map((todo)=>{
                if(todo.id === action.payload.id){
                    return {
                        ...todo,
                        title: action.payload.title
                    }
                }
                return todo
            })
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },
        deleteTodo:(state,action)=>{
            console.log(action)
            state.todos = state.todos.filter((todo)=>todo.id !== action.payload)
            localStorage.setItem("todos", JSON.stringify(state.todos));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                localStorage.setItem("todos", JSON.stringify(action.payload));
                state.todos = action.payload;
            })
           
    },
});

export const {createTodo,deleteTodo,editTodo} = todosSlice.actions;
export default todosSlice.reducer;
