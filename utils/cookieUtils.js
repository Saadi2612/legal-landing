// cookieUtils.js
import Cookies from "js-cookie";

// const TOKEN_COOKIE_KEY = localStorage.getItem("token");

export const setAuthTokenCookie = (token) => {
  Cookies.set("token", token, { expires: 7 });
};

export const getAuthTokenFromCookie = () => {
  return Cookies.get("token");
};

export const removeAuthTokenCookie = () => {
  Cookies.remove("token");
};
