import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";
import { validateTextLength } from "../util/validate";
import InputText from "../components/UI/InputText";
import InfoMessage from "../components/Fallback Pages/InfoMessage";
import Head from "next/head";

const LogInPage = function () {
  const { authState, updateState } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    updateState();
  }, []);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [formDataValidity, setFormDataValidity] = useState({
    userName: false,
    password: false,
  });

  const updateFormDataState = function (value, inputtype) {
    setFormData((prev) => {
      const arrayState = { ...prev };
      arrayState[inputtype] = value;
      return arrayState;
    });
  };

  const updateFormDataValidityState = function (value, inputtype) {
    setFormDataValidity((prev) => {
      const arrayState = { ...prev };
      arrayState[inputtype] = value;
      return arrayState;
    });
  };

  const [touchSubscribers, setTouchSubscribers] = useState([]);

  const touchSubscribe = function (func) {
    setTouchSubscribers((prev) => {
      let newState = [...prev];
      newState.push(func);
      return newState;
    });
  };

  const touchUnsubscribe = function (func) {
    setTouchSubscribers((prev) => {
      let newState = [...prev];
      const index = newState.findIndex((subscriber) => subscriber === func);
      if (index === -1) return prev;
      newState.splice(index, 1);
      return newState;
    });
  };
  const touchFunction = function () {
    touchSubscribers.forEach((func) => {
      func();
    });
  };
  const submitHandler = async function (e) {
    e.preventDefault();
    setDisabled(true);
    touchFunction();
    setMessage("Logging in, please wait...");
    if (Object.values(formDataValidity).includes(false)) {
      setMessage("Please fix input errors.");
      setDisabled(false);
      return;
    }

    try {
      const response = await fetch("/api/log-in", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setDisabled(false);
      setMessage(data.message);
      if (response.ok) {
        updateState();
        localStorage.setItem("sessionId", data.sessionId);
        router.push("/");
      }
    } catch (err) {
      setDisabled(false);
      setMessage("Something went wrong. Please try again.");
    }
  };
  if (authState.isAuth) {
    return <InfoMessage message="You are already logged in."></InfoMessage>;
  }
  return (
    <div className="login">
      <Head>
        <title>Log-in | Flavory</title>
      </Head>
      <h1 className="login__title">Log In</h1>
      <form onSubmit={submitHandler} className="login__form">
        <label className="input__label" htmlFor="login__user-name">
          User Name:
        </label>
        <InputText
          validateFunction={validateTextLength(16)}
          id="login__user-name"
          className="input"
          tooltip="Input a 6-32 Alphanumeric Characters User Name including -,_ and . characters."
          dataindex={0}
          inputtype="userName"
          updateStateFunction={updateFormDataState}
          updateValidityField={updateFormDataValidityState}
          touchSubscribe={touchSubscribe}
          touchUnsubscribe={touchUnsubscribe}
        />
        <label className="input__label" htmlFor="login__password">
          Password:
        </label>
        <InputText
          validateFunction={validateTextLength(16)}
          id="login__password"
          className="input"
          tooltip="Input a 6-32 Alphanumeric Characters Password including -,_ and . characters."
          dataindex={0}
          inputtype="password"
          updateStateFunction={updateFormDataState}
          updateValidityField={updateFormDataValidityState}
          touchSubscribe={touchSubscribe}
          touchUnsubscribe={touchUnsubscribe}
          type="password"
        />
        <div className="login__status">
          <p className="login__message">{message}</p>
        </div>
        <button className="login__submit" disabled={disabled}>{`${
          disabled ? "Logging-in" : "Log in!"
        }`}</button>
      </form>
    </div>
  );
};

export default LogInPage;
