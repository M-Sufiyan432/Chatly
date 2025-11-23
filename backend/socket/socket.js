import http from "http"
import expres from "express"
let app = expres()
import { Server } from "socket.io"

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"https://chatly-frontend-f470.onrender.com"
    }
})
 const userSocketMap = ()=>{}
 export const getReceiverSocketId = (receiver)=>{
     return userSocketMap[receiver]
 }

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId
    if(userId != undefined){
        console.log(userId,socket.id)
        userSocketMap[userId] = socket.id
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect",()=>{
    delete userSocketMap[userId]
     io.emit("getOnlineUsers",Object.keys(userSocketMap))
     
    })
})



export {app,server,io}