import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import "animate.css";
import axios from "axios";

function Dashboard() {
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const [allproduct, setallproduct] = useState([]);
  const [allcategorys, setallcategorys] = useState([]);
  const [Allclients, setAllclients] = useState([]);
  const [allcoupons, setallcoupons] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/product/getProduct?page=1&size=8",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setallproduct(response.data.result);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  // get all gategory
  useEffect(() => {
    const fetchDataforcategory = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/category/Get_all_Category_with_SubC?size=20",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setallcategorys(response.data.category);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchDataforcategory();
  }, [accessToken, refreshToken]);
  // get clients data
  useEffect(() => {
    const fetchclentData = async () => {
      try {
        const response = await axios.get(
          `https://mohamed-apis.vercel.app/user/searchusers?page=1&size=9`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setAllclients(response.data.result);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchclentData();
  }, [accessToken, refreshToken]);
  useEffect(() => {
    const fetchDataforcategory = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/coupon/getallcopuons",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setallcoupons(response.data.result);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchDataforcategory();
  }, [accessToken, refreshToken]);
  const [allorders, setallorders] = useState([]);
  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        "https://mohamed-apis.vercel.app/order/get/orders",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      setallorders(response.data.result);
    } catch (error) {
      console.error("Error fetching cart info:", error);
    }
  };

  // Call fetchCartData initially to load cart data
  useEffect(() => {
    fetchCartData();
  }, [accessToken, refreshToken]);
  return (
    <>
      <div className="Dashboard">
        <h4
          className="animate__animated animate__rubberBand"
          style={{ color: "black", fontWeight: "bold", marginBottom: "10px" }}
        >
          Over View
        </h4>
        <div className="cart-container">
          <div className="cart fixedcart animate__animated animate__zoomInDown">
            <div className="title">
              <i class="fa-brands fa-jedi-order"></i>
              <p>Orders</p>
            </div>
            <div className="descriptions">
              <p>
                Total Orders: {allorders.length}{" "}
                <span>
                  <i class="fa-solid fa-arrow-up"></i>
                </span>
              </p>
            </div>
            <div className="discount">
              <p>
                Discount:<span style={{ color: "red" }}> 30%</span> Of All
                Orders{" "}
              </p>
            </div>
          </div>
          <div className="cart animate__animated animate__zoomInDown">
            <div className="title">
              <i class="fa-brands fa-jedi-order"></i>
              <p>Clients</p>
            </div>
            <div className="descriptions">
              <p>
                Total Clients: {Allclients.length}{" "}
                <span>
                  <i class="fa-solid fa-arrow-up"></i>
                </span>
              </p>
            </div>
            <div className="discount">
              <p>
                Discount:<span style={{ color: "red" }}> 30%</span> For All
                Clients{" "}
              </p>
            </div>
          </div>
          <div className="cart animate__animated animate__zoomInDown">
            <div className="title">
              <i class="fa-brands fa-jedi-order"></i>
              <p>Coupons</p>
            </div>
            <div className="descriptions">
              <p>
                Total Coupons: {allcoupons.length}{" "}
                <span>
                  <i class="fa-solid fa-arrow-up"></i>
                </span>
              </p>
            </div>
            <div className="discount">
              <p>
                Happy To<span style={{ color: "red" }}> Hear</span> All Reports{" "}
              </p>
            </div>
          </div>
          <div className="cart animate__animated animate__zoomInDown">
            <div className="title">
              <i class="fa-brands fa-jedi-order"></i>
              <p>Category</p>
            </div>
            <div className="descriptions">
              <p>
                Total Category: {allcategorys.length}{" "}
                <span>
                  <i class="fa-solid fa-arrow-up"></i>
                </span>
              </p>
            </div>
            <div className="discount">
              <p>
                Discount:<span style={{ color: "red" }}> 30%</span> Of All
                Category{" "}
              </p>
            </div>
          </div>
          <div className="cart animate__animated animate__zoomInDown">
            <div className="title">
              <i class="fa-brands fa-jedi-order"></i>
              <p>Products</p>
            </div>
            <div className="descriptions">
              <p>
                Total Products: {allproduct.length}{" "}
                <span>
                  <i class="fa-solid fa-arrow-up"></i>
                </span>
              </p>
            </div>
            <div className="discount">
              <p>
                Discount:<span style={{ color: "red" }}> 30%</span> Of All
                Products{" "}
              </p>
            </div>
          </div>
          <div className="cart animate__animated animate__zoomInDown">
            <div className="title">
              <i class="fa-brands fa-jedi-order"></i>
              <p>Category</p>
            </div>
            <div className="descriptions">
              <p>
                Total Category: {allcategorys.length}{" "}
                <span>
                  <i class="fa-solid fa-arrow-up"></i>
                </span>
              </p>
            </div>
            <div className="discount">
              <p>
                Discount:<span style={{ color: "red" }}> 30%</span> Of All
                Category{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="mostpopular">
          <h4
            className="animate__animated animate__rubberBand"
            style={{
              marginTop: "20px",
              color: "black",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Most Popular Products
          </h4>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {allproduct.map((pro) => {
              return (
                <div
                  style={{ backgroundColor: "rgb(2, 145, 64)", color: "white" }}
                  class=" mostpopularproduct animate__animated animate__slideInRight"
                >
                  <img src={pro.Images[0].secure_url} alt="" />
                  <div
                    style={{ marginTop: "10px", fontWeight: "bold" }}
                    className="desc"
                  >
                    <h4>{pro.slug}</h4>
                    <p>{pro.desc}</p>
                  </div>
                  <p style={{ fontSize: "23px", marginTop: "25px" }}>
                    Price: <span style={{ color: "red" }}>{pro.price}$</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
