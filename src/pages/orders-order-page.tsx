import { MainLayout } from "layouts/main-layout";
import { useMemo, useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { useParams } from "react-router-dom";
import { OrderPageComponent } from "components/order-page-component/order-page-component";
import { IOrder } from "types/types";

export const OrdersOrderPage: FC = () => {
  const dispatch = useAppDispatch();

  const { isUserAuthorized } = useAppSelector(
    state => state.loginAuthReducer.user,
  );

  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (isUserAuthorized) {
      dispatch({ type: "wsPersonalOrdersConnectionStart" });
    }
    return () => {
      dispatch({ type: "wsCloseConnection" });
    };
  }, [dispatch, isUserAuthorized]);

  const { messages } = useAppSelector(state => state.webSocketReducer);
  const { orders } =
    messages.length !== 0 ? messages[messages.length - 1] : { orders: [] };

  const order = useMemo(() => {
    if (orders) {
      return orders.find((item: IOrder) => item._id === id);
    }
    return;
  }, [orders, id]);

  return (
    <MainLayout>
      <OrderPageComponent order={order} />
    </MainLayout>
  );
};
