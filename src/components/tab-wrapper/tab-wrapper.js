import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabWrapperStyles from './tab-wrapper.module.css';
import {burgerIngredientsSlice} from '../../services/reducers/burgerIngredientsSlice.js';

export function TabWrapper({inViewBuns, inViewSauces, inViewMains}) {
    const dispatch = useDispatch();
    const {setCurrentTab} = burgerIngredientsSlice.actions;
    const {currentTab} = useSelector(state => state.burgerIngredientsReducer.tabsData);

    function setCurrentTabOnClick(value) {
      const element = document.getElementById(value);
      if(element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    useEffect(() => {
      if(inViewBuns) {
        dispatch(setCurrentTab('buns'));
      } else if(inViewSauces) {
        dispatch(setCurrentTab('sauces'));
      } else if(inViewMains) {
        dispatch(setCurrentTab('mains'));
      }
    }, [inViewBuns, inViewSauces, inViewMains]);

    return (
        <div className={`mt-5 ${tabWrapperStyles.box}`}>
          <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTabOnClick}>
            Булки
          </Tab>
          <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTabOnClick}>
            Соусы
          </Tab>
          <Tab value="mains" active={currentTab === 'mains'} onClick={setCurrentTabOnClick}>
            Начинки
          </Tab>
        </div>
    );
}