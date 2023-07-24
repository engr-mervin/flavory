export const isAuthorized = function () {
  if (typeof window === "undefined") {
    return false;
  }
  const result = localStorage.getItem("sessionId");

  if (result) {
    return true;
  }
  return false;
};

export const getSessionId = function () {
  if (isAuthorized()) {
    return localStorage.getItem("sessionId");
  }

  return "";
};
