import React, { Fragment, useEffect } from 'react'
import { useBrowser } from '../../context/Appcontext'

const Task = () => {

  const {message,name, time, task,browserDispatch } = useBrowser()

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
      console.log(task)
    } else if (e.key === "Enter" && e.target.value.length === 0) {
      alert("Enter Task")
    }
    
    
  }


  return (  
    <div>
      <div className='Container text-white flex flex-col justify-center items-center w-screen h-screen relative'>
        <div className='flex flex-col items-center max-w-screen-lg mx-auto bg-black bg-opacity-60 rounded-lg  '>
          <span className='fredoka text-4xl md:text-6xl font-sans m-4 '>
            {time}
          </span>
          <div className='w-1/4 h-1 bg-white rounded-full'></div>
          <span className='fredoka text-4xl md:text-6xl font-sans m-4 ' >
            {message}, {name}
          </span>
        </div>
        <Fragment>
          <div className='flex flex-col items-center max-w-screen-lg mx-auto  ' >
            <span className='fredoka  text-2xl'>
              What is your main goal today ?
            </span>
            <input type='text' className='text-center fredoka bg-transparent border-b-2 text-xl w-auto  text-white focus:outline-none'
              onKeyDown={handleTask}
              />
          </div>
      </Fragment>
      </div>
    </div>
  )
}

export default Task
