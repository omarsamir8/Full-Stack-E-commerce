import React, { useEffect, useState } from "react";
import "./Category.css";
import Swal from "sweetalert2";
import axios from "axios";

function Category() {
  const [name, setname] = useState("");
  const [imgcategory, setimgcategory] = useState("");
  const [allcategorys, setallcategorys] = useState([]);
  const [selectedCategoryId, setselectedCategoryId] = useState("");
  const [count, setcount] = useState(1);
  const [search_category_value, setsearch_category_value] = useState("");
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  // create category
  const CreateCategory = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("imgcategory", imgcategory); // Append the image file

      const response = await fetch(
        "https://mohamed-apis.vercel.app/category/createCategory",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: formData,
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Category Added Successful!",
          text: "You have successfully Creatation Category.",
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Create Category Failed",
          text: errorData.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
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

  // delete category
  const deletecategory = async (categoryid) => {
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
          `https://mohamed-apis.vercel.app/category/deleteCategory?categoryId=${categoryid}`,
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
          setallcategorys((prevCategory) =>
            prevCategory.filter((category) => category._id !== categoryid)
          );
          console.log(`Course with ID ${categoryid} deleted successfully.`);
        } else {
          console.error(`Failed to delete course with ID ${categoryid}.`);
        }
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // update category
  const updateCategory = async () => {
    try {
      const response = await fetch(
        `https://mohamed-apis.vercel.app/category/UpdateCategory?categoryid=${selectedCategoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
          body: JSON.stringify({
            name,
            imgcategory,
          }),
        }
      );

      if (response.ok) {
        // Show SweetAlert on success
        Swal.fire({
          icon: "success",
          title: "Category updated successfully",
          showConfirmButton: false,
          timer: 3500,
        });

        // Update the state with the modified course
        setallcategorys((prevCategory) =>
          prevCategory.map((prevCategory) =>
            prevCategory._id === selectedCategoryId
              ? {
                  ...prevCategory,
                  name,
                  imgcategory,
                }
              : prevCategory
          )
        );

        // Clear the selected course and reset input fields
        selectedCategoryId(null);
        setname("");
        setimgcategory("");
      } else {
        // Show an error message if needed
        Swal.fire({
          icon: "error",
          title: "Fail",
          text: "Category update failed, please try again later",
          timer: 4500,
        });
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // search for category
  // useEffect(() => {
  //   const fetchsearch = async () => {
  //     try {
  //       // if (searchvalue.trim() !== "") {
  //       const response = await axios.get(
  //         `https://ecommerce-alpha-ivory.vercel.app/category/searchCategory?page=${count}&size=15&searchKey=${search_category_value}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "refresh-token": refreshToken,
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //       const data = response.data;
  //       setallcategorys(data.results);
  //       // Here you can update the state related to the search or perform any other actions with the data
  //     } catch (error) {
  //       // }
  //       console.error("Error fetching search results:", error);
  //     }
  //   };
  //   fetchsearch();
  //   const handleKeyPress = (e) => {
  //     if (e.key === "Enter") {
  //       fetchsearch();
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  // }, [accessToken, refreshToken, search_category_value]);
  return (
    <>
      <div className="categorys">
        <h4
          style={{
            color: "black",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "10px",
            fontSize: "20px",
          }}
        >
          Category
        </h4>{" "}
        <div
          style={{ width: "1090px" }}
          className="category-search animate__animated animate__fadeInDown"
        >
          <div className="seachforcategory">
            <h4>Search For Category</h4>
            <input
              style={{ borderColor: "gray" }}
              className="form-control form-control-sm"
              type="text"
              placeholder="Search"
              aria-label=".form-control-sm example"
              onChange={(e) => {
                setsearch_category_value(e.target.value);
              }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            height: "70px",
            display: "flex",
            gap: "10px",
            width: "1090px",
          }}
          className="addcategory category-search animate__animated animate__fadeInDown"
        >
          <input
            style={{ width: "40%", marginLeft: "10px", height: "40px" }}
            className="form-control form-control-sm"
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="Category Name"
            aria-label=".form-control-sm example"
          />
          <input
            style={{ width: "40%", marginLeft: "10px", height: "40px" }}
            className="form-control form-control-sm"
            type="file"
            name="imgcategory"
            onChange={(e) => {
              setimgcategory(e.target.files[0]); // Update state with file object
            }}
            placeholder="Category Name"
            aria-label=".form-control-sm example"
          />
          <button
            style={{ width: "200px", height: "40px", marginRight: "30px" }}
            type="button"
            // onClick={CreateCategory}
            onClick={selectedCategoryId ? updateCategory : CreateCategory}
            className="btn btn-success"
          >
            {selectedCategoryId ? "Update Category" : "Add Category"}
          </button>
        </div>
        <h4
          style={{
            color: "black",
            fontWeight: "bold",
            marginTop: "5px",
            marginBottom: "10px",
            fontSize: "20px",
          }}
        >
          All Categorys
        </h4>
        <div className="allcategory animate__animated animate__slideInRight">
          {allcategorys.map((category) => {
            return (
              <div
                className="item "
                style={{
                  width: "201.5px",
                  height: "80px",
                  background: "rgb(238, 235, 235)",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                {" "}
                <h4>{category.name}</h4>
                <div>
                  {" "}
                  <i
                    onClick={() => {
                      setselectedCategoryId(category._id); // Use setselectedSemesterId here
                      // Set the values of the selected semester to the input fields
                      setname(category.name);
                      setimgcategory(category.imgcategory);
                    }}
                    style={{ color: "rgb(2, 145, 64)" }}
                    class="fa-solid fa-pen-to-square update"
                  ></i>
                  <i
                    onClick={() => deletecategory(category._id)}
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

export default Category;
