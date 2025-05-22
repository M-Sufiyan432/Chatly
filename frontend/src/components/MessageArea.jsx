import React, { useRef, useState } from 'react'
import { TiArrowLeftThick } from "react-icons/ti";
import db from "../assets/download.png";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import axios from 'axios';
import { serverUrl } from '../App';
import { setMessage } from '../redux/messageSlice';
import { useEffect } from 'react';

const MessageArea = () => {
  let {selectedUser,userData,socket,searchData} = useSelector(state => state.user)
  let[input,setInput] = useState('')
  let [showPicker, setShowPicker] = useState(false)
  let [frontendImage,setFrontendImage]= useState(null)
  let [backendImage,setBackendImage] = useState(null)
  let dispatch = useDispatch()
  let image = useRef()
  let {messages} = useSelector(state=>state.message)

const handleSendMessage = async (e)=>{
  e.preventDefault()
  if(input.length ==0 && backendImage == null){
    return null
  }
  try {
    let formData = new FormData()
    formData.append("message",input)
    if(backendImage){
      formData.append("image",backendImage)
    }
    let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,{
      withCredentials:true
    })
  
    dispatch(setMessage([...messages,result.data]))
    setInput("")
    setFrontendImage(null)
    setBackendImage(null)
    
  } catch (error) {
    console.log(error);
  }
}
  const handleImage = (e)=>{
      let file = e.target.files[0]
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
  }


  const onEmojiClick = (emojiData)=>{
      setInput(prevInput => prevInput+emojiData.emoji)
      setShowPicker(false)
  }
  useEffect(()=>{
    socket.on("newMessage",(mess)=>{
      dispatch(setMessage([...messages,mess]))
    })
    return ()=>socket.off("newMessage")
  },[messages,setMessage])

  return (
    
    <div className={`lg:w-[70%] ${selectedUser?"flex":"hidden"} hidden relative lg:flex w-full h-full bg-slate-200 border-1-2 border-gray-300`}>
   {selectedUser &&
    <div className='w-full h-[100vh] flex-col flex'>
    <div className='w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg flex
    items-center px-[20px] gap-[20px]'>
    <div className=" cursor-pointer" onClick={()=>dispatch(setSelectedUser(null))}>
    <TiArrowLeftThick className='w-[30px] h-[30px] text-white'  />
    </div>
    <div
     className="w-[50px] h-[50px] rounded-full  overflow-hidden flex justify-center items-center
     shadow-gray-500 shadow-lg cursor-pointer bg-white "
     ><img src={selectedUser?.image ||db} alt="" className="  h-[100%]" />
    </div>
    <h1 className="text-white font-semibold text-[20px]">{selectedUser?.name || 'user'}</h1>
    </div>
    <div className='w-full h-[78vh] flex flex-col py-[50px] px-[20px] overflow-auto gap-[20px]'>
    {showPicker && <div className='absolute bottom-[120px] left-[20px] '>
       <EmojiPicker width={250} height={350} className='shodow-lg z-[100]' onEmojiClick={onEmojiClick} /> </div>}
     {messages?.map((mess) => {
  return mess.sender === userData._id 
    ? <SenderMessage key={mess._id} image={mess.image} message={mess.message} />
    : <ReceiverMessage key={mess._id} image={mess.image} message={mess.message} />
})}
    </div>
    </div>
    }
     {!selectedUser && 
     <div className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className="text-gray-700 font-bold text-[50px]">Welcome To Chatly</h1>
      <span className="text-gray-700 font-semibold text-[30px]">Chat Freindly</span>
     </div> }
     {selectedUser && <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center'>
      <img src={frontendImage} className='w-[88px] absolute bottom-[100px] right-[20%] rounded-lg
      shadow-gray-400 shadow-lg' />
     <form className='w-[95%] lg:w-[70%] h-[60px] bg-[#1797c2] shadow-gray-400 rounded-full shadow-lg
     flex items-center gap-[20px] px-[20px] ' onSubmit={handleSendMessage}>
      <div>
      <RiEmojiStickerLine onClick={()=>setShowPicker(prev=>!prev)} className='w-[25px] h-[25px] text-white cursor-pointer' />
      </div>
      <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />
      <input type="text" className='w-full h-full px-[10px] outline-none border-0 text-[19px] text-white
      bg-transparent placeholder:text-white' placeholder='Message' value={input} onChange={(e)=>setInput(e.target.value)}/>
      <div onClick={()=>image.current.click()}>
       <FaImages className='w-[25px] h-[25px] text-white cursor-pointer'/>
      </div>
      {(input.length > 0 || backendImage !=null) &&
      (<button>
      <MdSend className='w-[25px] h-[25px] text-white cursor-pointer'/>
      </button>)
      }
     </form>
     </div> }
     
    </div>
  )
}

export default MessageArea
