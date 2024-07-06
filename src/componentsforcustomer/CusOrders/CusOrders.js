import axios from "axios";
import "./CusOrders.css";
import Swal from "sweetalert2";
import p1 from "../../components/Assets/f1.png";
import p2 from "../../components/Assets/f2.png";
import p3 from "../../components/Assets/f3.png";
import p4 from "../../components/Assets/f4.png";
import p5 from "../../components/Assets/f5.png";
import p6 from "../../components/Assets/f6.png";
import w1 from "../../components/Assets/p1.jpg";
import w2 from "../../components/Assets/p2.jpg";
import w3 from "../../components/Assets/b3.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";

function CustomerOrders() {
  const [allproduct, setallproduct] = useState([]);
  const [newcollection, setnewcollection] = useState([]);
  const accessToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  // get all products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/product/getProduct?page=1&size=8",
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mohamed-apis.vercel.app/product/getProduct?page=2&size=8",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );
        console.log(response.data);
        setnewcollection(response.data.result);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  // add to cart
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
  return (
    <>
      <Hero />
      {/* <section id="hero" class="col-12">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all product</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button>Shop now</button>
      </section> */}
      <section id="feature" class="section-p1">
        <div class="fe-box col-lg-2 col-md-6 col-sm-12">
          <img src={p1} alt="" />
          <h6>Free shipping</h6>
        </div>
        <div class="fe-box col-lg-2 col-md-6 col-sm-12">
          <img src={p2} alt="" />
          <h6>Free shipping</h6>
        </div>
        <div class="fe-box col-lg-2 col-md-6 col-sm-12">
          <img src={p3} alt="" />
          <h6>Free shipping</h6>
        </div>
        <div class="fe-box col-lg-2 col-md-6 col-sm-12">
          <img src={p4} alt="" />
          <h6>Free shipping</h6>
        </div>
        <div class="fe-box col-lg-2 col-md-6 col-sm-12">
          <img src={p5} alt="" />
          <h6>Free shipping</h6>
        </div>
        <div class="fe-box col-lg-2 col-md-6 col-sm-12">
          <img src={p6} alt="" />
          <h6>Free shipping</h6>
        </div>
      </section>
      <div className="cusorders">
        <h2>Some Of Our Designers</h2>
        <div className="blogs">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={w1} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={w2} class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src={w3} class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <h2>Most Popular</h2>
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
        <section id="banner" class="section-m1">
          <h4>Repair Service</h4>
          <h2>
            Up to <span>70% off</span>-All Dresses & Accessories
          </h2>
          <button class="normal">Explore More</button>
        </section>
        <h2>New Arrivals</h2>
        <section id="product1" className="section-p1">
          <div className="pro-container">
            {newcollection.map((product) => {
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
        <section id="sm-banner" class="section-p1">
          <div class="banner-box">
            <h4>crazy deals</h4>
            <h2>buy 1 get 1 free</h2>
            <p>The best classic dress is on sale at care</p>
            <button class="white">learn more</button>
          </div>
          <div class="banner-box banner-box2">
            <h4>spring / summer</h4>
            <h2>upcomming season</h2>
            <p>The best classic dress is on sale at care</p>
            <button class="white">collection</button>
          </div>
        </section>

        <section id="banner3">
          <div class="banner-box col-lg-3 col-12">
            <h2>SEASON SALE</h2>
            <h3>Winter Collection -50% OFF</h3>
          </div>
          <div class="banner-box banner-box2 col-lg-3 col-12">
            <h2>NEW FOOTWEAR COLLECTION</h2>
            <h3>spring / summer 2023</h3>
          </div>
          <div class="banner-box banner-box3 col-lg-3 col-12">
            <h2>T-SHIRTS</h2>
            <h3>New Trendy Prints</h3>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
export default CustomerOrders;
