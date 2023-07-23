import { PrismaClient } from "@prisma/client";
import useValidateText from "../custom-hooks/use-validate-text";
import { redirect } from "next/dist/server/api-utils";
const prisma = new PrismaClient();
const SignUpPage = function ({ users }) {
  console.log(users);
  const [
    displayNameValue,
    displayNameChangeHandler,
    displayNameIsError,
    displayNameIsValid,
  ] = useValidateText("");

  const [
    userNameValue,
    userNameChangeHandler,
    userNameIsError,
    userNameIsValid,
  ] = useValidateText("");

  const [
    passwordValue,
    passwordChangeHandler,
    passwordIsError,
    passwordIsValid,
  ] = useValidateText("");

  const [
    password2Value,
    password2ChangeHandler,
    password2IsError,
    password2IsValid,
  ] = useValidateText("");

  const submitHandler = async function (e) {
    e.preventDefault();

    if (
      !userNameIsValid ||
      !password2IsValid ||
      !passwordIsValid ||
      !displayNameIsValid ||
      passwordValue != password2Value
    )
      return;

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

    console.log(response);
    // console.log("Logged in!", data);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label className="signup__label" htmlFor="signup__display-name">
            Display Name:
          </label>
          <input
            onChange={displayNameChangeHandler}
            className={`signup__input ${displayNameIsError ? "invalid" : ""}`}
            value={displayNameValue}
            type="text"
            id="signup__display-name"
            placeholder="At least 6 alphanumeric characters or symbols including - and _"
          ></input>
        </div>
        <div>
          <label className="signup__label" htmlFor="signup__user-name">
            User Name:
          </label>
          <input
            onChange={userNameChangeHandler}
            className={`signup__input ${userNameIsError ? "invalid" : ""}`}
            value={userNameValue}
            type="text"
            id="signup__user-name"
            placeholder="At least 6 alphanumeric characters or symbols including - and _"
          ></input>
        </div>
        <div>
          <label className="signup__label" htmlFor="signup__password">
            Password:
          </label>
          <input
            onChange={passwordChangeHandler}
            className={`signup__input ${passwordIsError ? "invalid" : ""}`}
            value={passwordValue}
            type="text"
            id="signup__password"
            placeholder="At least 6 alphanumeric characters or symbols including - and _"
          ></input>
        </div>
        <div>
          <label className="signup__label" htmlFor="signup__password2">
            Retype Password:
          </label>
          <input
            onChange={password2ChangeHandler}
            className={`signup__input ${password2IsError ? "invalid" : ""}`}
            value={password2Value}
            type="text"
            id="signup__password2"
            placeholder="At least 6 alphanumeric characters or symbols including - and _"
          ></input>
        </div>
        <button>Sign-up!</button>
      </form>
    </div>
  );
};

export default SignUpPage;

export async function getServerSideProps() {
  const dbUsers = await prisma.user.findMany();

  return {
    props: {
      users: dbUsers,
    },
  };
}
