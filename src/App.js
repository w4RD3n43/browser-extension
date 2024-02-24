import { images } from './db/Images.js'
import Home from './pages/Home.js'
import Task from './pages/Task/Task.js'
import { useBrowser } from './context/Appcontext.js'
import { useEffect } from 'react'


const index = Math.floor(Math.random() * images.length)
const image = images[index].image

const App = () => {

  const {name, browserDispatch} = useBrowser()

  useEffect(()=>{
    const userName = localStorage.getItem('name')
    browserDispatch({
      type: "NAME",
      payload: userName
    })
  },[]) 
  
  return (
    <div className='w-screen h-screen bg-cover bg-center' style={ {'backgroundImage': `url(${image})`}}>
      {
        name ? <Task/> : <Home/>
      }
    </div>
  )
}

export default App
