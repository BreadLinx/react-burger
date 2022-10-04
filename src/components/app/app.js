import appStyles from './app.module.css';
import React from 'react';
import {AppHeader} from '../app-header/app-header.js';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.js';
import {BurgerConstructor} from '../burger-constructor/burger-constructor.js';
import {Modal} from '../modal/modal.js';
import {getIngredients} from '../../utils/burger-api.js';

export function App() {
    const [data, setData] = React.useState([]);
    const [isIngredientModalOpened, setIsIngredientModalOpened] = React.useState(false);
    const [isOrderModalOpened, setIsOrderModalOpened] = React.useState(false);
    const [ingredientDetailsData, setIngredientDetailsData] = React.useState({});

    function closePopup() {
      setIsIngredientModalOpened(false);
      setIsOrderModalOpened(false);
    }

    React.useEffect(() => {
        getIngredients()
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => {
            alert(`Произошла ошибка при выполнении запроса. ${err}`);
        });
    }, []);

    return (
      <>
        <AppHeader/>
        <main className='main'>
          <BurgerIngredients data={data} popupEditFunctions={{setIsIngredientModalOpened, closePopup, setIngredientDetailsData}} states={{isIngredientModalOpened, ingredientDetailsData}} />
          <BurgerConstructor data={data} popupEditFunctions={{setIsOrderModalOpened, closePopup}} states={{isOrderModalOpened}} />
        </main>
      </>
    );
}