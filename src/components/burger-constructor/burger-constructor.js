import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal.js";
import { Counter } from "../counter/counter.js";
import { OrderDetails } from "../order-details/order-details.js";
import { sendOrder } from "../../services/actions/sendOrder-action.js";
import { useDrop } from "react-dnd";
import { burgerConstructorSlice } from "../../services/reducers/burger-constructor-slice.js";
import { orderDetailsSlice } from "../../services/reducers/order-details-slice.js";
import { ConstructorCard } from "../constructor-card/constructor-card.js";

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const { orderData, orderRequest } = useSelector(
    state => state.orderDetailsReducer,
  );
  const { burgerStructure } = useSelector(
    state => state.burgerConstructorReducer,
  );

  const { addIngredient } = burgerConstructorSlice.actions;
  const { clearOrderData } = orderDetailsSlice.actions;

  const [{ hover, canDrop }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      handleDrop(item);
    },
    collect: monitor => ({
      hover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDrop = useCallback(
    item => {
      const card =
        item.type !== "bun"
          ? {
              ...item,
              dragId: burgerStructure.ingredients.length,
              isDragging: false,
            }
          : { ...item };
      dispatch(addIngredient(card));
    },
    [dispatch, burgerStructure],
  );

  function handleOrder() {
    const idArray = [
      burgerStructure.bun._id,
      ...burgerStructure.ingredients.map(item => item._id),
      burgerStructure.bun._id,
    ];
    dispatch(sendOrder(idArray));
  }

  const isOrderButtonDisabled = useMemo(() => {
    if (burgerStructure.bun && burgerStructure.ingredients.length !== 0) {
      return false;
    } else {
      return true;
    }
  }, [burgerStructure]);

  const isOrderPopupOpened = useMemo(() => {
    if (orderRequest || orderData) {
      return true;
    }
    return false;
  }, [orderRequest, orderData]);

  function closePopup() {
    dispatch(clearOrderData());
  }

  const counterValue = useMemo(() => {
    const { bun, ingredients } = burgerStructure;
    if (bun) {
      return ingredients.reduce((prevValue, item) => {
        return prevValue + item.price;
      }, bun.price * 2);
    }
    return 0;
  }, [burgerStructure]);

  return (
    <section className={`${styles.section}`}>
      <div
        ref={dropTarget}
        className={`mt-25 pl-4 ${styles.constructorBox} ${
          hover
            ? styles.constructorBoxOnHover
            : canDrop
            ? styles.constructorBoxOnCanDrop
            : ""
        }`}
      >
        {burgerStructure.bun && (
          <>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${burgerStructure.bun.name} (верх)`}
              price={burgerStructure.bun.price}
              thumbnail={burgerStructure.bun.image}
            />
            <ul id="filling-box" className={`${styles.fillingBox}`}>
              {burgerStructure.ingredients.map((card, index) => {
                return (
                  <ConstructorCard
                    key={card.dragId}
                    card={card}
                    index={index}
                  />
                );
              })}
            </ul>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${burgerStructure.bun.name} (низ)`}
              price={burgerStructure.bun.price}
              thumbnail={burgerStructure.bun.image}
            />
          </>
        )}
      </div>
      <div className={`${styles.total}`}>
        <Counter value={counterValue} />
        <Button
          disabled={isOrderButtonDisabled}
          onClick={handleOrder}
          type="primary"
          size="large"
          htmlType="button"
        >
          Нажми на меня
        </Button>
      </div>
      {isOrderPopupOpened && (
        <Modal closePopup={closePopup}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}
