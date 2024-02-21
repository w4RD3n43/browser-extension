import React from 'react'
import { useBrowser } from '../../context/Appcontext'

const Task = () => {

  const {name} = useBrowser()

  return (
    <div className='Container text-white flex flex-row justify-center items-center w-screen h-screen relative'>
        <div className='flex flex-col items-center max-w-screen-lg mx-auto bg-black bg-opacity-60 rounded-lg  '>
          <span className='fredoka text-4xl md:text-6xl font-sans m-4 ' >
              Hello, {name}
          </span>
          </div>
        </div>
  )
}

export default Task
