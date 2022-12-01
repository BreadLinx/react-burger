import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { errorSlice } from "../../services/reducers/error-slice.js";

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { orderData, orderRequest } = useSelector(
    state => state.orderDetailsReducer,
  );
  const { burgerStructure } = useSelector(
    state => state.burgerConstructorReducer,
  );

  const { isUserAuthorized } = useSelector(
    state => state.loginAuthReducer.user,
  );

  const { addIngredient, resetBurgerConstructor } =
    burgerConstructorSlice.actions;
  const { clearOrderData } = orderDetailsSlice.actions;
  const { showError, hideError } = errorSlice.actions;

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
    [dispatch, burgerStructure, addIngredient],
  );

  function handleOrder() {
    if (isUserAuthorized) {
      const idArray = [
        burgerStructure.bun._id,
        ...burgerStructure.ingredients.map(item => item._id),
        burgerStructure.bun._id,
      ];
      dispatch(sendOrder(idArray));
    } else {
      dispatch(
        showError(
          "Чтобы создать заказ необходимо пройти авторизацию. Переадресация на страницу авторизации.",
        ),
      );
      setTimeout(() => {
        dispatch(hideError());
      }, 10000);
      history.replace({ pathname: "/login" });
    }
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
    dispatch(resetBurgerConstructor());
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
          Оформить заказ
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
