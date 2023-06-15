import React from "react";
import headerImage from "../../assets/header-image.jpg";

const HeaderImage = function (props) {
  return (
    <div className="header-image-box">
      <img src={headerImage} alt="A table full of delicious food"></img>
    </div>
  );
};

export default HeaderImage;
