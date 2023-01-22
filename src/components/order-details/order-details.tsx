import styles from "./order-details.module.css";
import orderCheckedImage from "images/orderCheched.svg";
import { OrderDetailsSkeleton } from "components/order-details-skeleton/order-details-skeleton";
import { FC } from "react";
import { useAppSelector } from "hooks";

export const OrderDetails: FC = () => {
  const { orderData, orderRequest } = useAppSelector(
    state => state.orderDetailsReducer,
  );

  return (
    <>
      {orderRequest ? (
        <OrderDetailsSkeleton />
      ) : (
        <h2 className={`text text_type_digits-large ${styles.title}`}>
          {orderData && orderData.order.number}
        </h2>
      )}
      <p className={`text text_type_main-medium ${styles.orderId}`}>
        идентификатор заказа
      </p>
      <img
        src={orderCheckedImage}
        alt="Галочка выполнения заказа"
        className={styles.orderChecked}
      />
      <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.waitText}`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};
