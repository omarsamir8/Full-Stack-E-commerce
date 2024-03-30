import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { Link, useParams } from "react-router-dom";
import CustomerNavBar from "../CustomerNavBar/CustomerNavBar";
import Swal from "sweetalert2";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  let index = 0;
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    // Assuming you have a function to fetch product details by ID
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = async (id) => {
    try {
      const response = await fetch(
        `https://mohamed-apis.vercel.app/product/getsingleProduct?productId=${id}`
      );
      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  console.log(product);

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
      <div className="mainpageforcustomer">
        <div>
          <CustomerNavBar />
        </div>
        <div>
          <section
            style={{ marginTop: "-20px", marginLeft: "10px" }}
            id="pro-details"
            className="section-p1" // Changed class to className
          >
            <div className="single-pro-image">
              <img
                src={product?.Images?.[index]?.secure_url} // Optional chaining used here
                style={{ width: "100%", borderRadius: "5px" }}
                id="MainImg"
                alt=""
              />
              <div className="small-img-groupe">
                {/* Check if product and Images are not null before mapping */}
                {product?.Images?.map((image, idx) => (
                  <div className="small-img-col" key={idx}>
                    <img
                      src={image.secure_url}
                      style={{
                        width: "100%",
                        height: "100px",
                        marginTop: "10px",
                        borderRadius: "5px",
                      }}
                      className="small-img"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="single-pro-details">
              <h6>Home / {product?.desc}</h6>
              <h4>{product?.title}</h4>
              <h2>$139.00</h2>
              <select>
                <option>Select Size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>XL</option>
                <option>XXL</option>
              </select>
              <input style={{ marginLeft: "0px" }} type="number" value="1" />
              <button
                onClick={() => AddtoCart(product?._id, product?.stock)}
                className="normal" // Changed class to className
              >
                Add To Cart
              </button>
              <h4>Product Details</h4>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas reprehenderit maiores veritatis eligendi molestiae
                perferendis impedit modi in, reiciendis possimus dignissimos
                dolor quos quae aspernatur quam natus delectus sit blanditiis
                fuga incidunt saepe dolorem accusantium autem! Sed nihil officia
                debitis voluptates eveniet id possimus harum minima quaerat ea
                corporis consequuntur doloribus, illo, et veniam distinctio ipsa
                pariatur? Rerum, eaque labore!
              </span>
              <br></br>
              <Link style={{ fontFamily: "cursive" }} to={"/mainpageforuser"}>
                Continue Shopping
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
