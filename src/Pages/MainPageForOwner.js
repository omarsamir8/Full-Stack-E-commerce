import React from "react";
import "./styles/mainpageforowner.css";
import SideBar from "../components/SideBar/SideBar";
import Navbar from "../components/NavBar/NavBar";
import "animate.css";
import Dashboard from "../components/Dashboard/Dashboard";
import { useRecoilState } from "recoil";
import { $Dashboard_Components } from "../Atoms";
import Orders from "../components/Orders/Orders";
import Clients from "../components/Clients/Clients";
import ClientReports from "../components/ClientReports/ClientReports"; // Removed this line
import Category from "../components/Category/Category";
import Products from "../components/Products/Products";
import CreateCoupons from "../components/Coupon/Coupon";

function MainPageForOwner() {
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Components
  );
  return (
    <>
      <div className="mainpageforowner">
        <div className="sidebaar">
          <SideBar />
        </div>
        <div className="mainpage">
          <Navbar />
          <div>
            {selectedComponent === "Dashboard" && <Dashboard />}
            {selectedComponent === "Order" && <Orders />}
            {selectedComponent === "Clients" && <Clients />}
            {selectedComponent === "ClientReports" && <ClientReports />}{" "}
            {/* Removed this line */}
            {selectedComponent === "Category" && <Category />}
            {selectedComponent === "Products" && <Products />}
            {selectedComponent === "Coupon" && <CreateCoupons />}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPageForOwner;
