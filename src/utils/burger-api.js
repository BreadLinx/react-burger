const BASE_API_URL = 'https://norma.nomoreparties.space/api';
const INGREDIENTS_URL = `${BASE_API_URL}/ingredients`;

function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function getIngredients() {
    return fetch(INGREDIENTS_URL, {
        method: 'GET'
    })
    .then(checkResponse)
}