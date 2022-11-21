const headers = {
    'Content-Type': 'application/json'
};

const BASE_API_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
const ORDERS_URL = `${BASE_API_URL}/orders`;
const PASSWORD_FORGOT_URL = `${BASE_API_URL}/password-reset`;
const PASSWORD_RESET_URL = `${BASE_API_URL}/password-reset/reset`;
const REGISTRATION_URL = `${BASE_API_URL}/auth/register`;
const LOGIN_URL = `${BASE_API_URL}/auth/login`;
const REFRESH_URL = `${BASE_API_URL}/auth/token`;
const LOGOUT_URL = `${BASE_API_URL}/auth/logout`;
const USER_DATA_URL = `${BASE_API_URL}/auth/user`;

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res);
}

export function getIngredients() {
    return fetch(INGREDIENTS_URL, {
        headers: headers,
        method: 'GET',
    })
    .then(checkResponse)
}

export function sendOrderRequest(idArray) {
    return fetch(ORDERS_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          "ingredients": idArray
        })
    })
    .then(checkResponse)
}

export function sendForgotPasswordRequest(email) {
    return fetch(PASSWORD_FORGOT_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          "email": email
        })
    })
    .then(checkResponse)
}

export function sendResetPasswordRequest(password, token) {
    return fetch(PASSWORD_RESET_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          "password": password,
          "token": token
        })
    })
    .then(checkResponse)
}

export function sendRegistrationRequest(name, email, password) {
    return fetch(REGISTRATION_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          "name": name,
          "email": email,
          "password": password
        })
    })
    .then(checkResponse)
}

export function sendLoginRequest(email, password) {
    return fetch(LOGIN_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          "email": email,
          "password": password
        })
    })
    .then(checkResponse)
}

export function sendRefreshRequest(refreshToken) {
    return fetch(REFRESH_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          "token": refreshToken
        })
    })
    .then(checkResponse)
}

export function sendLogoutRequest(refreshToken) {
    return fetch(LOGOUT_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          "token": refreshToken
        })
    })
    .then(checkResponse)
}

export function getUserDataRequest(authToken) {
    return fetch(USER_DATA_URL, {
        headers: {
            ...headers,
            authorization: `Bearer ${authToken}`
        },
        method: 'GET'
    })
    .then(checkResponse)
}

export function updateUserDataRequest(authToken) {
    return fetch(USER_DATA_URL, {
        headers: {
            ...headers,
            authorization: `Bearer ${authToken}`
        },
        method: 'PATCH'
    })
    .then(checkResponse)
}