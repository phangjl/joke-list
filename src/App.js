import './App.css'
import Jokes from './components/Jokes'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import './style.css';

function App() {
  const [name, setName] = useState('')

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={
          <Login username={name} setUserName={setName} />
        } />
        <Route path='/jokes' element={<Jokes username={name} />} />
      </Routes>
    </Router>
  );
}

export default App;
