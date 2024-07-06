import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";

function CreateCoupons() {
  const [couponCode, setcouponCode] = useState("");
  const [couponAmount, setcouponAmount] = useState();
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [isPercentage, setisPercentage] = useState(true);
  const [userId, setuserId] = useState(""); // Initialize as a string
  const [maxUsage, setmaxUsage] = useState("");
  const [selectedid, setselectedid] = useState("");
  const [couponAssginedToUsers, setcouponAssginedToUsers] = useState([]); // Initialize as an empty array
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const [Allclients, setAllclients] = useState([]);
  const [allcoupons, setallcoupons] = useState([]);

  useEffect(() => {
    const fetchclentData = async () => {
      try {
        const response = await axios.get(
          `https://mohamed-apis.vercel.app/user/searchusers?page=1&size=9`,
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

  const Createcoupon = async () => {
    try {
      const response = await fetch(
        `https://mohamed-apis.vercel.app/coupon/createCoupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            couponCode,
            couponAmount,
            fromDate,
            toDate,
            isPercentage,
            couponAssginedToUsers,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Coupon Created successfully",
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: data.error_Message
            ? data.error_Message[0].message
            : data.message,
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Create failed", error);
    }
  };
  // get all coupon
  useEffect(() => {
    const fetchDataforcategory = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/coupon/getallcopuons",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setallcoupons(response.data.result);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchDataforcategory();
  }, [accessToken, refreshToken]);
  // Delete Coupon
  const deleteCoupon = async (couponId) => {
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
          `https://mohamed-apis.vercel.app/coupon/delete?couponId=${couponId}`,
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
          setAllclients((prevCoupon) =>
            prevCoupon.filter((coupon) => coupon._id !== couponId)
          );
          Swal.fire({
            icon: "success",
            title: "Coupon Deleted successfully",
            showConfirmButton: false,
            timer: 3500,
          });
          window.location.reload();
          console.log(`Course with ID ${couponId} deleted successfully.`);
        } else {
          console.error(`Failed to delete course with ID ${couponId}.`);
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  // update prductz
  const updateCoupon = async () => {
    try {
      const response = await fetch(
        `https://mohamed-apis.vercel.app/coupon/update?couponId=${selectedid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            couponCode,
            couponAmount,
            fromDate,
            toDate,
            isPercentage,
            couponAssginedToUsers,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Coupon updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified course
        setallcoupons((prevCoupon) =>
          prevCoupon.map((prevCoupon) =>
            prevCoupon._id === selectedid
              ? {
                  ...prevCoupon,
                  couponCode,
                  couponAmount,
                  fromDate,
                  toDate,
                  isPercentage,
                  couponAssginedToUsers,
                }
              : prevCoupon
          )
        );

        // Clear the selected course and reset input fields
        setselectedid(null);
        setcouponCode("");
        setcouponAmount("");
        setfromDate("");
        settoDate("");
        setisPercentage("");
        setcouponAssginedToUsers(null);
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: data.error_Message
            ? data.error_Message[0].message
            : data.message,
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  return (
    <>
      <div
        style={{ marginBottom: "5px", width: "1130px" }}
        className="add-products"
      >
        <div className="add-product animate__animated animate__fadeInDown">
          <div className="product-input">
            <label>Coupon Code</label>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Coupon Code"
              name="title"
              style={{ height: "40px" }}
              value={couponCode}
              onChange={(e) => {
                setcouponCode(e.target.value);
              }}
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="product-input">
            <label>Coupon Amount</label>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Coupon Amount"
              name="price"
              style={{ height: "40px" }}
              value={couponAmount}
              onChange={(e) => {
                setcouponAmount(e.target.value);
              }}
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="product-input">
            <label style={{ marginLeft: "0" }}>User ID</label>
            <Select
              style={{ height: "40px" }}
              isMulti
              name="colors"
              options={Allclients.map((client) => {
                return {
                  value: client._id,
                  label: client.firstName + " " + client.lastName,
                };
              })}
              onChange={(selectedOptions, e) => {
                const selectedLabels = selectedOptions.map(
                  (option) => option.value
                );
                setuserId(selectedLabels);
              }}
              className="Materials_select"
              classNamePrefix="select"
              placeholder="Select User ID"
            />
          </div>
          <div className="product-input">
            <label>From Date</label>
            <input
              type="date"
              style={{
                padding: "0",
                marginLeft: "20px",
                width: "300px",
                height: "40px",
                textIndent: "5px",
                border: "none",
                fontWeight: "200",
                fontSize: "18px",
              }}
              value={fromDate}
              onChange={(e) => {
                setfromDate(e.target.value);
              }}
            />
          </div>
          <div className="product-input">
            <label>To Date</label>
            <input
              type="date"
              style={{
                padding: "0",
                marginLeft: "20px",
                width: "300px",
                height: "40px",
                textIndent: "5px",
                border: "none",
                fontWeight: "200",
                fontSize: "18px",
              }}
              value={toDate}
              onChange={(e) => {
                settoDate(e.target.value);
              }}
            />
          </div>
          <div className="product-input">
            <label style={{ marginLeft: "0" }}>Max Usage</label>
            <input
              style={{ height: "40px", marginLeft: "0" }}
              class="form-control form-control-sm"
              type="number"
              placeholder="Discount"
              name="appliedDiscount"
              value={maxUsage}
              onChange={(e) => {
                setmaxUsage(e.target.value);
              }}
              aria-label=".form-control-sm example"
            />
          </div>

          <button
            style={{
              width: "83%",
              marginTop: "0px",
              marginBottom: "10px",
              height: "35px",
              marginRight: "30px",
            }}
            onClick={selectedid ? updateCoupon : Createcoupon}
            type="button"
            class="btn btn-success"
          >
            {selectedid ? "Update Coupon" : "Create Coupon"}
          </button>
        </div>
        <Table
          style={{ width: "1092px" }}
          striped
          bordered
          hover
          className="table"
        >
          <thead>
            <tr>
              <th className="doctorInfo" scope="col">
                #ID
              </th>
              <th className="doctorInfo" scope="col">
                Coupon Code
              </th>
              <th className="doctorInfo" scope="col">
                Coupon Amount
              </th>
              <th className="doctorInfo" scope="col">
                From Date
              </th>
              <th className="doctorInfo" scope="col">
                To Date
              </th>
              <th className="doctorInfo" scope="col">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {allcoupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <th className="doctorInfo" scope="row">
                  {index + 1}
                </th>
                <td className="doctorInfo">{coupon.couponCode}</td>
                <td className="doctorInfo">{coupon.couponAmount} %</td>
                <td className="doctorInfo">{coupon.fromDate}</td>
                <td className="doctorInfo">{coupon.toDate}</td>
                <td>
                  <div style={{ flexWrap: "nowrap" }} className="row">
                    <button
                      style={{
                        width: "40%",
                        backgroundColor: "#996ae4",
                        borderColor: "#996ae4",
                      }}
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setselectedid(coupon._id);
                        setcouponCode(coupon.couponCode);
                        setcouponAmount(coupon.couponAmount);
                        setfromDate(coupon.fromDate);
                        settoDate(coupon.toDate);
                      }}
                    >
                      Update
                    </button>
                    <button
                      style={{ width: "40%" }}
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteCoupon(coupon._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
export default CreateCoupons;
