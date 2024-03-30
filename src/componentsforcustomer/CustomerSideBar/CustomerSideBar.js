import React from "react";
import "./CustomerSideBar.css";
import ProfileImg from "../../components/Assets/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { $Dashboard_Componentss } from "../../Atoms";
function CustomerSideBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Componentss
  );
  return (
    <>
      <div className="sidebar2">
        <img
          style={{ width: "40px", height: "40px", marginTop: "20px" }}
          src={ProfileImg}
          alt=""
        />

        <div className="line"></div>
        <div className="item-links">
          <Link
            onClick={() => {
              setSelectedComponent("Products");
            }}
          >
            <i class="fa-brands fa-product-hunt"></i>
          </Link>
          <Link
            onClick={() => {
              setSelectedComponent("Orders");
            }}
          >
            <i class="fa-brands fa-jedi-order"></i>
          </Link>

          <Link
            onClick={() => {
              setSelectedComponent("Cart");
            }}
          >
            <i class="fa-solid fa-cart-plus"></i>
          </Link>
        </div>
        <div className="item-links logout">
          <i onClick={logout} class="fa-solid fa-right-from-bracket"></i>
        </div>
      </div>
    </>
  );
}
export default CustomerSideBar;
