import React, {useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/data')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => {
        console.error('There was an error fetching data:', error);
      });
  }, []);
  

  return (
    <div className="App">
      <h1>React and Flask API Integration</h1>
      <p>{message}</p>
    </div>
  );
}


export default App
