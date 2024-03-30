import React, { useEffect, useState } from "react";
import "./Clients.css";
import axios from "axios";
function Clients() {
  const [userData, setuserData] = useState([]);
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-alpha-ivory.vercel.app/user/getuser",
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
      <div className="clients">
        <h4
          style={{
            color: "black",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "10px",
            fontSize: "20px",
          }}
        >
          Clients
        </h4>
        <div className="client-search animate__animated animate__fadeInDown">
          <div className="seachforclient">
            <h4>Search For Clients</h4>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Search"
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="stauts">
            <h4>Search By ID</h4>
            <input
              style={{ marginLeft: "0" }}
              class="form-control form-control-sm"
              type="text"
              placeholder="Search"
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="Category">
            <h4>Search By City</h4>
            <input
              style={{ marginLeft: "0" }}
              class="form-control form-control-sm"
              type="text"
              placeholder="Search"
              aria-label=".form-control-sm example"
            />
          </div>{" "}
          <div style={{ marginRight: "10px" }} className="Customer">
            <h4>Search By E-Mail</h4>
            <input
              style={{ marginLeft: "0" }}
              class="form-control form-control-sm"
              type="text"
              placeholder="Search"
              aria-label=".form-control-sm example"
            />
          </div>
        </div>
        <div
          style={{ marginTop: "20px", borderRadius: "5px" }}
          className="orders-table"
        >
          <table class="table ">
            <thead style={{ background: "rgb(238, 235, 235)" }}>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Name</th>
                <th scope="col">City/Statue</th>
                <th scope="col">Infomations</th>
                <th scope="col">Control</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">CLI-0001</th>
                <td>Omar Samir</td>
                <td>Banha</td>
                <td>OmarSamir@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0002</th>
                <td>Kevin De Bruyne </td>
                <td>ManCity </td>
                <td>OmarSamir@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0003</th>
                <td>Nymar Junior </td>
                <td>Barazil</td>
                <td>Nymar@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0004</th>
                <td>Elky Goundogan </td>
                <td>Barchelona</td>
                <td>Goundogan@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0005</th>
                <td>Bernaldo Silva </td>
                <td>Mancity</td>
                <td>Bernaldo@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0006</th>
                <td>Ahmed Adel </td>
                <td>Cairo</td>
                <td>AhmedAdel@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0007</th>
                <td>Edin Hazard</td>
                <td>Chelse</td>
                <td>Hazard@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0008</th>
                <td>Luka Modric </td>
                <td>Real Madrid</td>
                <td>LukaModric@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0009</th>
                <td>Andres Insta </td>
                <td>Banha</td>
                <td>AndresInsta@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0010</th>
                <td>Leo Meesi</td>
                <td>Agrantina</td>
                <td>Meesi@gmail.com</td>
                <td>
                  {" "}
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
                <th scope="row">CLI-0011</th>
                <td>Kun Aguaro</td>
                <td>ManCity</td>
                <td>Aguaro@gmail.com</td>
                <td>
                  {" "}
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
export default Clients;
