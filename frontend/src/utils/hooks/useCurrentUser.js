import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import { getToken } from "../getToken";
import { useDispatch } from "react-redux";
import { addLoggedInUser } from "../../utils/userSlice";
import { useEffect } from "react";
export const useCurrentUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = async () => {
    const data = await fetch(`${API_BASE_URL}/users/current`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const json = await data.json();
    if (!data.ok) {
      // navigate("/");
      return console.log(json.message);
    }
    navigate("/books");
    dispatch(addLoggedInUser(json.data));
  };
};
