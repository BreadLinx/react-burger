import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import tabWrapperStyles from './tab-wrapper.module.css';

export function TabWrapper() {
    const [current, setCurrent] = React.useState('buns');
    
    return (
        <div className={`mt-5 ${tabWrapperStyles.box}`}>
          <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
    );
}