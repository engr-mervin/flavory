import React from "react";
import ContactInfo from "../Reusable/ContactInfo";
import * as constants from "../../util/constants";
import ProjectInfo from "../Reusable/ProjectInfo";

const Header = function (props) {
  return (
    <header className="header">
      <div className="header-box">
        <h1 className="heading--1">{constants.APP_TITLE}</h1>
        <p>{constants.APP_SLOGAN}</p>
      </div>
      {/* <div className="header-info-box">
        <ContactInfo></ContactInfo>
        <ProjectInfo></ProjectInfo>
      </div> */}
    </header>
  );
};

export default Header;
