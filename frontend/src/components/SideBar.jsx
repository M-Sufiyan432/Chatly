import React, { useEffect, useState } from "react";
import db from "../assets/download.png";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import {serverUrl} from "../App.jsx"
import axios from "axios"
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  let { userData,otherUsers ,selectedUser,onlineUsers,searchData} = useSelector((state) => state.user);
  let [ search ,setSearch ] = useState(false)
  let [input,setInput] = useState("")
  let dispatch = useDispatch()
  let navigate = useNavigate()

  const handleLogout = async()=>{
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
      dispatch(setUserData(null))
      dispatch(setOtherUsers(null))
      navigate("/login")
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleSearch = async()=>{
    try {
      let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, {
     withCredentials: true
     });
      dispatch(setSearchData(result.data))
      console.log("Axios",result.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    if(input){
    handleSearch()
    }
  },[input])

  return (
    <div className={`lg:w-[30%] w-full h-full bg-slate-200  overflow-hidden lg:block ${!selectedUser?"block":"hidden"}`}>
      <div
            className="w-[60px] h-[60px] rounded-full mt-[10px] overflow-hidden flex justify-center items-center
            shadow-gray-500  shadow-lg fixed bottom-[20px] text-gray-700 left-[10px] bg-[#20c7ff] cursor-pointer 
            " onClick={()=>handleLogout()} >
           <BiLogOutCircle className="w-[25px] h-[25px] " />
       </div>
      <div className="w-full h-[300px] bg-[#20c7ff] rounded-b-[30%]  shadow-gray-400 shadow-lg
        flex flex-col  justify-center px-[20px]"
      >
        <h1 className="text-white font-bold text-[25px]">Chatly</h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-bold text-[25px]">
            Hii , {userData?.name || "user"}
          </h1>
          <div
            className="w-[60px] h-[60px] rounded-full  overflow-hidden flex justify-center items-center
            shadow-gray-500 shadow-lg cursor-pointer bg-white " onClick={()=>navigate("/profile")}
          >
            <img src={userData?.image || db} alt="" className="  h-[100%]" />
          </div>
        </div>
        <div className="w-full flex items-center gap-[20px] overflow-y-auto py-[20px]">
            {!search && <div
            className="w-[60px] h-[60px] rounded-full mt-[10px] overflow-hidden flex justify-center items-center
            shadow-gray-500 bg-white shadow-lg" onClick={()=>setSearch(true)}>
            <IoIosSearch className="w-[25px] h-[25px]" />
          </div>}
          {search && 
          <form className="w-full h-[60px]  shadow-gray-500 bg-white shadow-lg flex items-center 
          gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] ">
            <IoIosSearch className="w-[25px] h-[25px]" />
            <input type="text" placeholder="search users ..."  className="w-full h-full text-[18px]
             p-[10px] outline-0 border-0 outline-none border-none" onChange={(e)=>setInput(e.target.value)} value={input}/>
            <RxCross2 className="w-[25px] h-[25px] cursor-pointer" onClick={()=>setSearch(false)}/>
              <div className="flex w-full h-[300px] overflow-y-auto flex-col gap-[10px]">
              {searchData?.map((user)=>{
               return <div>
               <div className="w-[95%] h-[60px] flex justify-start items-center gap-[20px] bg-white
          shadow-gray-500 shadow-lg rounded-full hover:bg-[#b2ccdf]" onClick={()=>dispatch(setSelectedUser(user))}>
           <div className="relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-[10px]">
            <div
            className="w-[60px] h-[60px] rounded-full  overflow-hidden flex justify-center items-center
            "  >
            <img src={user?.image || db} alt="" className="  h-[100%]" />
          </div>
         {onlineUsers?.includes(user._id)&&
          <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20]
          shadow-lg shadow-gray-500"></span>}
          </div>
          <h1 className="text-gray-800 font-semibold text-[20px]">{user.name || user.username}</h1>
          </div>
               </div>
              })}
              </div>
         </form>}
         
         { !search && otherUsers?.map((user)=>{
          if(onlineUsers.includes(user._id))
            return <div className="relative rounded-full shadow-gray-500 bg-white shadow-lg flex 
            justify-center items-center mt-[10px] cursor-pointer "  onClick={()=>dispatch(setSelectedUser(user))}>
            <div
            className="w-[60px] h-[60px] rounded-full  overflow-hidden flex justify-center items-center
            "  >
            <img src={user?.image || db} alt="" className="  h-[100%]" />
          </div>
          <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20]
          shadow-lg shadow-gray-500"></span>
          </div>
         })}
        </div>
      </div>

       <div className="w-full h-[60vh] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]">
         { otherUsers?.map((user)=>{
          return <div className="w-[95%] h-[60px] flex justify-start items-center gap-[20px] bg-white
          shadow-gray-500 shadow-lg rounded-full hover:bg-[#b2ccdf]" onClick={()=>dispatch(setSelectedUser(user))}>
           <div className="relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-[10px]">
            <div
            className="w-[60px] h-[60px] rounded-full  overflow-hidden flex justify-center items-center
            "  >
            <img src={user?.image || db} alt="" className="  h-[100%]" />
          </div>
         {onlineUsers?.includes(user._id)&&
          <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20]
          shadow-lg shadow-gray-500"></span>}
          </div>
          <h1 className="text-gray-800 font-semibold text-[20px]">{user.name || user.username}</h1>
          </div>
         })}
       </div>
    </div>
  );
};

export default SideBar;
