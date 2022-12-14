import { MainLayout } from "../layouts/main-layout";
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { OrderPageComponent } from "../components/order-page-component/order-page-component.js";

export function FeedOrderPage() {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "wsFeedConnectionStart" });
    return () => {
      dispatch({ type: "wsCloseConnection" });
    };
  }, []);

  const { messages } = useSelector(state => state.webSocketReducer);
  const { orders } =
    messages.length !== 0
      ? messages[messages.length - 1]
      : { orders: [], total: 0, totalToday: 0 };

  const order = useMemo(() => {
    if (orders) {
      return orders.find(item => item._id === id);
    }
    return;
  }, [orders, id]);

  return (
    <MainLayout>
      <OrderPageComponent order={order} />
    </MainLayout>
  );
}
