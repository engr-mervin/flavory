import { PrismaClient } from "@prisma/client";
import useValidateText from "../custom-hooks/use-validate-text";
import { useState } from "react";
import { useRouter } from "next/router";

const SignUpPage = function ({ users }) {
  const router = useRouter();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [message, setMessage] = useState("");
  const [
    displayNameValue,
    displayNameChangeHandler,
    displayNameIsError,
    displayNameIsValid,
  ] = useValidateText("", 32);

  const [
    userNameValue,
    userNameChangeHandler,
    userNameIsError,
    userNameIsValid,
  ] = useValidateText("", 16);

  const [
    passwordValue,
    passwordChangeHandler,
    passwordIsError,
    passwordIsValid,
  ] = useValidateText("", 16);

  const [
    password2Value,
    password2ChangeHandler,
    password2IsError,
    password2IsValid,
  ] = useValidateText("", 16);

  const submitHandler = async function (e) {
    e.preventDefault();

    setIsSigningUp(true);
    if (
      !userNameIsValid ||
      !password2IsValid ||
      !passwordIsValid ||
      !displayNameIsValid ||
      passwordValue != password2Value
    ) {
      setMessage("Please fix input errors.");
      setIsSigningUp(false);
      return;
    }

    const userData = {
      displayName: displayNameValue,
      userName: userNameValue,
      password: passwordValue,
    };
    const response = await fetch("/api/new-user", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    // console.log("Logged in!", data);
    const data = await response.json();
    setMessage(data.message);

    setIsSigningUp(false);
    if (response.ok) router.push("/log-in");
  };
  return (
    <div className="signup">
      <h1 className="heading--1e">Sign up New User</h1>
      <form onSubmit={submitHandler} className="signup__form">
        <label className="signup__label" htmlFor="signup__display-name">
          Display Name:
        </label>
        <input
          onChange={displayNameChangeHandler}
          className={`signup__input ${displayNameIsError ? "invalid" : ""}`}
          value={displayNameValue}
          type="text"
          id="signup__display-name"
          placeholder="6-32 (a-Z)(0-9)(-_)"
        ></input>
        <label className="signup__label" htmlFor="signup__user-name">
          User Name:
        </label>
        <input
          onChange={userNameChangeHandler}
          className={`signup__input ${userNameIsError ? "invalid" : ""}`}
          value={userNameValue}
          type="text"
          id="signup__user-name"
          placeholder="6-16 (a-Z)(0-9)(-_)"
        ></input>
        <label className="signup__label" htmlFor="signup__password">
          Password:
        </label>
        <input
          onChange={passwordChangeHandler}
          className={`signup__input ${passwordIsError ? "invalid" : ""}`}
          value={passwordValue}
          type="text"
          id="signup__password"
          placeholder="6-16 (a-Z)(0-9)(-_)"
        ></input>
        <label className="signup__label" htmlFor="signup__password2">
          Retype Password:
        </label>
        <input
          onChange={password2ChangeHandler}
          className={`signup__input ${password2IsError ? "invalid" : ""}`}
          value={password2Value}
          type="text"
          id="signup__password2"
          placeholder="6-16 (a-Z)(0-9)(-_)"
        ></input>
        <div className="signup__status">
          {isSigningUp ? (
            <p className="signup__text">Registering user...</p>
          ) : (
            <p className="signup__message">{message}</p>
          )}
        </div>
        <button className="signup__submit">Sign-up!</button>
      </form>
    </div>
  );
};

export default SignUpPage;

//TEMPORARY CODE ONLY
