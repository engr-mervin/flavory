import React from "react";
import HeaderTitle from "./HeaderTitle.js";
import ButtonIcon from "../UI/ButtonIcon.js";
import { ReactComponent as IconCart } from "../../assets/cart-outline.svg";

const Header = function (props) {
  return (
    <div className="header">
      <div className="header-box">
        <HeaderTitle></HeaderTitle>
        <p>Food at your doorstep.</p>
      </div>
    </div>
  );
};

export default Header;

{
  /* <ButtonIcon className="button--action">
        <IconCart className="icon"></IconCart>
      </ButtonIcon> */
}
