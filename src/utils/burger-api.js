import { getCookie, setCookie } from "./cookies.js";

const headers = {
  "Content-Type": "application/json",
};

const BASE_API_URL = "https://norma.nomoreparties.space/api";
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
const ORDERS_URL = `${BASE_API_URL}/orders`;
const PASSWORD_FORGOT_URL = `${BASE_API_URL}/password-reset`;
const PASSWORD_RESET_URL = `${BASE_API_URL}/password-reset/reset`;
const REGISTRATION_URL = `${BASE_API_URL}/auth/register`;
const LOGIN_URL = `${BASE_API_URL}/auth/login`;
const REFRESH_URL = `${BASE_API_URL}/auth/token`;
const LOGOUT_URL = `${BASE_API_URL}/auth/logout`;
const USER_DATA_URL = `${BASE_API_URL}/auth/user`;

async function checkResponse(res) {
  const response = await res.json();
  return response.success ? response : Promise.reject(response);
}

async function fetchWithRefresh(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (error) {
    if (error.message === "jwt expired") {
      const refreshData = await sendRefreshRequest();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      const authToken = refreshData.authToken.split("Bearer ")[1];
      setCookie("authToken", authToken);
      setCookie("refreshToken", refreshData.refreshToken);

      options.headers.authorization = refreshData.authToken;

      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      Promise.reject(error);
    }
  }
}

function sendRefreshRequest() {
  return fetch(REFRESH_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(checkResponse);
}

export function getIngredients() {
  return fetch(INGREDIENTS_URL, {
    headers: headers,
    method: "GET",
  }).then(checkResponse);
}

export function sendOrderRequest(idArray) {
  return fetch(ORDERS_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      ingredients: idArray,
    }),
  }).then(checkResponse);
}

export function sendForgotPasswordRequest(email) {
  return fetch(PASSWORD_FORGOT_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
}

export function sendResetPasswordRequest({ password, code }) {
  return fetch(PASSWORD_RESET_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  }).then(checkResponse);
}

export function sendRegistrationRequest(name, email, password) {
  return fetch(REGISTRATION_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(checkResponse);
}

export function sendLoginRequest(email, password) {
  return fetch(LOGIN_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse);
}

export function sendLogoutRequest() {
  return fetch(LOGOUT_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(checkResponse);
}

export function getUserDataRequest() {
  return fetchWithRefresh(USER_DATA_URL, {
    headers: {
      ...headers,
      authorization: `Bearer ${getCookie("authToken")}`,
    },
    method: "GET",
  });
}

export function updateUserDataRequest({ name, email, password }) {
  return fetchWithRefresh(USER_DATA_URL, {
    headers: {
      ...headers,
      authorization: `Bearer ${getCookie("authToken")}`,
    },
    method: "PATCH",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
}
