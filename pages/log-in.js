import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { isAuthorized } from "../util/local-storage";
import AuthContext from "../store/auth-context";

const LogInPage = function () {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const { authState, updateState } = useContext(AuthContext);

  useEffect(() => {
    updateState();
  }, []);

  const onChangeUserName = function (e) {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const onChangePassword = function (e) {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const submitHandler = async function (e) {
    e.preventDefault();
    setIsLoggingIn(true);
    setMessage("Logging in, please wait...");
    const userData = { userName, password };

    const response = await fetch("/api/log-in", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    setMessage(data.message);
    if (response.ok) {
      updateState();
      localStorage.setItem("sessionId", data.sessionId);
      router.push("/");
    }
    // if (response.ok) router.push("/");
  };
  return (
    <div className="login">
      {authState.isAuth ? (
        <p>You are already logged in.</p>
      ) : (
        <>
          <h1 className="heading--1e">Log In</h1>
          <form onSubmit={submitHandler} className="login__form">
            <label className="login__label" htmlFor="login__user-name">
              User Name:
            </label>
            <input
              className={`login__input`}
              onChange={onChangeUserName}
              type="text"
              id="login__user-name"
            ></input>
            <label className="login__label" htmlFor="login__password">
              Password:
            </label>
            <input
              className={`login__input`}
              onChange={onChangePassword}
              type="text"
              id="login__password"
            ></input>
            <div className="signup__status">
              <p className="signup__message">{message}</p>
            </div>
            <button className="login__submit">Log in!</button>
          </form>
        </>
      )}
    </div>
  );
};

export default LogInPage;
