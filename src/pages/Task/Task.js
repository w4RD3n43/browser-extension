import React, {  useEffect, useState } from 'react'
import { useBrowser } from '../../context/Appcontext'

const Task = () => {

  const [isChecked, setisChecked] = useState(false)

  const {message, name, time, task, browserDispatch } = useBrowser()

  useEffect(()=>{
    const userTask = localStorage.getItem("TASK")
    browserDispatch({
      type: "TASK",
      payload: userTask
    })
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
      localStorage.setItem("data", new Date())
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


  return (  
    <div>
      <div className='Container text-white flex flex-col justify-center  w-screen h-screen relative p-4'>
        <div className='flex flex-col items-center max-w-screen-lg mx-auto bg-black bg-opacity-60 rounded-lg p-4 '>
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
              <div className='flex flex-col justify-center items-center'>
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
      </div>
    </div>
  )
}

export default Task
