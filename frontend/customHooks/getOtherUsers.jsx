import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../src/App";
import { setOtherUsers } from "../src/redux/userSlice";

const useOtherUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/others`, {
          withCredentials: true,
        });
        console.log("Fetched other users:", result.data);
        dispatch(setOtherUsers(result.data));
      } catch (error) {
        console.log("Error fetching other users:", error.response?.data || error.message);
      }
    };

    if (userData) {
      fetchUsers();
    }
  }, [userData]); // 👈 wait for userData before firing
};

export default useOtherUsers;
