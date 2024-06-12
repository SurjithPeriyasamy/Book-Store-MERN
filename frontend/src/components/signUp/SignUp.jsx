import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addLoggedInUser } from "../../utils/userSlice";
import { getToken } from "../../utils/getToken";
import { useCurrentUser } from "../../utils/hooks/useCurrentUser";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useCurrentUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const data = await fetch(`${API_BASE_URL}/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
        });
        const json = await data.json();
        if (!data.ok) {
          console.log(json);
          return setError(json.message);
        }
        window.document.cookie = `jwt=${
          json.accessToken
        };expires=${new Date().getTime()}+24*60*60*1000`;
        dispatch(
          addLoggedInUser({ ...json.data, accessToken: json.accessToken })
        );
        navigate("/books");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const data = await fetch(`${API_BASE_URL}/users/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        if (!data.ok) {
          return setError(data.statusText);
        }

        const json = await data.json();
        setMessage(json.message);
        console.log(json);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="mx-auto max-w-96 mt-20 space-y-14">
      <h2 className="text-2xl tracking tracking-wider">
        Sign {isLogin ? "In" : "Up"} Page
      </h2>
      <div>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create account? Sign Up" : "Already Registered ? Sign In"}
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 *:border *:px-3 *:py-1 *:rounded-lg *:outline-none"
      >
        <input
          onChange={handleChange}
          type="text"
          // autoComplete="off"
          placeholder="email"
          name="email"
        />
        {!isLogin && (
          <input
            onChange={handleChange}
            type="text"
            placeholder="username"
            name="username"
            className="-order-last"
          />
        )}
        <input
          onChange={handleChange}
          type="text"
          placeholder="password"
          name="password"
        />
        <button className="bg-black text-white">Submit</button>
      </form>
      {message && <div className="text-green-600">{error}</div>}
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default SignUp;
