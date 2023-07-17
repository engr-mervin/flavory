import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const MainNavigation = function () {
  let tab;

  const router = useRouter();

  if (router.pathname.startsWith("/")) {
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
      <ul className="navigation-list-2">
        <li className="navigation-item-2">
          <Link href="/sign-up">Sign up</Link>
        </li>
        <li className="navigation-item-3">
          <Link href="/log-in">Log in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
