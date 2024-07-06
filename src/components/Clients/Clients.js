import React, { useEffect, useState } from "react";
import "./Clients.css";
import axios from "axios";
import Swal from "sweetalert2";
function Clients() {
  const [Allclients, setAllclients] = useState([]);
  const [firstName, setfirstName] = useState("");
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  // get clients data
  useEffect(() => {
    const fetchclentData = async () => {
      try {
        const response = await axios.get(
          `https://mohamed-apis.vercel.app/user/searchusers?page=1&size=9&sort=${firstName}`,
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
  console.log(Allclients);

  // delete category
  const deleteClient = async (clientId) => {
    try {
      const confirmed = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirmed.isConfirmed) {
        const response = await fetch(
          `https://mohamed-apis.vercel.app/user/delete?userId=${clientId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        if (response.ok) {
          // On success, update the state to remove the deleted course
          setAllclients((prevClient) =>
            prevClient.filter((client) => client._id !== clientId)
          );
          console.log(`Course with ID ${clientId} deleted successfully.`);
        } else {
          console.error(`Failed to delete course with ID ${clientId}.`);
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

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
              name="firstName"
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
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
          <table style={{ textAlign: "center" }} class="table ">
            <thead style={{ background: "rgb(238, 235, 235)" }}>
              <tr>
                <th scope="col">#ID</th>
                <th scope="col">Name</th>
                <th scope="col">Statue</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Control</th>
              </tr>
            </thead>
            <tbody>
              {Allclients.map((client, index) => {
                return (
                  <tr>
                    <th scope="row">CLI-0{index}</th>
                    <td>{client.userName}</td>
                    <td>{client.status}</td>
                    <td>{client.email}</td>
                    <td>{client.gender}</td>
                    <td>
                      {" "}
                      <button
                        style={{ width: "100%", margin: "0" }}
                        type="button"
                        class="btn btn-success"
                        onClick={() => {
                          deleteClient(client._id);
                        }}
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
export default Clients;
