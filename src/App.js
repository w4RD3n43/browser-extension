
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [quotes,setQuotes] = useState(null)
  const url = 'https://api.api-ninjas.com/v1/quotes?category=success'
  const key = 'qRWBZNZuBlc7bpeuQqsOaFwj9dMsZ8eFYzz7ZXLA'

  useEffect(()=>{
    fetch(url, {
      headers:{
        'X-api-key': `${key}`
      }
    })
    .then(response=> response.json())
    .then(data => {
      setQuotes(data[0])
    } )
    .catch(error => console.log(error))
  },[])



  return (
    <div className="App">
      <h1>
        {
          quotes.quote
        }
      </h1>
      <h1>
        hello
      </h1>
    </div>
  );
}

export default App;
