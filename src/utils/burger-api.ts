import { IServerResponse } from "types/types";
import { getCookie, setCookie } from "utils/cookies";

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

const BASE_WEBSOCKET_URL = "wss://norma.nomoreparties.space";
export const FEED_URL = `${BASE_WEBSOCKET_URL}/orders/all`;
export const PERSONAL_FEED_URL = `${BASE_WEBSOCKET_URL}/orders`;

async function checkResponse(res: Response): Promise<IServerResponse | never> {
  const response = await res.json();
  return response.success ? response : Promise.reject(response);
}

interface IOptions {
  headers: {
    "Content-Type": string;
    authorization?: string;
  };
  method: string;
  body?: string;
}

async function fetchWithRefresh(url: string, options: IOptions) {
  try {
    return await request(url, options);
  } catch (error: any) {
    if (error.message === "jwt expired") {
      const refreshData = await sendRefreshRequest();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      const authToken = refreshData.authToken.split("Bearer ")[1];
      setCookie("authToken", authToken);
      setCookie("refreshToken", refreshData.refreshToken);

      options.headers.authorization = refreshData.authToken;

      return await request(url, options);
    } else {
      return Promise.reject(error);
    }
  }
}

function request(url: string, options: IOptions) {
  return fetch(url, options).then(checkResponse);
}

function sendRefreshRequest() {
  return request(REFRESH_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
}

export function getIngredients() {
  return request(INGREDIENTS_URL, {
    headers: headers,
    method: "GET",
  });
}

export function sendForgotPasswordRequest(email: string) {
  return request(PASSWORD_FORGOT_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
  });
}

export function sendResetPasswordRequest({
  password,
  code,
}: {
  password: string;
  code: string;
}) {
  return request(PASSWORD_RESET_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  });
}

export function sendRegistrationRequest({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  return request(REGISTRATION_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
}

export function sendLoginRequest({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return request(LOGIN_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export function sendLogoutRequest() {
  return request(LOGOUT_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
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

export function updateUserDataRequest({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
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

export function sendOrderRequest(idArray: string[]) {
  return fetchWithRefresh(ORDERS_URL, {
    headers: {
      ...headers,
      authorization: `Bearer ${getCookie("authToken")}`,
    },
    method: "POST",
    body: JSON.stringify({
      ingredients: idArray,
    }),
  });
}
