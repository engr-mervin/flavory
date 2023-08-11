import GoogleLogo from "../../assets/svg ion/logo-google.svg";
import PersonLogo from "../../assets/svg ion/logo-person.svg";
import PhoneLogo from "../../assets/svg ion/logo-phone.svg";
import LinkedInLogo from "../../assets/logo-linkedin.svg";
import GithubLogo from "../../assets/logo-github.svg";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
const Footer = function () {
  const { authState } = useContext(AuthContext);
  return (
    <footer className="footer">
      <div className="footer-flavory">
        <h2 className="footer-flavory-title">Flavory</h2>
        <p className="footer-flavory-text">Where taste meets imagination.</p>
        {/* <h3 className="heading--3b">Contact me</h3> */}
      </div>
      <div className="footer-about">
        <h3 className="footer-title">About</h3>
        <p className="footer-text">
          This website has been developed as a means to present and exhibit my
          professional portfolio. The website features a user-friendly
          interface, intuitive navigation, and seamless integration of
          multimedia elements to effectively communicate my abilities and
          experiences to potential clients, employers, or collaborators.
        </p>
        <p className="footer-text-2">
          This website showcases my professional portfolio with a user-friendly
          interface, intuitive navigation, and seamless multimedia integration
          to effectively communicate my abilities and experiences to potential
          clients.
        </p>
      </div>

      <nav className="footer-navigate">
        <h3 className="footer-title">Navigation</h3>
        <ul className="footer-navigate-list">
          <li className="footer-navigate-item">
            <Link href="/">Home</Link>
          </li>
          <li className="footer-navigate-item">
            <Link href="/recipes">Recipes</Link>
          </li>
          {/* <li className="footer-navigate-item">
            <Link href="/about">About</Link>
          </li> */}
          {authState.isAuth ? (
            ""
          ) : (
            <li className="footer-navigate-item">
              <Link href="/sign-up">Sign up</Link>
            </li>
          )}
          {authState.isAuth ? (
            ""
          ) : (
            <li className="footer-navigate-item">
              <Link href="/sign-up">Log in</Link>
            </li>
          )}
          {authState.isAuth ? (
            <li className="footer-navigate-item">
              <Link href="/account">Account</Link>
            </li>
          ) : (
            ""
          )}
          {authState.isAuth ? (
            <li className="footer-navigate-item">
              <Link href="/new-recipe">New Recipe</Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
      <div className="footer-line"></div>

      <address className="footer-address">
        <a
          className="footer-link"
          target="_blank"
          href="mailto:johnmervin.bocatcat@gmail.com"
          title="Author's email"
        >
          <GoogleLogo className="footer-logo" />
        </a>
        <a
          className="footer-link"
          target="_blank"
          href="https://www.linkedin.com/in/engr-mervin/"
          title="Author's LinkedIn Profile"
        >
          <LinkedInLogo className="footer-logo" />
        </a>
        <a
          className="footer-link"
          target="_blank"
          href="https://github.com/engr-mervin"
          title="Author's Github Profile"
        >
          <GithubLogo className="footer-logo" />
        </a>
        <a
          className="footer-link"
          target="_blank"
          href="https://www.eonox.dev"
          title="Author's Website"
        >
          <PersonLogo className="footer-logo" />
        </a>
        <a
          className="footer-link"
          target="_blank"
          href="tel:+639994279387"
          title="Author's Phone Number"
        >
          <PhoneLogo className="footer-logo" />
        </a>
      </address>
      <div className="footer-copyright">
        Copyright &copy;{" "}
        <a
          target="_blank"
          href="https://www.eonox.dev"
          className="footer-link-2"
          title="Author's Website"
        >
          eonox.dev
        </a>{" "}
        &mdash; 2023.
      </div>
    </footer>
  );
};

export default Footer;
