import React, { useEffect, useState } from "react";
import "./Cart.css";
import productimg from "../../components/Assets/f3.jpg";
import { $Dashboard_Componentss } from "../../Atoms";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import visa from "../../components/Assets/VISA-logo.jpg";
import visa2 from "../../components/Assets/visa2.png";
import visa3 from "../../components/Assets/visa3.jpg";
import visa4 from "../../components/Assets/Paypal_2014_logo.png";
import axios from "axios";
import swal from "sweetalert";
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
  console.log(quantityofproduct);
  // get all product
  useEffect(() => {
    const fetchData = async () => {
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
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  // delete from cart
  const deleteproductfromcart = async (productId) => {
    try {
      const response = await axios.delete(
        `https://mohamed-apis.vercel.app/card/deleteFromCart?productId=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Delete Product From Cart Successfully",
          text: "Delete Product From Cart Successfully",
        });
        setcartinfo((prevCartinfo) =>
          prevCartinfo.filter((cart) => cart._id !== productId)
        );
        console.log(
          `Product with ID ${productId} deleted from cart successfully.`
        );
      } else {
        console.error(`Failed to delete product with ID ${productId}.`);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
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
                  <img src={cart?.Images?.[index]?.secure_url} alt="" />
                </div>
                <div className="item-details">
                  <h5>{cart.title}</h5>
                  <p>{cart.desc}</p>
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
                  <h4>${cart.priceAfterDiscount}</h4>
                  <i
                    onClick={() => deleteproductfromcart(cart._id)}
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
            <h5>Card Type</h5>
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
            </div>
            <div className="card-inputs">
              <div>
                <h5>Name on Card</h5>
                <input type="text" placeholder="Name on Card" />
              </div>
              <div>
                <h5>Card Number</h5>
                <input type="text" placeholder="Name on Card" />
              </div>
              <div className="smallinputs">
                <div>
                  <h5>Expiration Date</h5>
                  <input type="text" placeholder="Name on Card" />
                </div>
                <div>
                  <h5>CVV</h5>
                  <input type="text" placeholder="Name on Card" />
                </div>
              </div>
              <div className="card-line"></div>
              <div className="card-price">
                <div>
                  <h5>SubTotal</h5>
                  <h4>$500,000</h4>
                </div>
                <div>
                  <h5>Shipping</h5>
                  <h4>$50,000</h4>
                </div>
                <div>
                  <h5>SubTotal</h5>
                  <h4>$550,000</h4>
                </div>
              </div>
              <button>Check Payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;
