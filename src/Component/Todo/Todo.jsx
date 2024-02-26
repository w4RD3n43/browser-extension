  import React, { useEffect, useState } from 'react'
  import { v4 as uuid } from 'uuid'

  const Todo = () => {

    const [todo, setTodo] = useState('')
    const [todolist, setTodolist] = useState([])

    useEffect(()=>{
      const userTodo = JSON.parse(localStorage.getItem('todolist'))
      userTodo && setTodolist(userTodo)
    },[])
    
    const handleTodoInputChange =(e) => {
      setTodo(e.target.value)
    }

    const handleCheckbox = (todoId) => {
      const updateTodoList = todolist.map(todo => todoId === todo._id ? {...todo , isCompleted: !todo.isCompleted} : todo)
      setTodolist(updateTodoList)
      localStorage.setItem('todolist', JSON.stringify(updateTodoList))
    }

    const handleDeletTodo = (todoId) => {
      const updateTodoList = todolist.filter(todo => todo._id !== todoId)
      setTodolist(updateTodoList)
      localStorage.setItem('todolist', JSON.stringify(updateTodoList))
    }

    const handleTodoEnterKey = (e) => {
      if (e.key === 'Enter' && e.target.value.length > 0){
        const updateTodoList = [...todolist, {_id: uuid(), todo, isCompleted: false}]
        setTodolist(updateTodoList)
        setTodo('')
        localStorage.setItem('todolist', JSON.stringify(updateTodoList))
      }
    }

    
    return (
      <div >
        <div className='bg-black bg-opacity-70  overflow-auto h-64'>
          {
            todolist && todolist.map(({todo, _id, isCompleted}) => {
              return (
                <div key={_id} className='fredoka flex items-center border-b-2 '>
                  <label  className={`${isCompleted ? ' line-through': '' }`}>
                    <input type='checkbox' checked={isCompleted} className='m-2' onChange={()=>handleCheckbox(_id)}/>
                      {todo} 
                  </label>
                  <button className='absolute bottom-1 right-1' onClick={()=>handleDeletTodo(_id)}>
                    x
                  </button>
                </div>
              )
            })
          }
        </div>
        <div>
          <input value={todo} type='text' onChange={handleTodoInputChange} onKeyDown={handleTodoEnterKey} className='text-center fredoka bg-transparent border-b-2 text-xl w-auto  text-white  focus:outline-none'/>
        </div>
      </div>
    )
  }

  export default Todo
