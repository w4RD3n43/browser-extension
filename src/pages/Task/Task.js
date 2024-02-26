import {quotes } from '../../db/Quotes'
import React, {  useEffect, useState } from 'react'
import { useBrowser } from '../../context/Appcontext'
import Todo from '../../Component/Todo/Todo'

const quotesIndex = Math.floor(Math.random() * quotes.length)
const quote = quotes[quotesIndex].quote


const Task = () => {

  const [isChecked, setisChecked] = useState(false)
  const [TodoOpen, setTodoOpen] = useState(false)

  const {message, name, time, task, browserDispatch } = useBrowser()

  useEffect(()=>{
    const userTask = localStorage.getItem("TASK")
    browserDispatch({
      type: "TASK",
      payload: userTask
    })
    if(new Date().getDate() !== Number(localStorage.getItem('data'))){
      localStorage.removeItem("TASK")
      localStorage.removeItem("data")
      localStorage.removeItem("checkedStatus")
    }
  },[])

  useEffect(()=>{
    const checked = localStorage.getItem("checkedStatus")
    checked === "true" ? setisChecked(true) : setisChecked(false)
  },[])

  useEffect(()=>{
    getCurrentTime()
  },[time])
  
  const getCurrentTime = () => {
    const today = new Date()
    const hours = today.getHours()
    const minutes = today.getMinutes()
    
    const hour = hours < 10 ? `0${hours}` : hours
    const minute = minutes < 10? `0${minutes}` : minutes

    const currentTime = `${hours}:${minute}`
    setTimeout(getCurrentTime, 1000 );

    browserDispatch({
      type: "TIME",
      payload: currentTime 
    })
    browserDispatch({
      type: "MESSAGE",
      payload: hours
    })
  }

  const handleTask = (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      browserDispatch({
        type: "TASK",
        payload: e.target.value
      })
      localStorage.setItem("TASK", e.target.value)
      localStorage.setItem("data", new Date().getDate())
    } else if (e.key === "Enter" && e.target.value.length === 0) {
      alert("Enter Task")
    }
  }

  const handleClearClick = () => {
    browserDispatch({
      type: "clear"
    })
    localStorage.removeItem("TASK")
    localStorage.removeItem("checkedStatus")
  }

  const handleTaskChange = (e) => {
    if (e.target.checked){
      setisChecked(isChecked => !isChecked)
    } else {
      setisChecked(isChecked => !isChecked)
    } 
    localStorage.setItem("checkedStatus", !isChecked)
  }

  const handleToDoClick = (e) => {
    e.preventDefault()
    setTodoOpen(TodoOpen => !TodoOpen)
  }


  return (  
    <div>
      <div className='Container text-white flex flex-col justify-center  w-screen h-screen relative p-4'>
        <div className='flex flex-col items-center max-w-screen-lg mx-auto bg-black bg-opacity-70 rounded-lg p-4 '>
          <span className='fredoka text-4xl md:text-6xl font-sans m-4 '>
            {time}
          </span>
          <div className='w-1/4 h-1 bg-white rounded-full'></div>
          <span className='fredoka text-4xl md:text-6xl font-sans m-4 ' >
            {message}, {name}
          </span>
          { name !== null && task === null ? (
            <div className='flex flex-col justify-center items-center m-2'>
                <span className='fredoka  text-2xl'>
                  What is your main goal today ?
                </span>
                <form onSubmit={(e)=> e.preventDefault() }>
                  <input required type='text' className='text-center fredoka bg-transparent border-b-2 text-xl w-auto  text-white  focus:outline-none'
                    onKeyDown={handleTask}
                  />
                </form>
            </div>
          ) : (
            <div className=' flex flex-col justify-center items-center rounded-2xl m-2  '>
              <h1 className='fredoka text-4xl mb-3'>
                Today's Focus 
              </h1>
              <div className='flex flex-col justify-center items-center bg-black bg-opacity-90 rounded-2xl'>
                <div>
                  <label  className={` ${isChecked ? 'line-through ' : ' underline '} fredoka text-2xl hover:cursor-pointer`}>
                    <input  type='checkbox' className='m-2 hover:cursor-pointer' checked={isChecked} onChange={handleTaskChange} />
                      {task}
                  </label>
                    <button className='fredoka text-sm m-5 border-2 border-white p-1 rounded-2xl' onClick={handleClearClick}>
                      Clear
                    </button>
                </div>
              </div>
            </div>
          ) }
        </div>
        <div className=' absolute bottom-5 right-1 w-screen flex  justify-center  text-white '>
          <div className='bg-black bg-opacity-50 p-2 rounded-lg'>
            <p className='fredoka text-xl'>
              {quote}
            </p>
          </div>
          <div className='absolute bottom-16 right-8 ' >
          { TodoOpen && <Todo/> }
            <div>
              <button class="fredoka m-2 hover:bg-black hover:text-white font-bold py-2 px-4 border-b-2  hover:border-black rounded-full" 
              onClick={handleToDoClick}
              >
                    ToDo
              </button>
          </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Task
