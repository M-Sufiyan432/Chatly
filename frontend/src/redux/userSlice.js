import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name : "user",
    initialState:{
        userData:null,
        otherUsers: null,
        selectedUser: null,
        socket : null,
        onlineUsers :null,
        searchData :null
    },
    reducers:{
        setUserData:(state,action)=>{
            console.log("User State",action.payload);
            
            state.userData=action.payload
        },
        setOtherUsers:(state,action)=>{
            console.log("Other User State",action.payload);
            state.otherUsers=action.payload
        },
        setSelectedUser:(state,action)=>{
            console.log("Selected State",action.payload);
            
            state.selectedUser=action.payload
        },
        setSocket:(state,action)=>{
            console.log("Socket State :", action.payload);
            state.socket=action.payload
        },
        setOnlineUsers:(state,action)=>{
            console.log("Online State :", action.payload);
            state.onlineUsers=action.payload
        },
        setSearchData:(state,action)=>{
            console.log("SearchData state :", action.payload);
            state.searchData=action.payload
        },
    }
})
export const {setUserData,setOtherUsers,setSelectedUser,setSocket,setOnlineUsers,setSearchData} = userSlice.actions;
export default userSlice.reducer