import appStyles from './app.module.css';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppHeader} from '../app-header/app-header.js';
import {BurgerIngredients} from '../burger-ingredients/burger-ingredients.js';
import {BurgerConstructor} from '../burger-constructor/burger-constructor.js';
import {getIngridients} from '../../services/actions/getIngridients-action.js';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function App() {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getIngridients());
    }, []);

    return (
      <>
        <AppHeader/>
        <main className='main'>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </>
    );
}