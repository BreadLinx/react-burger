import appStyles from './app.module.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {AppHeader} from '../app-header/app-header.js';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.js';
import {BurgerConstructor} from '../burger-constructor/burger-constructor.js';
import {Modal} from '../modal/modal.js';

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

export function App() {
    const [data, setData] = React.useState([]);
    const [modalOpened, setModalOpened] = React.useState(false);
    const [popupType, setpopupType] = React.useState('order');
    const [ingredientDetailsData, setIngredientDetailsData] = React.useState({});

    React.useEffect(() => {
        fetch(dataUrl, {
            method: 'GET'
        })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);
        })
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
      <>
        <AppHeader/>
        <main className='main'>
          <BurgerIngredients data={data} popupEditFunctions={{setModalOpened, setpopupType, setIngredientDetailsData}} />
          <BurgerConstructor data={data} popupEditFunctions={{setModalOpened, setpopupType}} />
        </main>
        <Modal type={popupType} opened={modalOpened} ingredientDetails={ingredientDetailsData} setModalOpened={setModalOpened} />
      </>
    );
}