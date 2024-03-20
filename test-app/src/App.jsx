import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sign from './signup/Sign'
import Login from './page/Login';
import Navbar from './page/Navbar';
import Slidebar from './page/slidebar';
import Drop from './page/Drop';
import Nav2 from './page/Nav2';
import Mails from './page/Mails';
import See from './page/See';

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    
    <Router>
      
      <Routes>
          <Route path="/Sign" element={<Sign />} /> 
          <Route path="/Login" element={<Login />} /> 
          <Route path="/Navbar" element={<Navbar />} /> 
          <Route path="/Slidebar" element={<Slidebar />} /> 
          <Route path="/Drop" element={<Drop />} /> 
          <Route path="/Nav2" element={<Nav2 />} /> 
          <Route path="/Div" element={<Mails />} /> 
          <Route path="/See" element={<See />} /> 
      </Routes>
    </Router>
  )
}

export default App
