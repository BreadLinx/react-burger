const headers = {
    'Content-Type': 'application/json'
};

const BASE_API_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;
const ORDERS_URL = `${BASE_API_URL}/orders`;

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);
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