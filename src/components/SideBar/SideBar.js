import React from "react";
import "./SideBar.css";
import ProfileImg from "../Assets/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $Dashboard_Components } from "../../Atoms";
function SideBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  );
  return (
    <>
      <div className="sidebar">
        <img src={ProfileImg} alt="" />
        <h1>Noor Market</h1>
        <div className="line"></div>

        <div className="item-links">
          <i class="fa-solid fa-gauge"></i>
          <Link
            onClick={() => {
              setSelectedComponent("Dashboard");
            }}
          >
            <p>Dashboard</p>
          </Link>
        </div>
        <div className="item-links">
          <i class="fa-solid fa-cart-shopping"></i>
          <Link
            onClick={() => {
              setSelectedComponent("Order");
            }}
          >
            <p>Orders</p>
          </Link>
        </div>
        <div className="item-links">
          <i class="fa-regular fa-user"></i>
          <Link
            onClick={() => {
              setSelectedComponent("Clients");
            }}
          >
            <p>Clients</p>
          </Link>
        </div>
        <div className="item-links">
          <i class="fa-solid fa-layer-group"></i>
          <Link
            onClick={() => {
              setSelectedComponent("Category");
            }}
          >
            <p>Category</p>
          </Link>
        </div>
        <div className="item-links">
          <i class="fa-solid fa-layer-group"></i>
          <Link
            onClick={() => {
              setSelectedComponent("Coupon");
            }}
          >
            <p>Coupon</p>
          </Link>
        </div>
        <div className="item-links">
          <i class="fa-brands fa-product-hunt"></i>
          <Link
            onClick={() => {
              setSelectedComponent("Products");
            }}
          >
            <p>Products</p>
          </Link>
        </div>
        <div className="item-links logout">
          <i onClick={logout} class="fa-solid fa-right-from-bracket"></i>
          <p onClick={logout}>Log Out</p>
        </div>
      </div>
    </>
  );
}
export default SideBar;
