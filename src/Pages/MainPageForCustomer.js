import React from "react";
import CustomerNavBar from "../componentsforcustomer/CustomerNavBar/CustomerNavBar";
import CustomerSideBar from "../componentsforcustomer/CustomerSideBar/CustomerSideBar";
import Orders from "../components/Orders/Orders";
import Clients from "../components/Clients/Clients";
import ClientReports from "../components/ClientReports/ClientReports";
import { $Dashboard_Components, $Dashboard_Componentss } from "../Atoms";
import { useRecoilState } from "recoil";
import CustomerProducts from "../componentsforcustomer/CustomerProduct/CustomerProduct";
import Cart from "../componentsforcustomer/Cart/Cart";
import CustomerOrders from "../componentsforcustomer/CusOrders/CusOrders";
import ProductDetails from "../componentsforcustomer/ProductDetails/ProductDetails";
function MainPageForCustomer() {
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Componentss
  );
  return (
    <>
      <div className="mainpageforcustomer">
        <div className="CusNavbar">
          <CustomerNavBar />
        </div>
        <div
          style={{ display: "flex", gap: "30px" }}
          className="maincustomerpage"
        >
          <div style={{ position: "fixed" }}>
            <CustomerSideBar />
          </div>
          <div style={{ marginLeft: "70px", marginTop: "20px" }}>
            {selectedComponent === "Orders" && <CustomerOrders />}
            {selectedComponent === "ProductDetails" && <ProductDetails />}
            {selectedComponent === "Clients" && <Clients />}
            {selectedComponent === "ClientReports" && <ClientReports />}
            {selectedComponent === "Cart" && <Cart />}
            {selectedComponent === "Products" && <CustomerProducts />}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPageForCustomer;
