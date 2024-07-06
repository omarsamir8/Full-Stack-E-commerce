import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Registrations from "./Pages/Registrations";
import Login from "./Pages/Login";
import MainPageForOwner from "./Pages/MainPageForOwner";
import MainPageForCustomer from "./Pages/MainPageForCustomer";
import ProductDetails from "./componentsforcustomer/ProductDetails/ProductDetails";
import SuccessOrder from "./componentsforcustomer/SuccessOrder/SuccessOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {" "}
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registrations />} />
          <Route path="/mainpageforowner" element={<MainPageForOwner />} />
          <Route path="/mainpageforuser" element={<MainPageForCustomer />} />
          <Route path="/order/success_url/:key" element={<SuccessOrder />} />
          <Route
            path="/mainpageforuser/:productId"
            element={<ProductDetails />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
