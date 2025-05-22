import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../src/App";
import { setMessage } from "../src/redux/messageSlice";

const getMessage = () => {
  const dispatch = useDispatch();
  const { userData, selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, {
          withCredentials: true,
        });
       console.log("Fetched messages result.data (typeof):", typeof result.data, result.data);
        dispatch(setMessage(result.data)); // Load new messages
      } catch (error) {
        console.log("Error fetching messages:", error.response?.data || error.message);
      }
    };

    if (selectedUser && userData) {
      fetchMessages();
    }
  }, [selectedUser, userData, dispatch]); // include dispatch in deps
};

export default getMessage;
