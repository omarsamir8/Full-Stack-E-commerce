import React, { useState } from "react";
import "./Dashboard.css";
import "animate.css";
import product1 from "../Assets/f3.jpg";
import product2 from "../Assets/f4.jpg";
import product3 from "../Assets/f5.jpg";
import product4 from "../Assets/f6.jpg";
import product5 from "../Assets/f7.jpg";
import product6 from "../Assets/f8.jpg";

function Dashboard() {
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
                Total Orders: 30{" "}
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
                Total Clients: 15{" "}
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
              <p>Reports</p>
            </div>
            <div className="descriptions">
              <p>
                Total Reports: 10{" "}
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
                Total Category: 8{" "}
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
                Total Products: 70{" "}
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
                Total Category: 8{" "}
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
            <div
              style={{ backgroundColor: "rgb(2, 145, 64)", color: "white" }}
              class=" mostpopularproduct animate__animated animate__slideInRight"
            >
              <img src={product1} alt="" />
              <div
                style={{ marginTop: "10px", fontWeight: "bold" }}
                className="desc"
              >
                <h4>Chemis</h4>
                <p>High Quality Of Cotton</p>
              </div>
              <p style={{ fontSize: "23px", marginTop: "25px" }}>
                Price: <span style={{ color: "red" }}>70$</span>
              </p>
            </div>
            <div class=" mostpopularproduct animate__animated animate__slideInRight">
              <img src={product2} alt="" />
              <div
                style={{ marginTop: "10px", fontWeight: "bold" }}
                className="desc"
              >
                <h4>Chemis</h4>
                <p>High Quality Of Cotton</p>
              </div>
              <p style={{ fontSize: "23px", marginTop: "25px" }}>
                Price: <span style={{ color: "red" }}>65$</span>
              </p>
            </div>
            <div class=" mostpopularproduct animate__animated animate__slideInRight">
              <img src={product3} alt="" />
              <div
                style={{ marginTop: "10px", fontWeight: "bold" }}
                className="desc"
              >
                <h4>Chemis</h4>
                <p>High Quality Of Cotton</p>
              </div>
              <p style={{ fontSize: "23px", marginTop: "25px" }}>
                Price: <span style={{ color: "red" }}>35$</span>
              </p>
            </div>
            <div class=" mostpopularproduct animate__animated animate__slideInRight">
              <img src={product4} alt="" />
              <div
                style={{ marginTop: "10px", fontWeight: "bold" }}
                className="desc"
              >
                <h4>Chemis</h4>
                <p>High Quality Of Cotton</p>
              </div>
              <p style={{ fontSize: "23px", marginTop: "25px" }}>
                Price: <span style={{ color: "red" }}>25$</span>
              </p>
            </div>
            <div class=" mostpopularproduct animate__animated animate__slideInRight">
              <img src={product5} alt="" />
              <div
                style={{ marginTop: "10px", fontWeight: "bold" }}
                className="desc"
              >
                <h4>Chemis</h4>
                <p>High Quality Of Cotton</p>
              </div>
              <p style={{ fontSize: "23px", marginTop: "25px" }}>
                Price: <span style={{ color: "red" }}>95$</span>
              </p>
            </div>
            <div class=" mostpopularproduct animate__animated animate__slideInRight">
              <img src={product6} alt="" />
              <div
                style={{ marginTop: "10px", fontWeight: "bold" }}
                className="desc"
              >
                <h4>Chemis</h4>
                <p>High Quality Of Cotton</p>
              </div>
              <p style={{ fontSize: "23px", marginTop: "25px" }}>
                Price: <span style={{ color: "red" }}>55$</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
