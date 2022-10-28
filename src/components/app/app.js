import appStyles from './app.module.css';
import React from 'react';
import {AppHeader} from '../app-header/app-header.js';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.js';
import {BurgerConstructor} from '../burger-constructor/burger-constructor.js';
import {getIngredients} from '../../utils/burger-api.js';
import {DataContext} from '../../services/dataContex.js';

export function App() {
    const dataSet = React.useState([]);
    const [data, setData] = dataSet;

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
          <BurgerIngredients data={data} />
          <DataContext.Provider value={dataSet}>
            <BurgerConstructor />
          </DataContext.Provider>
        </main>
      </>
    );
}