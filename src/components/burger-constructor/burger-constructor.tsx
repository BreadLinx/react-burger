import { useCallback, useMemo, FC } from "react";
import { useHistory } from "react-router-dom";
import styles from "./burger-constructor.module.css";
import {
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "components/modal/modal";
import { Counter } from "components/counter/counter";
import { OrderDetails } from "components/order-details/order-details";
import { sendOrder } from "services/actions/sendOrder-action";
import { useDrop } from "react-dnd";
import { burgerConstructorSlice } from "services/reducers/burger-constructor-slice";
import { orderDetailsSlice } from "services/reducers/order-details-slice";
import { ConstructorCard } from "components/constructor-card/constructor-card";
import { errorSlice } from "services/reducers/error-slice";
import { successSlice } from "services/reducers/success-slice";
import { useAppDispatch, useAppSelector } from "hooks";
import { IDraggableCard } from "types/types";

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { orderData, orderRequest } = useAppSelector(
    state => state.orderDetailsReducer,
  );
  const { burgerStructure } = useAppSelector(
    state => state.burgerConstructorReducer,
  );

  const { isUserAuthorized } = useAppSelector(
    state => state.loginAuthReducer.user,
  );

  const { addIngredient, resetBurgerConstructor } =
    burgerConstructorSlice.actions;
  const { clearOrderData } = orderDetailsSlice.actions;
  const { showError, hideError } = errorSlice.actions;
  const { showSuccess, hideSuccess } = successSlice.actions;

  const [{ hover, canDrop }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IDraggableCard) {
      handleDrop(item);
    },
    collect: monitor => ({
      hover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDrop = useCallback(
    (item: IDraggableCard) => {
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
      const idArray = burgerStructure.bun
        ? [
            burgerStructure.bun._id,
            ...burgerStructure.ingredients.map(item => item._id),
            burgerStructure.bun._id,
          ]
        : [];
      dispatch(sendOrder(idArray));
      dispatch(
        showSuccess(
          "Ваш заказ успешно создан и сейчас готовится. Не закрывайте всплывающее окно, там отобразиться номер заказа и после вы сможете его забрать.",
        ),
      );
      setTimeout(() => {
        dispatch(hideSuccess());
      }, 14000);
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
};
