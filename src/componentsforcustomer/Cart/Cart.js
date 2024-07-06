import React, { useEffect, useState } from "react";
import "./Cart.css";
// import productimg from "../../components/Assets/f3.jpg";
import { $Dashboard_Componentss } from "../../Atoms";
import { useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
function Cart() {
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Componentss
  );
  let [quantityofproduct, setquantityofproduct] = useState(1);
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const [cartinfo, setcartinfo] = useState([]);
  let index = 0;
  const [phoneNumbers, setphoneNumbers] = useState("");
  const [address, setaddress] = useState("");
  const [paymentMethod, setpaymentMethod] = useState("");
  const [cartId, setcartId] = useState("");
  const [subTotal, setsubTotal] = useState("");
  const [paymenturl, setpaymenturl] = useState("");
  console.log(accessToken, refreshToken);
  const navigator = useNavigate();
  // delete from cart
  const deletefromcart = async (productId) => {
    console.log(productId);
    try {
      const response = await fetch(
        `https://mohamed-apis.vercel.app/card/deleteFromCart?productId=${productId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );

      if (response.ok) {
        // On success, update the state to remove the deleted course
        setcartinfo((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        console.log(`Product with ID ${productId} deleted successfully.`);
        fetchCartData();
        Swal.fire({
          icon: "success",
          title: "Remove Product from Cart Done Successfully!",
          text: "Remove Product from Cart Done Successfully!",
        });
      } else {
        Swal.fire({
          icon: "Failed",
          title: " Failed To Remove Product from Cart!",
          text: "Failed To Remove Product from Cart!",
        });
        console.error(`Failed to delete Product with ID ${productId}.`);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // get cart info
  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        "https://mohamed-apis.vercel.app/card/getCardInfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      setcartinfo(response.data.card.products);
      setcartId(response.data.card._id);
      setsubTotal(response.data.card.subTotal);
    } catch (error) {
      console.error("Error fetching cart info:", error);
    }
  };

  // Call fetchCartData initially to load cart data
  useEffect(() => {
    fetchCartData();
  }, [accessToken, refreshToken]);

  // make order
  const MakeOrdeer = async () => {
    try {
      console.log(phoneNumbers, paymentMethod, address, cartId);
      const response = await fetch(
        "https://mohamed-apis.vercel.app/order/cardToOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            paymentMethod,
            cartId,
            address,
            phoneNumbers,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (paymentMethod !== "cash") {
        setpaymenturl(data.payment.url);
      }

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Order Making Successfully!",
          text: "You have successfully made the order.",
        });

        // Redirect the user to the payment URL
      } else {
        Swal.fire({
          icon: "Failed",
          title: "Failed To Make Order!",
          text: data.error_Message
            ? data.error_Message[0].message
            : data.message,
        });
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  if (paymenturl !== "") {
    window.location.href = `${paymenturl}`;
  }

  return (
    <>
      <div className="cart-containeer">
        <div className="cart-items">
          <div className="cart-header">
            <div>
              <h3>Shopping Cart</h3>
              <p>
                You Have <span style={{ color: "red" }}>{cartinfo.length}</span>{" "}
                Items In Your Cart
              </p>
            </div>
            <div className="backtoshopping">
              <Link
                onClick={() => {
                  setSelectedComponent("Products");
                }}
              >
                <i class="fa-solid fa-arrow-right"></i>
              </Link>

              <Link
                onClick={() => {
                  setSelectedComponent("Products");
                }}
              >
                <p>Continue Shopping</p>
              </Link>
            </div>
          </div>
          {cartinfo.map((cart) => {
            return (
              <div className="items animate__animated animate__fadeInDown">
                <div className="img-container">
                  <img
                    src={cart?.productId?.Images?.[index]?.secure_url}
                    alt=""
                  />
                </div>
                <div className="item-details">
                  <h5>{cart.productId.title}</h5>
                  <p>{cart.productId.desc}</p>
                </div>
                <div className="count">
                  <i
                    onClick={() => setquantityofproduct(quantityofproduct + 1)}
                    class="fa-solid fa-plus"
                  ></i>
                  <input
                    type="text"
                    placeholder="1"
                    value={quantityofproduct}
                  />
                  <i
                    onClick={() => setquantityofproduct(quantityofproduct - 1)}
                    class="fa-solid fa-minus"
                  ></i>
                </div>
                <div className="item-price">
                  <h4>${cart.productId.priceAfterDiscount}</h4>
                  <i
                    onClick={() => deletefromcart(cart.productId._id)}
                    class="fa-solid fa-trash"
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="CardDetails">
          <div className="Card-title">
            <h3>Card Details</h3>
          </div>
          <div className="cardtype">
            {/* <h5>Card Type</h5>
            <div className="images">
              <div>
                <img src={visa} alt="" />
              </div>
              <div>
                <img src={visa2} alt="" />
              </div>
              <div>
                <img src={visa3} alt="" />
              </div>
              <div>
                <img src={visa4} alt="" />
              </div>
            </div> */}
            <div className="card-inputs">
              <div className="hidden">
                <h5>Name on Card</h5>
                <input type="text" placeholder="Name on Card" />
              </div>
              <div className="hidden">
                <h5>Card Number</h5>
                <input type="text" placeholder="Name on Card" />
              </div>
              <div className="smallinputs hidden">
                <div className="hidden">
                  <h5>Expiration Date</h5>
                  <input type="text" placeholder="Name on Card" />
                </div>
                <div className="hidden">
                  <h5>CVV</h5>
                  <input type="text" placeholder="Name on Card" />
                </div>
              </div>
              <div className="order-details">
                <h5>Address</h5>
                <input
                  type="text"
                  placeholder="Address "
                  name="address"
                  onChange={(e) => {
                    setaddress(e.target.value);
                  }}
                  value={address}
                />
              </div>
              <div className="order-details">
                <h5>Phone Number</h5>
                <input
                  name="phoneNumbers"
                  type="phone"
                  value={phoneNumbers}
                  onChange={(e) => {
                    setphoneNumbers(e.target.value);
                  }}
                  placeholder="Phone Number "
                />
              </div>
              <div className="order-details">
                <h5>Payment Method</h5>
                <input
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => {
                    setpaymentMethod(e.target.value);
                  }}
                  type="phone"
                  placeholder="Payment Method  "
                />
              </div>
              <div className="card-line"></div>
              <div className="card-price">
                <div>
                  <h5>SubTotal</h5>
                  <h4>${subTotal}</h4>
                </div>
              </div>
              <button
                onClick={() => {
                  MakeOrdeer();
                }}
              >
                Make Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
