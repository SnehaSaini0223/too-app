
//This is the way to connect Url with the text(routing)

import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreateTask from '../pages/CreateTask'
import Profile from '../pages/Profile'
import TaskList from '../pages/TaskList'
import About from '../pages/About'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Login from '../auth/Login'
import Register from '../auth/Register'
import { AuthProvider } from '../auth/AuthContext'
import ProtectedRoot from '../auth/ProtectedRoot'
import { TaskProvider } from '../context/TaskContext'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Navigate to="/login" />}></Route>
            <Route path='/' element={<Home />}>
              <Route path='login' element={<Login />}></Route>
              <Route path='register' element={<Register />}></Route>
            </Route>

            <Route path='/about' element={<About />}></Route>
            <Route path='/task-list' element={<ProtectedRoot><TaskList /></ProtectedRoot>}></Route>
            <Route path='/create-task' element={<ProtectedRoot><CreateTask /></ProtectedRoot>}></Route>
            <Route path='/profile' element={<ProtectedRoot><Profile /></ProtectedRoot>}></Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter >

  )
}

export default AppRouter