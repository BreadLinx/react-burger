import styles from "./profile-page-orders.module.css";
import { FeedOrderCard } from "components/feed-order-card/feed-order-card";
import { useEffect, useCallback, useMemo, FC } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FeedOrderCardSkeleton } from "components/feed-order-card-skeleton/feed-order-card-skeleton";
import { useAppDispatch, useAppSelector } from "hooks";
import { IFeedOrder } from "types/types";

export const ProfilePageOrders: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const { isUserAuthorized } = useAppSelector(
    state => state.loginAuthReducer.user,
  );

  const { messages, wsConnected } = useAppSelector(
    state => state.webSocketReducer,
  );
  const orders = useMemo(() => {
    const data =
      messages.length !== 0
        ? (messages[messages.length - 1].orders as Array<IFeedOrder>)
        : [];

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
    (orderId: string) => {
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
          orders.map((order: IFeedOrder) => {
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
};
