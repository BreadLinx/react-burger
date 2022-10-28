import React, { useContext, useState, useMemo } from 'react';
import burgerConstructorStyles from './burger-constructor.module.css';
import { Button, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import image from '../../images/bun-01.svg';
import {ingridientPropTypes} from '../../utils/prop-types.js';
import {Modal} from '../modal/modal.js';
import {Counter} from '../counter/counter.js';
import {OrderDetails} from '../order-details/order-details.js';
import {DataContext} from '../../services/dataContex.js';
import {sendOrderRequest} from '../../utils/burger-api.js';

export function BurgerConstructor() {
    const [isOrderModalOpened, setIsOrderModalOpened] = useState(false);
    const [data] = useContext(DataContext);

    const bun = data.filter(item => item.type === 'bun')[0];
    const sauces = data.filter(item => item.type !== 'bun');

    const [burgerStructure, setBurgerStructure] = useState({
      bun: {},
      ingridients: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [burgerStructureInId, setBurgerStructureInId] = useState([]);

    React.useEffect(() => {
      setBurgerStructure({
        ...burgerStructure,
        bun,
        ingridients: sauces
      });
    }, [bun]);

    React.useEffect(() => {
      if(burgerStructure.bun) {
        setBurgerStructureInId([burgerStructure.bun._id, ...burgerStructure.ingridients.map(item => item._id), burgerStructure.bun._id]);
      }
    }, [burgerStructure]);

    function closePopup() {
      setIsOrderModalOpened(false);
    }

    function handleOrder(idArray) {
      setIsLoading(true);
      setIsOrderModalOpened(true);
      sendOrderRequest(idArray)
      .then((res) => {
        setOrderData({
          ...orderData,
          name: res.name,
          orderNumber: res.order.number
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }

    return (
      <section className={`${burgerConstructorStyles.section}`}>
        <div className={`mt-25 pl-4 ${burgerConstructorStyles.constructorBox}`}>
          {
            burgerStructure.bun &&
            ( 
              <>
                <ConstructorElement type="top" isLocked={true} text={`${burgerStructure.bun.name} (верх)`} price={burgerStructure.bun.price} thumbnail={burgerStructure.bun.image}/>
                  <ul className={`${burgerConstructorStyles.fillingBox}`}>
                    {
                      burgerStructure.ingridients.map((item, index) => {
                        return (
                          <li key={index} className={`${burgerConstructorStyles.fillingBoxItem}`}><DragIcon type="primary" /><ConstructorElement text={item.name} price={item.price} thumbnail={item.image}/></li>
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
          <Counter burgerStructure={burgerStructure} />
          <Button onClick={() => {handleOrder(burgerStructureInId)}} type="primary" size="large" htmlType='button'>Нажми на меня</Button>
        </div>
        {
          isOrderModalOpened &&
          <Modal closePopup={closePopup}>
            <OrderDetails isLoading={isLoading} orderData={orderData} />
          </Modal>
        }
      </section>
    );
}