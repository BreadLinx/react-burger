import { MainLayout } from "../layouts/main-layout";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { OrderPageComponent } from "../components/order-page-component/order-page-component.js";

export function OrderPage() {
  const { orders } = useSelector(state => state.feedReducer);
  const { id } = useParams();

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
