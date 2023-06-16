import { ReactComponent as ContactLogoLI } from "../../assets/logo-linkedin.svg";
import { ReactComponent as ContactLogoGH } from "../../assets/logo-github.svg";
import * as constants from "../../util/constants";

const ContactInfo = function () {
  return (
    <ul className="contact-info">
      <li className="contact-item">
        <a href={constants.URL_LI} target="_blank">
          <ContactLogoLI className="contact-logo" />
        </a>
      </li>
      <li className="contact-item">
        <a href={constants.URL_GH} target="_blank">
          <ContactLogoGH className="contact-logo" />
        </a>
      </li>
    </ul>
  );
};

export default ContactInfo;
