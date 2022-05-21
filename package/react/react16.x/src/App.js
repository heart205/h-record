import logo from './logo.svg'
import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setData(data + 1)
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [data])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
