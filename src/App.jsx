import './App.css'
import Browse from './components/Browse'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {

  
  return (
    
    <Router>
      <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
   </div>
  </Router>
     
  )
}

export default App
