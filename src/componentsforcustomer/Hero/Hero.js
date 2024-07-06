import React from "react";
import "./Hero.css";
import hand_icon from "../../components/Assets/hand_icon.png";
import arrow_icon from "../../components/Assets/arrow.png";
import hero_image from "../../components/Assets/hero_image.png";

function Hero() {
  return (
    <>
      <div
        style={{ marginTop: "-10px", borderRadius: "10px", width: "99.5%" }}
        className="hero"
      >
        <div className="hero-left">
          <h2>NEEW ARRIVALS ONLY</h2>
          <div>
            <div className="hero-hand-icon">
              <p>New</p>
              <img src={hand_icon} alt="loading hand icon" />
            </div>
            <p className="collection">Collections</p>
            <p className="evryone">For Everyone</p>
          </div>
          <div className="hero-latest-btn">
            <div>Lastest Collections</div>
            <img src={arrow_icon} alt=" loading arrow icon " />
          </div>
        </div>
        <div className="hero-right">
          <img src={hero_image} alt="loading hero img" />
        </div>
      </div>
    </>
  );
}
export default Hero;
