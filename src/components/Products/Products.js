import React, { useEffect, useState } from "react";
import "./Products.css";
import "animate.css";
import product2 from "../Assets/f4.jpg";
import Swal from "sweetalert2";
import axios from "axios";

function Products() {
  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const [size, setsize] = useState([]);
  const [image, setimage] = useState(null); // Changed to null
  const [desc, setdesc] = useState("");
  const [stock, setstock] = useState("");
  const [color, setcolor] = useState([]);
  const [appliedDiscount, setappliedDiscount] = useState("");
  const [selectedid, setselectedid] = useState("");
  const [allproduct, setallproduct] = useState([]);
  const [allcategorys, setallcategorys] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  // create product
  const CreateProduct = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("price", price);
      formdata.append("size", size);
      formdata.append("image", image); // Append the file, not just the value
      formdata.append("desc", desc);
      formdata.append("appliedDiscount", appliedDiscount);
      formdata.append("stock", stock);
      formdata.append("color", color);

      const response = await fetch(
        `https://mohamed-apis.vercel.app/product/createProduct?categoryId=${categoryId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: formdata,
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Product Created Successful!",
          text: "You have successfully Creation Product.",
        });
      } else {
        const errorData = await response.json();
        console.log(errorData);
        Swal.fire({
          icon: "error",
          title: "Create Product Failed",
          text: errorData.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // get all product
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
  // delete product
  const deleteproduct = async (productId) => {
    try {
      const response = await fetch(
        `https://mohamed-apis.vercel.app/product/deleteProduct?productId=${productId}`, // Corrected endpoint
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        }
      );
      console.log(response.data);
      if (response.ok) {
        setallproduct((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
        console.log(`Product with ID ${productId} deleted successfully.`);
      } else {
        console.error(`Failed to delete product with ID ${productId}.`);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // update prduct
  const updateProduct = async () => {
    try {
      const response = await fetch(
        `https://mohamed-apis.vercel.app/product/updateProduct?productId=${selectedid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            title,
            image,
            price,
            appliedDiscount,
            stock,
            color,
            size,
            desc,
            categoryId,
          }),
        }
      );

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Product updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified course
        setallproduct((prevProduct) =>
          prevProduct.map((prevProduct) =>
            prevProduct._id === selectedid
              ? {
                  ...prevProduct,
                  title,
                  image,
                  price,
                  appliedDiscount,
                  stock,
                  color,
                  size,
                  desc,
                  categoryId,
                }
              : prevProduct
          )
        );

        // Clear the selected course and reset input fields
        setselectedid(null);
        settitle("");
        setimage("");
        setprice("");
        setsize("");
        setcolor("");
        setstock("");
        setdesc("");
        setappliedDiscount("");
        setcategoryId("");
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Product update failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };
  // get all gategory
  useEffect(() => {
    const fetchDataforcategory = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/category/Get_all_Category_with_SubC?size=20",
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

    fetchDataforcategory();
  }, [accessToken, refreshToken]);
  return (
    <>
      <div style={{ marginBottom: "5px" }} className="add-products">
        <h4
          style={{
            color: "black",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "10px",
            fontSize: "20px",
          }}
        >
          Products
        </h4>
        <div className="product-search animate__animated animate__fadeInDown">
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
          </div>
        </div>
        <div className="add-product animate__animated animate__fadeInDown">
          <div className="product-input">
            <label>Title</label>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="product-input">
            <label>Description</label>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Descriptions"
              name="desc"
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="product-input">
            <label>Price</label>
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder="Price"
              name="price"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="product-input">
            <label>Size</label>
            <select
              style={{
                marginLeft: "20px",
                width: "300px",
                padding: "0",
                height: "30px",
                textIndent: "5px",
              }}
              name="size"
              value={size}
              onChange={(e) => {
                setsize(e.target.value);
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option hidden>Size</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </div>
          <div className="product-input">
            <label>Category</label>
            <select
              style={{
                padding: "0",
                marginLeft: "20px",
                width: "300px",
                height: "30px",
                textIndent: "5px",
              }}
              className="form-select"
              aria-label="Default select example"
              value={categoryId}
              name="categoryId"
              onChange={(e) => setcategoryId(e.target.value)} // Set categoryId state here
            >
              <option hidden>Select a Category</option>
              {allcategorys.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="product-input">
            <label>Color</label>
            <select
              style={{
                marginLeft: "20px",
                width: "300px",
                padding: "0",
                height: "30px",
                textIndent: "5px",
              }}
              name="color"
              value={color}
              onChange={(e) => {
                setcolor(e.target.value);
              }}
              className="form-select" // Changed to className
              aria-label="Default select example"
            >
              <option hidden>Select a color</option>
              {["White", "Black", "Red"].map((colorOption, index) => (
                <option key={index} value={colorOption.toLowerCase()}>
                  {colorOption}
                </option>
              ))}
            </select>
          </div>
          <div className="product-input">
            <label>Discount</label>
            <input
              class="form-control form-control-sm"
              type="number"
              placeholder="Discount"
              name="appliedDiscount"
              value={appliedDiscount}
              onChange={(e) => {
                setappliedDiscount(e.target.value);
              }}
              aria-label=".form-control-sm example"
            />
          </div>
          <div className="product-input">
            <label>Stock</label>
            <input
              class="form-control form-control-sm"
              type="number"
              placeholder="Stock"
              name="stock"
              value={stock}
              onChange={(e) => {
                setstock(e.target.value);
              }}
              aria-label=".form-control-sm example"
            />
          </div>
          <div style={{ marginBottom: "30px" }} className="product-input">
            <label>Image</label>
            <input
              className="form-control form-control-sm"
              type="file"
              placeholder="Image"
              name="Imges"
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
              aria-label=".form-control-sm example"
            />
          </div>{" "}
          <button
            style={{
              width: "83%",
              marginTop: "0px",
              marginBottom: "10px",
              height: "35px",
              marginRight: "30px",
            }}
            // onClick={CreateProduct}
            onClick={selectedid ? updateProduct : CreateProduct}
            type="button"
            class="btn btn-success"
          >
            {selectedid ? "Update Product" : "Add Product"}
          </button>
        </div>
        <h4
          style={{
            color: "black",
            fontWeight: "bold",
            marginTop: "-30px",
            marginBottom: "10px",
            fontSize: "20px",
          }}
        >
          All Products
        </h4>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {allproduct.map((product) => {
            return (
              <div class=" mostpopularproduct animate__animated animate__slideInRight">
                <img src={product2} alt="" />
                <div
                  style={{ marginTop: "15px", fontWeight: "bold" }}
                  className="desc"
                >
                  <h4 style={{ fontWeight: "700" }}>{product.title}</h4>
                  <p>{product.desc}</p>
                </div>
                <p
                  style={{
                    fontSize: "20px",
                    marginTop: "10px",
                    fontWeight: "500",
                  }}
                >
                  Price: <span style={{ color: "red" }}>{product.price}$</span>
                  <br />
                  Discount:{" "}
                  <span style={{ color: "red" }}>
                    {product.appliedDiscount}$
                  </span>
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginLeft: "30px",
                    fontSize: "22px",
                  }}
                >
                  {" "}
                  <i
                    onClick={() => {
                      setselectedid(product._id); // Use setselectedSemesterId here
                      settitle(product.title);
                      setimage(
                        product.Imges && product.Imges.length > 0
                          ? product.Imges[0]
                          : null
                      );
                      setcategoryId(product.categoryId);
                      setprice(product.price);
                      setsize(product.size[0]);
                      setcolor(product.color);
                      setstock(product.stock);
                      setdesc(product.desc);
                      setappliedDiscount(product.appliedDiscount);
                    }}
                    style={{ color: "rgb(2, 145, 64)" }}
                    class="fa-solid fa-pen-to-square update"
                  ></i>
                  <i
                    onClick={() => deleteproduct(product._id)}
                    style={{ color: "red" }}
                    class="fa-solid fa-trash"
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Products;
