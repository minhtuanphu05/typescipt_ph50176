import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Detail from './pages/Detail'
import Register from './pages/Register'
import Login from './pages/Login'
import { useRoutes } from 'react-router-dom'

const conFig = [
  {path:"/fff",element:<Home/>},
  {path:"/fff/add",element:<Add/>},
  {path:"/fff/:id/update",element:<Edit/>},
  {path:"/fff/:id/detail",element:<Detail/>},
  {path:"/fff/register",element:<Register/>},
  {path:"/fff/login",element:<Login/>}
]
function App() {
  const routee = useRoutes(conFig)

  return (
    <>
    {routee}
    </>
  )
}

export default App
