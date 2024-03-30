import React, { useEffect, useState } from "react";
import "./CustomerProduct.css";
import productimg1 from "../../components/Assets/f5.jpg";
import productimg2 from "../../components/Assets/f6.jpg";
import productimg3 from "../../components/Assets/f7.jpg";
import productimg4 from "../../components/Assets/f3.jpg";
import productimg5 from "../../components/Assets/f4.jpg";
import productimg6 from "../../components/Assets/f8.jpg";
import "animate.css";
import { $Dashboard_Componentss } from "../../Atoms";
import { useRecoilState } from "recoil";
import { Link, json } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function CustomerProducts() {
  const [selectedComponent, setSelectedComponent] = useRecoilState(
    $Dashboard_Componentss
  );
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const [allproduct, setallproduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/product/getProduct?page=1&size=10",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setallproduct(response.data.result);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);

  // add to cart
  const AddtoCart = async (productId, quantity) => {
    try {
      const response = await fetch(
        `https://mohamed-apis.vercel.app/card/addToCart&productId=${productId}&quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          // body: JSON.stringify(productId, quantity),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: " Product Added To Cart Successful!",
          text: "You have successfully Added Product.",
        });
      } else {
        const errorData = await response.json();
        console.log(errorData);
        Swal.fire({
          icon: "error",
          title: "Add Product To Cart Failed",
          text: errorData.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div style={{ marginTop: "-80px" }} className="Customerproduct">
        <div
          style={{ marginTop: "70px", width: "99.8%" }}
          className="product-search animate__animated animate__fadeInDown"
        >
          <div className="seachforproduct">
            <h4 style={{ marginLeft: "20px" }}>Search For Products</h4>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Search"
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="price">
            <h4 style={{ marginLeft: "20px" }}>Price</h4>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Search By Prices"
              aria-label=".form-control-sm example"
            />
          </div>{" "}
          <div className="Customer">
            <h4 style={{ marginLeft: "20px" }}>Descriptions</h4>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Search By Descriptions"
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="Size">
            <h4>Size</h4>
            <select
              style={{ padding: "0", height: "30px", textIndent: "5px" }}
              class="form-select"
              aria-label="Default select example"
            >
              <option hidden>Size</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </div>{" "}
        </div>
        <section id="product1" class="section-p1">
          <div class="pro-container">
            {allproduct.map((product) => {
              return (
                <div class="pro col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeInRight">
                  <Link to={`/mainpageforuser/${product._id}`}>
                    <img src={product.Images[0].secure_url} alt="" />
                  </Link>
                  <div class="des">
                    <span>{product.title}</span>
                    <h5>{product.desc}</h5>
                    <div class="star">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </div>
                    <h4>${product.priceAfterDiscount}</h4>
                  </div>

                  <i
                    onClick={() => AddtoCart(product._id, product.stock)}
                    class="fa-solid fa-bag-shopping cart"
                  ></i>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
export default CustomerProducts;
