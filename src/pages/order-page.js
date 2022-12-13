import { MainLayout } from "../layouts/main-layout";
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { OrderPageComponent } from "../components/order-page-component/order-page-component.js";
import { useSocket } from "../hooks/useSocket.js";
import { getCookie } from "../utils/cookies.js";
import { PERSONAL_FEED_URL } from "../utils/burger-api.js";
import { userOrdersSlice } from "../services/reducers/user-orders-slice";

export function OrderPage({ orders }) {
  const dispatch = useDispatch();
  const { setOrdersData } = userOrdersSlice.actions;

  const { isUserAuthorized } = useSelector(
    state => state.loginAuthReducer.user,
  );
  const { total } = useSelector(state => state.userOrdersReducer);

  const authToken = getCookie("authToken");
  const [connectOrders, sendMessage] = useSocket(
    `${PERSONAL_FEED_URL}?token=${authToken}`,
    {
      onMessage,
    },
  );

  function onMessage(event) {
    const data = JSON.parse(event.data);
    if (!data.success) {
      return;
    }
    if (total !== data.total) {
      dispatch(setOrdersData(data));
    }
  }

  const { id } = useParams();

  const order = useMemo(() => {
    if (orders) {
      return orders.find(item => item._id === id);
    }
    return;
  }, [orders, id]);

  useEffect(() => {
    if (isUserAuthorized) {
      connectOrders();
    }
  }, [isUserAuthorized, connectOrders]);

  return (
    <MainLayout>
      <OrderPageComponent order={order} />
    </MainLayout>
  );
}
