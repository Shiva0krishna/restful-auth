import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from './components/register'
import Ai from './components/Ai'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/ai' element={<Ai/>}></Route>
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
