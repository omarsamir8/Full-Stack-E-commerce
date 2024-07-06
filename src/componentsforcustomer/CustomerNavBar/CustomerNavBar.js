import React, { useEffect, useState } from "react";
import "./CustomerNavBar.css";
import logo from "./../../components/Assets/lofy.jpeg";
import axios from "axios";
import { $Dashboard_Components } from "../../Atoms";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
function CustomerNavBar() {
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  );
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
    <>
      <div className="CusNavbar">
        <nav class="navbar navbar-light bg-light cusnavbar">
          <div class="container-fluid">
            <span
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginTop: "-10px",
              }}
              class="navbar-text"
            >
              <img
                style={{ width: "50px", height: "50px", marginLeft: "0px" }}
                src={logo}
                alt=""
              />
              <h1
                style={{
                  fontSize: "27px",
                  marginTop: "5px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {userData.firstName} {userData.lastName}
              </h1>
            </span>
            <Link
              style={{ marginRight: "-220px", marginBottom: "5px" }}
              onClick={() => {
                setSelectedComponent("Cart");
              }}
            >
              <i
                style={{
                  fontSize: "30px",
                  color: "white",
                }}
                class="fa-solid fa-cart-shopping"
              ></i>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
export default CustomerNavBar;
