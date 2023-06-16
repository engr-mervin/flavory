import React from "react";
import { ReactComponent as FoodLogoRice } from "../../assets/food-rice.svg";
import { ReactComponent as FoodLogoBurger } from "../../assets/food-burger.svg";
import { ReactComponent as FoodLogoFries } from "../../assets/food-fries.svg";
import { ReactComponent as FoodLogoPasta } from "../../assets/food-pasta.svg";
import { ReactComponent as FoodLogoDessert } from "../../assets/food-cupcake.svg";
import Tab from "../UI/Tab.js";

const Navigation = function (props) {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <Tab className="navigation-item active">
          <FoodLogoRice className="navigation-logo"></FoodLogoRice>
          <span>Rice Meals</span>
        </Tab>
        <Tab className="navigation-item">
          <FoodLogoBurger className="navigation-logo"></FoodLogoBurger>
          <span>Burger</span>
        </Tab>
        <Tab className="navigation-item">
          <FoodLogoFries className="navigation-logo"></FoodLogoFries>
          <span>Fries</span>
        </Tab>
        <Tab className="navigation-item">
          <FoodLogoPasta className="navigation-logo"></FoodLogoPasta>
          <span>Pasta</span>
        </Tab>
        <Tab className="navigation-item">
          <FoodLogoDessert className="navigation-logo"></FoodLogoDessert>
          <span>Dessert</span>
        </Tab>
      </ul>
    </nav>
  );
};

export default Navigation;
