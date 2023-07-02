import Link from "next/link";

const MainNavigation = function () {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className="navigation-item">
          <Link href="/">Home</Link>
        </li>
        <li className="navigation-item">
          <Link href="/recipes">Recipes</Link>
        </li>
        <li className="navigation-item">
          <Link href="/about">About</Link>
        </li>
      </ul>
      <ul className="navigation-list-2">
        <li className="navigation-item-2">
          <Link href="/sign-up">Sign up</Link>
        </li>
        <li className="navigation-item-2">
          <Link href="/log-in">Log in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
