import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addLoggedInUser } from "../../utils/userSlice";
import { useEffect } from "react";
import { useCookie } from "./useCookie";
export const useCurrentUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useCookie;
  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = async () => {
    const data = await fetch(`${API_BASE_URL}/users/current`, {
      headers: { Authorization: `Bearer ${token("jwt")}` },
    });
    const json = await data.json();
    if (!data.ok) {
      navigate("/");
      return console.log(json.message);
    }
    navigate("/books");
    dispatch(addLoggedInUser(json.data));
  };
};
