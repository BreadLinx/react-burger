import BurgerConstructorStyles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import image from '../../images/bun-01.svg';
import PropTypes from 'prop-types';

export function BurgerConstructor({data, popupEditFunctions}) {
    return (
      <section className={`${BurgerConstructorStyles.section}`}>
        <div className={`mt-25 pl-4 ${BurgerConstructorStyles.constructorBox}`}>
          <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={image}/>
          <ul className={`${BurgerConstructorStyles.fillingBox}`}>
            <li className={`${BurgerConstructorStyles.fillingBoxItem}`}><button className={BurgerConstructorStyles.fillingBoxDrugButton}><DragIcon type="primary" /></button><ConstructorElement text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/></li>
            <li className={`${BurgerConstructorStyles.fillingBoxItem}`}><button className={BurgerConstructorStyles.fillingBoxDrugButton}><DragIcon type="primary" /></button><ConstructorElement text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/></li>
            <li className={`${BurgerConstructorStyles.fillingBoxItem}`}><button className={BurgerConstructorStyles.fillingBoxDrugButton}><DragIcon type="primary" /></button><ConstructorElement text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/></li>
            <li className={`${BurgerConstructorStyles.fillingBoxItem}`}><button className={BurgerConstructorStyles.fillingBoxDrugButton}><DragIcon type="primary" /></button><ConstructorElement text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/></li>  
          </ul>
          <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/>
        </div>
        <div className={`${BurgerConstructorStyles.total}`}>
          <span className={`text text_type_digits-medium ${BurgerConstructorStyles.totalCounter}`}>610<CurrencyIcon type="primary" /></span>
          <Button onClick={() => {
            popupEditFunctions.setModalOpened(true);
            popupEditFunctions.setpopupType('order');
          }} type="primary" size="large" htmlType='button'>Нажми на меня</Button>
        </div>
      </section>
    );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  popupEditFunctions: PropTypes.objectOf(PropTypes.func).isRequired
}; 