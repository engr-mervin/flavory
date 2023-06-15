import React from "react";
import * as constants from "../../util/constants";

const HeaderTitle = function (props) {
  return <h1 className="heading--1">{constants.APP_TITLE}</h1>;
};

export default HeaderTitle;
