import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { validateTextLength } from "../util/validate";
import InputText from "../components/UI/InputText";
import AuthContext from "../store/auth-context";
import InfoLogo from "../assets/information-circle-outline.svg";
import InfoMessage from "../components/Fallback Pages/InfoMessage";

const SignUpPage = function ({ users }) {
  const { authState } = useContext(AuthContext);

  const router = useRouter();
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    displayName: "",
    userName: "",
    password: "",
    password2: "",
  });

  const [formDataValidity, setFormDataValidity] = useState({
    displayName: false,
    userName: false,
    password: false,
    password2: false,
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

    touchFunction();
    setMessage("Signing up...");
    if (Object.values(formDataValidity).includes(false)) {
      setMessage("Please fix input errors.");
      return;
    }
    if (formData.password != formData.password2) {
      setMessage("Password does not match");
      return;
    }

    const userData = {
      displayName: formData.displayName,
      userName: formData.userName,
      password: formData.password,
    };

    try {
      const response = await fetch("/api/new-user", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setMessage(data.message);
      if (response.ok) router.push("/log-in");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  };
  if (authState.isAuth) {
    return <InfoMessage message="You are already logged in."></InfoMessage>;
  }

  return (
    <div className="signup">
      <h1 className="signup__title">Sign up New User</h1>
      <form onSubmit={submitHandler} className="signup__form">
        <label className="input__label" htmlFor="signup__display-name">
          Display Name:
        </label>
        <InputText
          validateFunction={validateTextLength(16)}
          id="signup__display-name"
          className="input"
          tooltip="Input a 6-16 Alphanumeric Characters Display Name including -,_ and . characters."
          dataindex={0}
          inputtype="displayName"
          updateStateFunction={updateFormDataState}
          updateValidityField={updateFormDataValidityState}
          touchSubscribe={touchSubscribe}
          touchUnsubscribe={touchUnsubscribe}
        />
        <label className="input__label" htmlFor="signup__user-name">
          User Name:
        </label>
        <InputText
          validateFunction={validateTextLength(16)}
          id="signup__user-name"
          className="input"
          tooltip="Input a 6-16 Alphanumeric Characters User Name including -,_ and . characters."
          dataindex={0}
          inputtype="userName"
          updateStateFunction={updateFormDataState}
          updateValidityField={updateFormDataValidityState}
          touchSubscribe={touchSubscribe}
          touchUnsubscribe={touchUnsubscribe}
        />
        <label className="input__label" htmlFor="signup__password">
          Password:
        </label>
        <InputText
          validateFunction={validateTextLength(16)}
          id="signup__password"
          className="input"
          tooltip="Input a 6-16 Alphanumeric Characters Password including -,_ and . characters."
          dataindex={0}
          inputtype="password"
          updateStateFunction={updateFormDataState}
          updateValidityField={updateFormDataValidityState}
          touchSubscribe={touchSubscribe}
          touchUnsubscribe={touchUnsubscribe}
          type="password"
        />
        <label className="input__label" htmlFor="signup__password2">
          Retype Password:
        </label>
        <InputText
          validateFunction={validateTextLength(16)}
          id="signup__password2"
          className="input"
          tooltip="Input a 6-16 Alphanumeric Characters Password including -,_ and . characters."
          dataindex={0}
          inputtype="password2"
          updateStateFunction={updateFormDataState}
          updateValidityField={updateFormDataValidityState}
          touchSubscribe={touchSubscribe}
          touchUnsubscribe={touchUnsubscribe}
          type="password"
        />
        <div className="signup__status">
          <p className="signup__message">{message}</p>
        </div>
        <button className="signup__submit">Sign-up!</button>
      </form>
    </div>
  );
};

export default SignUpPage;

//TEMPORARY CODE ONLY
