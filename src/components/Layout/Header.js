import React from "react";
import * as constants from "../../util/constants";
import ProjectInfo from "../Reusable/ProjectInfo";

const Header = function (props) {
  return (
    <div className="header">
      <div className="header-box">
        <h1 className="heading--1">{constants.APP_TITLE}</h1>
        <p>{constants.APP_SLOGAN}</p>
        <ProjectInfo></ProjectInfo>
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
