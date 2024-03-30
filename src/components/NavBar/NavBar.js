import React, { useState, useEffect } from "react";
import "./Navbar.css";
import lofy from "../Assets/lofy.jpeg";
import "animate.css";
import axios from "axios";
import { ref } from "yup";

function Navbar() {
  const [error, setError] = useState("");
  const [userData, setuserData] = useState([]);
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/user/getuser",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setuserData(response.data.user);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  return (
    <div className="navbar">
      <div style={{ marginLeft: "20px" }} className="info">
        <img src={lofy} alt="" />
        <h4 className="animate__animated animate__rubberBand">
          {userData.firstName} {userData.lastName}
        </h4>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "red",
            position: "absolute",
            right: "20px",
            top: "16px",
            cursor: "pointer",
          }}
        ></div>
      </div>
      <i
        style={{
          fontSize: "24px",
          cursor: "pointer",
          color: "white",
          marginRight: "20px",
        }}
        className="fa-solid fa-bell"
      ></i>
    </div>
  );
}

export default Navbar;
