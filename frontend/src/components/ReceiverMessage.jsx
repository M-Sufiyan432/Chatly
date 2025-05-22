import { useEffect } from "react"
import { useRef } from "react"
import { useSelector } from "react-redux"


const ReceiverMessage = ({image,message}) => {
   let {selectedUser} = useSelector(state=>state.user)
   let scroll = useRef()
    useEffect(()=>{
       scroll?.current.scrollIntoView({behavior:"smooth"})
    },[message,image])

    const handleOnScroll = ()=>{
       scroll?.current.scrollIntoView({behavior:"smooth"})
    }
  return (
       <div className="flex items-start gap-[20px]" >
         <div
           className="w-[40px] h-[40px] rounded-full  overflow-hidden flex justify-center items-center
            shadow-gray-500 shadow-lg cursor-pointer bg-white  " >
           <img src={selectedUser?.image || dp} alt="" className="  h-[100%]" />
         </div>
         <div ref={scroll}  className="w-fit max-w-[500px] px-[20px] py-[5px] bg-[#1711c2] text-white text-[19px] rounded-tl-none
       rounded-2xl relative left-0  shadow-gray-400 shadow-lg gap-[10px] flex flex-col  ">
           {image && <img src={image} className="w-[150px] rounded-lg " onLoad={handleOnScroll} />}
           {message && <span>{message}</span>}
         </div>
       </div>
  )
}

export default ReceiverMessage
