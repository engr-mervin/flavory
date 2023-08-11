import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import UserDataContext from "../../store/user-data-context";
import AuthContext from "../../store/auth-context";
import { useRouter } from "next/router";

const Hamburger = function ({ authState }) {
  const [active, setActive] = useState(false);
  const [documentObj, setDocumentObj] = useState(null);
  const router = useRouter();
  const { updateState } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const logoutHandler = async function (e) {
    e.preventDefault();

    setLoggingOut(true);
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      setLoggingOut(false);
      return;
    }
    await fetch("/api/log-out", {
      method: "POST",
      body: JSON.stringify({ sessionId: sessionId }),
      headers: { "Content-Type": "application/json" },
    });

    localStorage.removeItem("sessionId");
    updateState();
    clearData();
    setLoggingOut(false);
    setActive(false);
    router.push("/");
  };
  const { userData, clearData } = useContext(UserDataContext);

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

  const linkClickHandler = function (path) {
    return (e) => {
      router.push(path);
      setActive(false);
    };
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
                        <button
                          className="hamburger-button"
                          onClick={linkClickHandler("/")}
                        >
                          Home
                        </button>
                      </li>
                      <li className="hamburger-menu-item">
                        <button
                          className="hamburger-button"
                          onClick={linkClickHandler("/recipes")}
                        >
                          Recipes
                        </button>
                      </li>
                      <li className="hamburger-menu-item">
                        <button
                          className="hamburger-button"
                          onClick={linkClickHandler("/new-recipe")}
                        >
                          New Recipe
                        </button>
                      </li>
                      <li className="hamburger-menu-item">
                        <button
                          className="hamburger-button"
                          onClick={linkClickHandler("/account")}
                        >
                          {userData.displayName}
                        </button>
                      </li>
                      <li className="hamburger-menu-item">
                        <button
                          className="hamburger-button"
                          onClick={logoutHandler}
                        >
                          {loggingOut ? "Please wait..." : "Log out"}
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <ul className="hamburger-menu-list">
                      <li className="hamburger-menu-item">
                        <button
                          className="hamburger-button"
                          onClick={linkClickHandler("/")}
                        >
                          Home
                        </button>
                      </li>
                      <li className="hamburger-menu-item">
                        <button
                          className="hamburger-button"
                          onClick={linkClickHandler("/recipes")}
                        >
                          Recipes
                        </button>
                      </li>
                      <li className="hamburger-menu-item">
                        <button
                          className="hamburger-button"
                          onClick={linkClickHandler("/sign-up")}
                        >
                          Sign Up
                        </button>
                      </li>
                      <li className="hamburger-menu-item">
                        <button
                          className="hamburger-button"
                          onClick={linkClickHandler("/log-in")}
                        >
                          Log In
                        </button>
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
