import * as constants from "../../util/constants";
import React from "react";
import Link from "../UI/Link";

const ProjectInfo = function () {
  return (
    <div className="project-info">
      <p>
        Made with <Link link="https://react.dev/">ReactJS</Link> and{" "}
        <Link link="https://sass-lang.com/">SASS</Link>.
      </p>
    </div>
  );
};

export default ProjectInfo;
