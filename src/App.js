import React, { useEffect, useState } from 'react';
import Todos from './components/Todos';
import { createTodo, deleteTodo, editTodo, fetchTodos } from './features/todos/todoSlice';
import { useDispatch, useSelector } from 'react-redux';



function App() {
  const dispatch = useDispatch();
  // const [todos,setTodos] = useState([])
  const [title,setTitle] = useState('')
  const [titleEdit,setTitleEdit] = useState('')
  const [editId,setEditId] = useState()
  
    const { todos, isLoading, isError, error } = useSelector(
        (state) => state.todos
    );

  useEffect(()=>{
    dispatch(fetchTodos())
  },[])

  const handleDelete = (id) =>{
    dispatch(deleteTodo(id))
  }

  const handleEdit = (todo) =>{
    setEditId(todo.id)
    setTitleEdit(todo.title)
  }

  // create todo
  const handleSubmit = (e) => {
     e.preventDefault()

     if(!title){
      return false
     }
     dispatch(createTodo(title)) 
    setTitle('')
  }

  const editSubmit = (e)=>{
    if(e.keyCode === 13){
      dispatch(editTodo({id:editId,title:titleEdit}))
      setTitleEdit('')
      setEditId(null)
    }
    
  }

  const handleOnBlur = () => {
    dispatch(editTodo({id:editId,title:titleEdit}))
    setTitleEdit('')
    setEditId(null)
  }
  
  return (
    <div className="App">
      <div className='container w-2/4 mx-auto flex justify-center items-center h-full mt-24'>

        <div className='w-full'>
          <h1 className='text-4xl text-center mb-10'>Todos</h1>

          <form onSubmit={handleSubmit} className='relative mb-10'>
            <input className='w-full border-solid border-2 rounded border-gray-300 p-2 pr-20' onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter Title'/>
            <button className='absolute right-0 top-0 bg-green-700 text-white p-2 h-full rounded ' type='submit'>Create</button>
          </form>

      {
        todos?.map((todo,i)=>(
          <div className='flex justify-between items-center gap-10'>
            <div className='flex flex-1 items-center gap-2'>
              <span>{todo.id} : </span>
              {
                editId !== todo.id && 
                 <h3 className='flex-1' key={todo.id}>{todo.title}
                </h3>
              }
            
            {editId === todo.id && 
            <input  className="flex-1 p-2" onBlur={handleOnBlur} autoFocus value={titleEdit} onChange={(e)=>setTitleEdit(e.target.value)} onKeyDown={editSubmit} placeholder='edit'/>
            }
            
            </div>
            <div className='flex gap-2 mb-4 '>
             <button className='bg-green-700 text-white p-2 h-full rounded ' onClick={()=>handleEdit(todo)}>Edit</button>
              <button className=' bg-red-600 text-white p-2 h-full rounded ' onClick={()=>handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        ))
      }
      </div>
      </div>
    </div>
  );
}

export default App;
