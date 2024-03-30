import React from "react";
import "./Orders.css";
function Orders() {
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
              {/* <option value="2">Cancelled</option>
              <option value="3">Refunded</option> */}
            </select>
          </div>{" "}
          <div style={{ marginRight: "10px" }} className="Customer">
            <h4>Customer</h4>
            <select class="form-select" aria-label="Default select example">
              <option hidden>Customers</option>
              <option value="1">All</option>
              {/* <option value="2">Cancelled</option>
              <option value="3">Refunded</option> */}
            </select>
          </div>
        </div>
        <div
          style={{ marginTop: "20px", borderRadius: "5px" }}
          className="orders-table"
        >
          <table class="table">
            <thead style={{ background: "rgb(238, 235, 235)" }}>
              <tr>
                <th scope="col">OrderCode#</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Customer</th>
                <th scope="col">Controls</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">ORD-0001</th>
                <td>Mar 16,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0002</th>
                <td>Feb 10,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0003</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0004</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0005</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0006</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0007</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0008</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0009</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0010</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0011</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0012</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0013</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
              <tr>
                <th scope="row">ORD-0014</th>
                <td>Jan 28,2024</td>
                <td>
                  <div
                    style={{
                      background: "#90EE90",
                      width: "80px",
                      textAlign: "center",
                      borderRadius: "5px",
                      color: "rgb(2, 145, 64)",
                    }}
                  >
                    <i class="fa-solid fa-check"></i> Paid
                  </div>
                </td>
                <td>OmarSamir@gmail.com</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Orders;
