import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import burgerConstructorStyles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import {Modal} from '../modal/modal.js';
import {Counter} from '../counter/counter.js';
import {OrderDetails} from '../order-details/order-details.js';
import {orderDetailsSlice} from '../../services/reducers/order-details-slice.js';
import {sendOrder} from '../../services/actions/async-actions.js';
import {useDrop} from 'react-dnd';
import {burgerConstructorSlice} from '../../services/reducers/burger-constructor-slice.js';
import {burgerIngredientsSlice} from '../../services/reducers/burgerIngredientsSlice.js';

export function BurgerConstructor() {
    const dispatch = useDispatch();
    const {isOrderPopupOpened} = useSelector(state => state.orderDetailsReducer);
    const {burgerStructure, burgerStructureInId} = useSelector(state => state.burgerConstructorReducer);

    const {addIngredient, setBurgerStructureInId, deleteIngredient} = burgerConstructorSlice.actions;
    const {setIsOrderPopupOpenedOnTrue} = orderDetailsSlice.actions;

    useEffect(() => {
      if(burgerStructure.bun) {
        dispatch(setBurgerStructureInId([burgerStructure.bun._id, ...burgerStructure.ingredients.map(item => item._id), burgerStructure.bun._id]));
      }
    }, [burgerStructure]);

    const [{hover}, dropTarget] = useDrop({
      accept: 'ingredient',
      drop(item) {
        handleDrop(item);
      },
      collect: monitor => ({
        hover: monitor.isOver()
      })
    });

    function handleDrop(item) {
      dispatch(addIngredient(item));
    }

    function handleOrder(idArray) {
      dispatch(setIsOrderPopupOpenedOnTrue());
      dispatch(sendOrder(idArray));
    }

    function handleIngredientDelete(index) {
      dispatch(deleteIngredient(index));
    }

    return (
      <section className={`${burgerConstructorStyles.section}`}>
        <div ref={dropTarget} className={`mt-25 pl-4 ${burgerConstructorStyles.constructorBox} ${hover ? burgerConstructorStyles.constructorBoxOnHover : ''}`}>
          {
            burgerStructure.bun &&
            ( 
              <>
                <ConstructorElement type="top" isLocked={true} text={`${burgerStructure.bun.name} (верх)`} price={burgerStructure.bun.price} thumbnail={burgerStructure.bun.image}/>
                  <ul className={`${burgerConstructorStyles.fillingBox}`}>
                    {
                      burgerStructure.ingredients.map((item, index) => {
                        return (
                          <li key={index} className={`${burgerConstructorStyles.fillingBoxItem}`}><DragIcon type="primary" /><ConstructorElement handleClose={() => {handleIngredientDelete(index)}} text={item.name} price={item.price} thumbnail={item.image}/></li>
                        )
                      })
                    }  
                  </ul>
                <ConstructorElement type="bottom" isLocked={true} text={`${burgerStructure.bun.name} (низ)`} price={burgerStructure.bun.price} thumbnail={burgerStructure.bun.image}/>
              </>
            )
          }
        </div>
        <div className={`${burgerConstructorStyles.total}`}>
          <Counter />
          <Button onClick={() => {handleOrder(burgerStructureInId)}} type="primary" size="large" htmlType='button'>Нажми на меня</Button>
        </div>
        {
          isOrderPopupOpened &&
          <Modal type='order'>
            <OrderDetails />
          </Modal>
        }
      </section>
    );
}