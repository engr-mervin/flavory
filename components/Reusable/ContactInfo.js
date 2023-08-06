import ContactLogoLI from "../../assets/logo-linkedin.svg";
import ContactLogoGH from "../../assets/logo-github.svg";

import * as constants from "../../util/constants";

const ContactInfo = function () {
  return (
    <ul className="contact-info">
      <li className="contact-item">
        <a
          href={constants.URL_LI}
          target="_blank"
          title="Author's LinkedIn Profile"
        >
          <ContactLogoLI className="contact-logo" />
        </a>
      </li>
      <li className="contact-item">
        <a
          href={constants.URL_GH}
          target="_blank"
          title="Author's Github Profile"
        >
          <ContactLogoGH className="contact-logo" />
        </a>
      </li>
    </ul>
  );
};

export default ContactInfo;
