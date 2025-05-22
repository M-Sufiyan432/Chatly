import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../src/App";
import { setUserData } from "../src/redux/userSlice";

// ✅ Custom hook must start with "use"
const useGetCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log("Error fetching current user:", error.response?.data || error.message);
      }
    };

    // Only fetch if no userData
    if (!userData) fetchUser();
  }, []); // include dispatch in deps for safety
};

export default useGetCurrentUser;
