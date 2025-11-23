import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LogIn from './pages/LogIn'
import Signup from './pages/Signup'
import useGetCurrentUser from '../customHooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Home from './pages/Home'
import useOtherUsers from '../customHooks/getOtherUsers'
import {io} from "socket.io-client"
import { setOnlineUsers, setSocket } from './redux/userSlice'

export const serverUrl = "https://chatly-backend-20j2.onrender.com"

const App = () => {
   useGetCurrentUser()
   useOtherUsers()
   let {userData,socket,onlineUsers} = useSelector(state=>state.user);
   let dispatch = useDispatch()
   useEffect(()=>{
    if(userData){
      const socketio = io(`${serverUrl}`,{
      query:{
         userId :userData?._id
      }
    })
   dispatch(setSocket(socketio))

    socketio.on("getOnlineUsers",(users)=>{
    dispatch(setOnlineUsers(users))
    })
    return()=>socketio.close()
    
    }else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
    
   },[userData])
  return (
    <Routes>
      <Route path="/" element={userData?<Home/>:<Navigate to="/login" />} />
      <Route path="/login" element={!userData?<LogIn/>:<Navigate to="/" />} />
      <Route path="/signup" element={!userData?<Signup/>:<Navigate to="/profile" />} />
      <Route path="/profile" element={userData?<Profile/>:<Navigate to="/signup" />} />
    </Routes>
  )
}

export default App
