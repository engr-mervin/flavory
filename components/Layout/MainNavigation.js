import Link from "next/link";
import { useRouter } from "next/router";
import User from "./User";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = function () {
  let tab;

  const router = useRouter();

  // const [auth, setAuth] = useState(false);

  const { authState, updateState } = useContext(AuthContext);

  const logoutHandler = async function (e) {
    e.preventDefault();

    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) return;
    const response = await fetch("/api/log-out", {
      method: "POST",
      body: JSON.stringify({ sessionId: sessionId }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(await response.json());
    localStorage.removeItem("sessionId");
    updateState();
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

  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className={`navigation-item ${tab === "home" ? "current" : ""}`}>
          <Link href="/">Home</Link>
        </li>
        <li className={`navigation-item ${tab === "recipes" ? "current" : ""}`}>
          <Link href="/recipes">Recipes</Link>
        </li>
        <li className={`navigation-item ${tab === "about" ? "current" : ""}`}>
          <Link href="/about">About</Link>
        </li>
      </ul>
      {authState.isAuth ? (
        <ul className="navigation-list-2">
          <li className="navigation-item-3">
            <Link href="/account">Account</Link>
          </li>
          <li className="navigation-item-3">
            <button className="navigation__logout" onClick={logoutHandler}>
              Log out
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
