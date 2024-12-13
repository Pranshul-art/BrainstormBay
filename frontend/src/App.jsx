import { useState } from 'react'
import './App.css'
import { Signup } from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './components/SignIn'
import { Dashboard } from './components/Dashboard'
import { RightBar } from './commonComponents/RightBar'
import PostIdeaPage from './commonComponents/Post'
import { InteractionsPage } from './components/IntractionPage'
import { MyAccountPage } from './commonComponents/MyAccount'
import { SecurityPage } from './commonComponents/SecurityPage'
import { AllProjectsPage } from './components/AllProject'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/temp' element={<RightBar/>}></Route>
          <Route path='/post' element={<PostIdeaPage/>}></Route>
          <Route path='/interactions' element={<InteractionsPage/>}></Route>
          <Route path='/account' element={<MyAccountPage/>}></Route>
          <Route path='/security' element={<SecurityPage/>}></Route>
          <Route path='/all-projects' element={<AllProjectsPage/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
