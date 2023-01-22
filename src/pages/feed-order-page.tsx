import { MainLayout } from "../layouts/main-layout";
import { useMemo, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import { OrderPageComponent } from "components/order-page-component/order-page-component";
import { useAppDispatch, useAppSelector } from "hooks";
import { IOrder } from "types/types";

export const FeedOrderPage: FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams() as { id: string };

  useEffect(() => {
    dispatch({ type: "wsFeedConnectionStart" });
    return () => {
      dispatch({ type: "wsCloseConnection" });
    };
  }, [dispatch]);

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
