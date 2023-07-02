import React from "react";
const Link = function (props) {
  return (
    <a className="link" href={props.link} target="_blank">
      {props.children}
    </a>
  );
};
export default Link;
