import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authservice from './apperite/auth'
import { login,logout } from './store/authSlice'
import {Header,Footer} from "./components/index"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setloading] = useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    authservice.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setloading(false))
  },[])

 return !loading ? (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
    <div className="w-full block">
     <Header/>
     <main>
     <Outlet/>
     </main>
     <Footer/>
    </div>
  </div>
 ) : null
}

export default App
