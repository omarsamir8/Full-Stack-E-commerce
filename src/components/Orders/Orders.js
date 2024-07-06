import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
function Orders() {
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
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
      <div className="orders">
        <h4
          style={{
            color: "black",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "10px",
            fontSize: "20px",
          }}
        >
          Orders
        </h4>
        <div className="order-search animate__animated animate__fadeInDown">
          <div className="seachfororder">
            <h4>Search For Order</h4>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Search"
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="stauts">
            <h4>Status</h4>
            <select class="form-select" aria-label="Default select example">
              <option hidden>Status</option>
              <option value="1">Paied</option>
              <option value="2">Cancelled</option>
              <option value="3">Refunded</option>
            </select>
          </div>
          <div className="Category">
            <h4>Category</h4>
            <select class="form-select" aria-label="Default select example">
              <option hidden>Status</option>
              <option value="1">All</option>
            </select>
          </div>{" "}
          <div style={{ marginRight: "10px" }} className="Customer">
            <h4>Customer</h4>
            <select class="form-select" aria-label="Default select example">
              <option hidden>Customers</option>
              <option value="1">All</option>
            </select>
          </div>
        </div>
        <div
          style={{ marginTop: "20px", borderRadius: "5px" }}
          className="orders-table"
        >
          <table style={{ textAlign: "center" }} class="table">
            <thead style={{ background: "rgb(238, 235, 235)" }}>
              <tr>
                <th scope="col">OrderCode#</th>
                <th scope="col">Address</th>
                <th scope="col">Status</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Total</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Controls</th>
              </tr>
            </thead>
            <tbody>
              {allorders.map((order, index) => {
                return (
                  <tr>
                    <th scope="row">ORD-000{index + 1}</th>
                    <td>{order.address}</td>
                    <td style={{ position: "relative" }}>
                      <div
                        style={{
                          background: "#90EE90",
                          width: "80px",
                          textAlign: "center",
                          borderRadius: "5px",
                          color: "#fff",
                          fontWeight: "bold",
                          position: "absolute",
                          left: "15px",
                        }}
                      >
                        {order.orderStatus}
                      </div>
                    </td>
                    <td>{order.phoneNumbers}</td>
                    <td>{order.subTotal}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      <button
                        style={{ width: "100%", margin: "0" }}
                        type="button"
                        class="btn btn-success"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Orders;
