import React, { useEffect, useState } from "react";
import "./CustomerProduct.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Pagination from "@mui/lab/Pagination";

function CustomerProducts() {
  const [allproduct, setallproduct] = useState([]);
  const [allcategorys, setallcategorys] = useState([]);
  const [page, setpage] = useState(1);
  const [searchvalue, setsearchvalue] = useState("");
  const [CategoryId, setCategoryId] = useState("");
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  console.log(page);
  // تعريف الدالة AddtoCart خارج useEffect
  const AddtoCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        "https://mohamed-apis.vercel.app/card/addToCart",
        {
          productId,
          quantity,
        },
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
          title: " Product Added To Cart Successful!",
          text: "You have successfully Added Product.",
        });
      } else {
        Swal.fire({
          icon: "Failed",
          title: " Failed To Added Product to Cart!",
          text: "Failed To Added Product to Cart!",
        });
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };
  // get all products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mohamed-apis.vercel.app/product/getProduct?page=${page}&size=8&search=${searchvalue}&categoryId=${CategoryId}`,
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
        console.error("Error fetching products info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken, page, searchvalue, CategoryId]);
  // get all category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/category/Get_all_Category_with_SubC",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setallcategorys(response.data.category);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  return (
    <>
      <div style={{ marginTop: "-80px" }} className="Customerproduct">
        <div
          style={{ marginTop: "70px", width: "1270px" }}
          className="product-search animate__animated animate__fadeInDown"
        >
          <div className="seachforproduct">
            <h4 style={{ marginLeft: "20px" }}>Search For Products</h4>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Search"
              aria-label=".form-control-sm example"
              onChange={(e) => {
                setsearchvalue(e.target.value);
              }}
            />
          </div>{" "}
          <div className="Size">
            <h4>Search By Category</h4>
            <select
              style={{ padding: "0", height: "30px", textIndent: "5px" }}
              class="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
            >
              <option hidden>Category</option>
              {allcategorys.map((cat) => {
                return <option value={cat._id}>{cat.name}</option>;
              })}
            </select>
          </div>{" "}
          <div style={{ marginLeft: "-30px" }} className="Customer">
            <h4 style={{ marginLeft: "20px" }}>Descriptions</h4>
            <input
              style={{ width: "280px" }}
              class="form-control form-control-sm"
              type="text"
              placeholder="Search By Descriptions"
              aria-label=".form-control-sm example"
              onChange={(e) => {
                setsearchvalue(e.target.value);
              }}
            />
          </div>
          <div style={{ marginLeft: "-40px" }} className="price">
            <h4 style={{ marginLeft: "20px" }}>Price</h4>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Search By Prices"
              aria-label=".form-control-sm example"
              style={{ width: "280px" }}
            />
          </div>{" "}
        </div>
        <section id="product1" className="section-p1">
          <div className="pro-container">
            {allproduct.map((product) => {
              return (
                <div
                  className="pro col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeInRight"
                  key={product._id}
                >
                  <Link to={`/mainpageforuser/${product._id}`}>
                    <img src={product.Images[0].secure_url} alt="" />
                  </Link>
                  <div className="des">
                    <span>{product.title}</span>
                    <h5>{product.desc}</h5>
                    <div className="star">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <h4>${product.priceAfterDiscount}</h4>
                  </div>
                  <i
                    onClick={() => AddtoCart(product._id, 1)} // الكمية مؤقتًا 1، يمكنك تغيير ذلك حسب ما تحتاج
                    className="fa-solid fa-bag-shopping cart"
                  ></i>
                </div>
              );
            })}
          </div>
        </section>
        <Pagination
          style={{
            marginLeft: "470px",
            marginTop: "-30px",
            marginBottom: "30px",
          }}
          count={10}
          page={page}
          onChange={(event, value) => setpage(value)}
        />
      </div>
    </>
  );
}

export default CustomerProducts;
