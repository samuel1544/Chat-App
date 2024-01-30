import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bon from './Pages/Bon'

function App() {
  return (
    <Router>
      
      <Routes>
          <Route path="/Signup" element={<Bon />} /> 
      </Routes>
    </Router>
  );
}

export default App;
