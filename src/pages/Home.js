import React from 'react'
import { useBrowser } from '../context/Appcontext'


const Home = () => {

  const { browserDispatch} = useBrowser()

  const changeHandler =(e)=>{
    if (e.key === 'Enter' && e.target.value.length > 0){
      browserDispatch({
        type: "NAME",
        payload: e.target.value
      })
    }
    localStorage.setItem('name', e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
      <div className='Container text-white flex flex-row justify-center items-center w-screen h-screen relative'>
        <div className='flex flex-col items-center max-w-screen-lg mx-auto bg-black bg-opacity-60 rounded-lg p-5 '>
          <span className='fredoka text-4xl md:text-6xl font-sans m-4 ' >
              Hello, What's Your Name 
          </span>
          <form onSubmit={submitHandler} >
            <input type='text' 
            className="text-center fredoka bg-transparent border-b-2 text-2xl md:text-3xl text-white focus:outline-none"
            onKeyDown={changeHandler}
            />
          </form>
          </div>
        </div>
  )
}

export default Home
