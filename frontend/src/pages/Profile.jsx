import React, { useRef, useState } from 'react'
import axios from "axios"
import dp from "../assets/download.png"
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { TiArrowLeftThick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';


const Profile = () => {
  const inputStyle= `w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-400 text-[19px]`
  let {userData} = useSelector(state => state.user)
  let navigate = useNavigate();
  let [name,setName] = useState(userData?.name  || "")
  let [frontendImage,setFrontendImage] = useState(userData?.image || dp)
  let [backendImage , setBackendImage] = useState(null)
  let [saving,setSaving] = useState(false)
  let image = useRef()
  let dispatch = useDispatch()

  const handleImage = (e)=>{
     let file = e.target.files[0]
      setBackendImage(file)
     setFrontendImage(URL.createObjectURL(file))
  }

   const handleProfile= async(e)=>{
    e.preventDefault();
    setSaving(true)
    try {
      let formData = new FormData();
       formData.append("name",name)
      if(backendImage){
        formData.append("image",backendImage)
      }
    
      let result = await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
      setSaving(false)
      dispatch(userData(result.data))
      navigate("/")
    } catch (error) {
      setSaving(false)
      console.log(error);
      
    }
   }
   const handleSaving = ()=>{
    if(!saving){
      navigate("/")
    }
   }

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
      <div className='fixed top-[20px] left-[20px] cursor-pointer' onClick={()=>navigate("/")}>
      <TiArrowLeftThick className='w-[50px] h-[50px]' />
      </div>
      <div className=' bg-white rounded-full border-4 
      border-[#20c7ff] shadow-gray-400  shadow-lg  relative' onClick={()=>image.current.click()}>
      <div className='w-[200px] h-[200px] rounded-full  overflow-hidden flex justify-center items-center'>
        <img src={frontendImage} alt="" className='  h-[100%]'/>
      </div>
      <IoCameraOutline className='absolute bottom-8 text-gray-700 right-5 w-[28px] h-[28px] '/>
      </div>
      <form className='w-[95%]  max-w-[500px] flex flex-col gap-[20px]  items-center justify-center'
      onSubmit={handleProfile}>
        <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>
        <input type="text" placeholder='Enter Your Name' className={`${inputStyle}`} value={name} 
        onChange={(e)=>setName(e.target.value)}/>
        <input type="text" readOnly className={`${inputStyle}`} value={userData?.username}/> 
        <input type="email" readOnly className={`${inputStyle}`} value={userData?.email} />
        <button className=' px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg 
            text-[20] w-[200px] mt-[20px] font-semibold hover:shadow-inner' disabled={saving} onClick={handleSaving} >{saving?"Saving..":"Save Profile"} </button>
      </form>
    </div>
  )
}

export default Profile
