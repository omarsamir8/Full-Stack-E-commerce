import React, { useState } from "react";
import "./styles/loginsignup.css";
import RegImg from "../components/Assets/register.jpg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Registrations() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      userName,
      email,
      password,
      cpassword,
      // gender,
    };
    console.log(userData);
    try {
      const response = await fetch(
        "https://ecommerce-alpha-ivory.vercel.app/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        // Registration successful
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have successfully registered.",
        });
        // Optionally, you can redirect the user to another page after successful registration
        // history.push("/dashboard");
      } else {
        // Registration failed
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: errorData.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="registration">
        <div className="reg-form">
          <h2>Sign Up</h2>
          <p>Welcome To Our Website</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="Enter First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Enter Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              type="text"
              name="userName"
              value={userName}
              placeholder="Enter Username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              name="cpassword"
              value={cpassword}
              placeholder="Confirm Password"
              onChange={(e) => setCpassword(e.target.value)}
              required
            />

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled hidden>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <p>
              Have An Account?{" "}
              <span>
                <Link to={"/"}>Login</Link>
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

export default Registrations;
