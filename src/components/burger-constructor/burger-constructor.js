import burgerConstructorStyles from './burger-constructor.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import image from '../../images/bun-01.svg';
import PropTypes from 'prop-types';
import {ingridientPropTypes} from '../../utils/prop-types.js';
import {Modal} from '../modal/modal.js';
import {OrderDetails} from '../order-details/order-details.js';

export function BurgerConstructor({data, popupEditFunctions, states}) {
    return (
      <section className={`${burgerConstructorStyles.section}`}>
        <div className={`mt-25 pl-4 ${burgerConstructorStyles.constructorBox}`}>
          <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={image}/>
          <ul className={`${burgerConstructorStyles.fillingBox}`}>
            <li className={`${burgerConstructorStyles.fillingBoxItem}`}><DragIcon type="primary" /><ConstructorElement text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/></li>
            <li className={`${burgerConstructorStyles.fillingBoxItem}`}><DragIcon type="primary" /><ConstructorElement text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/></li>
            <li className={`${burgerConstructorStyles.fillingBoxItem}`}><DragIcon type="primary" /><ConstructorElement text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/></li>
            <li className={`${burgerConstructorStyles.fillingBoxItem}`}><DragIcon type="primary" /><ConstructorElement text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/></li>  
          </ul>
          <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={image}/>
        </div>
        <div className={`${burgerConstructorStyles.total}`}>
          <span className={`text text_type_digits-medium ${burgerConstructorStyles.totalCounter}`}>610<CurrencyIcon type="primary" /></span>
          <Button onClick={() => {popupEditFunctions.setIsOrderModalOpened(true)}} type="primary" size="large" htmlType='button'>Нажми на меня</Button>
        </div>
        {
          states.isOrderModalOpened &&
          <Modal closePopup={popupEditFunctions.closePopup}>
            <OrderDetails/>
          </Modal>
        }
      </section>
    );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingridientPropTypes).isRequired,
  popupEditFunctions: PropTypes.shape({
    setIsOrderModalOpened: PropTypes.func,
    closePopup: PropTypes.func
  }).isRequired
}; 