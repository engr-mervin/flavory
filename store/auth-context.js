import { createContext, useReducer } from "react";
import { isAuthorized } from "../util/local-storage";

const initialVal = {
  isAuth: false,
  sessionId: "",
};
export const AuthContext = createContext(initialVal);

export default AuthContext;

const authReducer = function (prev, action) {
  if (action.type === "UPDATE") {
    let newState = { ...prev, isAuth: isAuthorized() };
    return newState;
  }
};

export const AuthContextProvider = function ({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, initialVal);

  const updateState = function () {
    authDispatch({ type: "UPDATE" });
  };

  const authContextObject = { authState, updateState };

  return (
    <AuthContext.Provider value={authContextObject}>
      {children}
    </AuthContext.Provider>
  );
};
