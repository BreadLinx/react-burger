import styles from "./profile-page-orders.module.css";
import { FeedOrderCard } from "../feed-order-card/feed-order-card.js";
import { useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { FeedOrderCardSkeleton } from "../feed-order-card-skeleton/feed-order-card-skeleton.js";

export function ProfilePageOrders() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { isUserAuthorized } = useSelector(
    state => state.loginAuthReducer.user,
  );

  const { messages, wsConnected } = useSelector(
    state => state.webSocketReducer,
  );
  const orders = useMemo(() => {
    const data =
      messages.length !== 0 ? messages[messages.length - 1].orders : [];

    if (data.length === 0 || data.length === 1) {
      return data;
    }
    return [...data].reverse();
  }, [messages]);

  useEffect(() => {
    if (isUserAuthorized) {
      dispatch({ type: "wsPersonalOrdersConnectionStart" });
    }
    return () => {
      dispatch({ type: "wsCloseConnection" });
    };
  }, [isUserAuthorized, dispatch]);

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
        {!wsConnected || messages.length === 0 ? (
          <>
            <FeedOrderCardSkeleton withStatus />
            <FeedOrderCardSkeleton withStatus />
            <FeedOrderCardSkeleton withStatus />
          </>
        ) : orders.length === 0 ? (
          <h2 className={`text text_type_main-large ${styles.notFoundText}`}>
            У вас пока нет заказов, но вы всегда можете создать свой первый!
          </h2>
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
