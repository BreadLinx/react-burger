import styles from "./profile-page-orders.module.css";
import { FeedOrderCard } from "../feed-order-card/feed-order-card.js";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../hooks/useSocket";
import { useLocation, useHistory } from "react-router-dom";
import { PERSONAL_FEED_URL } from "../../utils/burger-api.js";
import { userOrdersSlice } from "../../services/reducers/user-orders-slice.js";
import { FeedOrderCardSkeleton } from "../feed-order-card-skeleton/feed-order-card-skeleton.js";
import { getCookie } from "../../utils/cookies.js";

export function ProfilePageOrders() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { setOrdersData } = userOrdersSlice.actions;

  const { isUserAuthorized } = useSelector(
    state => state.loginAuthReducer.user,
  );
  const { total, orders } = useSelector(state => state.userOrdersReducer);

  const authToken = getCookie("authToken");
  const [connectOrders, sendMessage] = useSocket(
    `${PERSONAL_FEED_URL}?token=${authToken}`,
    {
      onMessage,
    },
  );

  function onMessage(event) {
    const response = JSON.parse(event.data);
    if (!response.success) {
      return;
    }
    if (total !== response.total) {
      const data = {
        ...response,
        orders: response.orders.sort((a, b) => b.number - a.number),
      };
      dispatch(setOrdersData(data));
    }
  }

  useEffect(() => {
    if (isUserAuthorized) {
      connectOrders();
    }
  }, [isUserAuthorized, connectOrders]);

  const handleClick = useCallback(
    orderId => {
      history.push({
        pathname: `/profile/orders/${orderId}`,
        state: { background: location },
      });
    },
    [history, location],
  );

  return (
    <section className={styles.section}>
      <ul className={styles.feedWrapper}>
        {orders.length === 0 ? (
          <>
            <h2 className={`text text_type_main-large ${styles.notFoundText}`}>
              Заказов не найдено.
            </h2>
            <FeedOrderCardSkeleton />
            <FeedOrderCardSkeleton />
            <FeedOrderCardSkeleton />
          </>
        ) : (
          orders.map(order => {
            return (
              <FeedOrderCard
                key={order._id}
                order={order}
                showStatus
                handleClick={handleClick}
              />
            );
          })
        )}
      </ul>
    </section>
  );
}
