import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import PrivateRoute from './Components/PrivateRoute';
function App() {
 

  return (
    <>
      <Router>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/about' element={<About/>}/>
          <Route element={<PrivateRoute/>}>

          <Route path='/profile' element={<Profile/>} />
          </Route>
        </Routes>
      </Router>
    
    
    </>
  )
}

export default App
