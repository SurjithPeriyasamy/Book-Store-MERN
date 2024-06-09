import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      (async function () {
        try {
          const data = await fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
          const json = await data.json();
          if (!data.ok) {
            console.log(json);
            return setError(json.message);
          }

          navigate("/books");
          console.log(json);
        } catch (error) {
          console.log(error.message);
        }
      })();
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
          placeholder="email"
          name="email"
        />
        {!isLogin && (
          <>
            <input
              onChange={handleChange}
              type="text"
              placeholder="username"
              name="username"
              className="-order-last"
            />
            <input
              onChange={handleChange}
              type="number"
              placeholder="age"
              name="age"
            />
            <input
              onChange={handleChange}
              type="number"
              placeholder="role"
              name="role"
            />
          </>
        )}
        <input
          onChange={handleChange}
          type="text"
          placeholder="password"
          name="password"
        />
        <button className="bg-black text-white">Submit</button>
      </form>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
};

export default SignUp;
