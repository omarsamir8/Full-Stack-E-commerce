import React, { useState } from "react";
import "./styles/loginsignup.css";
import { Link, useNavigate } from "react-router-dom";
import RegImg from "../components/Assets/register.jpg";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://mohamed-apis.vercel.app/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      if (response.ok && data.role === "admin") {
        navigate("/mainpageforowner");
      } else if (response.ok && data.role === "user") {
        navigate("/mainpageforuser");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <>
      <div className="registration">
        <div className="reg-form">
          <h2>Login Here</h2>
          <p>Welcom To Our Website</p>
          <form onSubmit={handleLogin}>
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter Your Email"
              autoComplete="true"
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter Your Password"
              required
            />
            {error && (
              <p style={{ color: "red", fontSize: "16px" }} className="error">
                {error}
              </p>
            )}
            <p>
              {" "}
              Do You Have An Account?
              <span>
                <Link to={"/registration"}>Sign Up</Link>{" "}
              </span>
            </p>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="reg-img">
          <img src={RegImg} alt="" />
        </div>
      </div>
    </>
  );
}

export default Login;
