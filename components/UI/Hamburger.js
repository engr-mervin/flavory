import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Hamburger = function ({ authState }) {
  const [active, setActive] = useState(false);
  const [documentObj, setDocumentObj] = useState(null);
  const openMenuHandler = function (e) {
    e.preventDefault();

    setActive(true);
  };

  useEffect(() => {
    setDocumentObj(document);
  }, []);
  const closeMenuHandler = function (e) {
    e.preventDefault();
    if (
      e.target.classList.contains("hamburger-close") ||
      e.target.classList.contains("hamburger-overlay") ||
      e.target.classList.contains("hamburger-line2") ||
      e.target.classList.contains("hamburger-link")
    ) {
      setActive(false);
    }
  };

  return (
    <>
      <div className="hamburger">
        <button className="hamburger-open" onClick={openMenuHandler}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>

        {documentObj
          ? createPortal(
              <div
                onClick={closeMenuHandler}
                className={`hamburger-overlay ${active ? "active" : ""}`}
              >
                <nav className={`hamburger-menu ${active ? "active" : ""}`}>
                  <button
                    className="hamburger-close"
                    onClick={closeMenuHandler}
                  >
                    <div className="hamburger-line2"></div>
                    <div className="hamburger-line2"></div>
                  </button>
                  {authState ? (
                    <ul className="hamburger-menu-list-2">
                      <li className="hamburger-menu-item">
                        <Link className="hamburger-link" href="/">
                          Home
                        </Link>
                      </li>
                      <li className="hamburger-menu-item">
                        <Link className="hamburger-link" href="/recipes">
                          Recipes
                        </Link>
                      </li>
                      <li className="hamburger-menu-item">
                        <Link className="hamburger-link" href="/new-recipe">
                          New Recipe
                        </Link>
                      </li>
                      <li className="hamburger-menu-item">
                        <Link className="hamburger-link" href="/account">
                          Account
                        </Link>
                      </li>
                      <li className="hamburger-menu-item">
                        <Link className="hamburger-link" href="/">
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className="hamburger-menu-list">
                      <li className="hamburger-menu-item">
                        <Link className="hamburger-link" href="/">
                          Home
                        </Link>
                      </li>
                      <li className="hamburger-menu-item">
                        <Link className="hamburger-link" href="/recipes">
                          Recipes
                        </Link>
                      </li>
                      <li className="hamburger-menu-item">
                        <Link className="hamburger-link" href="/sign-up">
                          Sign Up
                        </Link>
                      </li>
                      <li className="hamburger-menu-item">
                        <Link className="hamburger-link" href="/log-in">
                          Log In
                        </Link>
                      </li>
                    </ul>
                  )}
                </nav>
              </div>,
              document.getElementById("menu-root")
            )
          : ""}
      </div>
    </>
  );
};

export default Hamburger;
