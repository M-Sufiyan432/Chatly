import React from 'react'
import SideBar from '../components/SideBar.jsx'
import MessageArea from '../components/MessageArea.jsx'
import getMessage from '../../customHooks/getCurrentMessages.jsx'
import { useSelector } from 'react-redux'

const Home = () => {
  let {selectedUser} = useSelector(state =>state.user)
  getMessage()
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
      <SideBar/>
      <MessageArea/>
    </div>
  )
}

export default Home
