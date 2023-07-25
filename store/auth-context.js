import { createContext, useReducer } from "react";
import { getSessionId, isAuthorized } from "../util/local-storage";

const initialVal = {
  isAuth: false,
  sessionId: "",
};
export const AuthContext = createContext(initialVal);

export default AuthContext;

const authReducer = function (prev, action) {
  if (action.type === "UPDATE") {
    let newState = { isAuth: isAuthorized(), sessionId: getSessionId() };
    return newState;
  }

  if (action.type === "VERIFY") {
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
