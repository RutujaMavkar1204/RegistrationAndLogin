import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import React from 'react';
import {Routes, Route} from 'react-router-dom'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<RegistrationForm/>}/>
      <Route path='/login' element={<LoginForm/>}/>
    </Routes>
      
    </>
  )
}

export default App
