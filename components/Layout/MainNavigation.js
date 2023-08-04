import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import UserDataContext from "../../store/user-data-context";

const MainNavigation = function () {
  let tab;

  const router = useRouter();

  const { authState, updateState } = useContext(AuthContext);
  const { userData, clearData } = useContext(UserDataContext);

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
    router.push("/");
  };
  if (router.pathname === "/") {
    tab = "home";
  }
  if (router.pathname.startsWith("/recipes")) {
    tab = "recipes";
  }
  if (router.pathname.startsWith("/about")) {
    tab = "about";
  }
  if (router.pathname.startsWith("/account")) {
    tab = "account";
  }
  if (router.pathname.startsWith("/new-recipe")) {
    tab = "new-recipe";
  }

  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className={`navigation-item ${tab === "home" ? "current" : ""}`}>
          <Link href="/">Home</Link>
        </li>
        <li className={`navigation-item ${tab === "recipes" ? "current" : ""}`}>
          <Link href="/recipes">Recipes</Link>
        </li>
        {/* <li className={`navigation-item ${tab === "about" ? "current" : ""}`}>
          <Link href="/about">About</Link>
        </li> */}
        {authState.isAuth ? (
          <li
            className={`navigation-item ${
              tab === "new-recipe" ? "current" : ""
            }`}
          >
            <Link href="/new-recipe">New Recipe</Link>
          </li>
        ) : (
          ""
        )}
      </ul>
      {authState.isAuth ? (
        <ul className="navigation-list-2">
          <li
            className={`navigation-item ${tab === "account" ? "current" : ""}`}
          >
            <Link href="/account">{userData.displayName}</Link>
          </li>
          <li className="navigation-item-3">
            <button
              className="navigation__logout"
              onClick={logoutHandler}
              disabled={loggingOut ? true : false}
            >
              {loggingOut ? "Please wait..." : "Log out"}
            </button>
          </li>
        </ul>
      ) : (
        <ul className="navigation-list-2">
          <li className="navigation-item-2">
            <Link href="/sign-up">Sign up</Link>
          </li>
          <li className="navigation-item-3">
            <Link href="/log-in">Log in</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default MainNavigation;
