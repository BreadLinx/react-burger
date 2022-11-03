import { useEffect, useCallback } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import burgerConstructorStyles from './burger-constructor.module.css';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import {Modal} from '../modal/modal.js';
import {Counter} from '../counter/counter.js';
import {OrderDetails} from '../order-details/order-details.js';
import {orderDetailsSlice} from '../../services/reducers/order-details-slice.js';
import {sendOrder} from '../../services/actions/async-actions.js';
import {useDrop} from 'react-dnd';
import {burgerConstructorSlice} from '../../services/reducers/burger-constructor-slice.js';
import {ConstructorCard} from '../constructor-card/constructor-card.js';

export function BurgerConstructor() {
    const dispatch = useDispatch();
    const {isOrderPopupOpened} = useSelector(state => state.orderDetailsReducer);
    const {burgerStructure, burgerStructureInId} = useSelector(state => state.burgerConstructorReducer);

    const {addIngredient, setBurgerStructureInId} = burgerConstructorSlice.actions;
    const {setIsOrderPopupOpenedOnTrue} = orderDetailsSlice.actions;

    useEffect(() => {
      if(burgerStructure.bun) {
        dispatch(setBurgerStructureInId([burgerStructure.bun._id, ...burgerStructure.ingredients.map(item => item._id), burgerStructure.bun._id]));
      }
    }, [burgerStructure]);

    const [{hover, canDrop}, dropTarget] = useDrop({
      accept: 'ingredient',
      drop(item) {
        handleDrop(item);
      },
      collect: monitor => ({
        hover: monitor.isOver(),
        canDrop: monitor.canDrop(),
      })
    });

    const handleDrop = useCallback((item) => {
      const card = item.type !== 'bun' ? {...item, dragId: burgerStructure.ingredients.length, isDragging: false} : {...item};
      dispatch(addIngredient(card));
    }, [dispatch, burgerStructure]);

    function handleOrder(idArray) {
      dispatch(setIsOrderPopupOpenedOnTrue());
      dispatch(sendOrder(idArray));
    }

    return (
      <section className={`${burgerConstructorStyles.section}`}>
        <div ref={dropTarget} className={`mt-25 pl-4 ${burgerConstructorStyles.constructorBox} ${hover ? burgerConstructorStyles.constructorBoxOnHover : canDrop ? burgerConstructorStyles.constructorBoxOnCanDrop : ''}`}>
          {
            burgerStructure.bun &&
            ( 
              <>
                <ConstructorElement type="top" isLocked={true} text={`${burgerStructure.bun.name} (верх)`} price={burgerStructure.bun.price} thumbnail={burgerStructure.bun.image}/>
                  <ul id='filling-box' className={`${burgerConstructorStyles.fillingBox}`}>
                    {
                      burgerStructure.ingredients.map((card, index) => {
                        return (
                          <ConstructorCard key={index} card={card} index={index} />
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
          <Button disabled={!burgerStructure.bun ? true : false} onClick={() => {handleOrder(burgerStructureInId)}} type="primary" size="large" htmlType='button'>Нажми на меня</Button>
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