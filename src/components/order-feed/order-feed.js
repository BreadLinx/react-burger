import styles from "./order-feed.module.css";
import { FeedOrderCard } from "../feed-order-card/feed-order-card.js";
import { useSelector, useDispatch } from "react-redux";
import { useMemo, useCallback, useEffect } from "react";
import { FeedOrderCardSkeleton } from "../feed-order-card-skeleton/feed-order-card-skeleton.js";
import { useLocation, useHistory } from "react-router-dom";

export function OrderFeed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { messages } = useSelector(state => state.webSocketReducer);
  const { orders, total, totalToday } =
    messages.length !== 0
      ? messages[messages.length - 1]
      : { orders: [], total: 0, totalToday: 0 };

  const readyOrdersArray = useMemo(() => {
    if (!orders) {
      return;
    }
    const arr = orders.filter(item => item.status === "done");
    return arr.filter((item, index) => (index < 10 ? item : null));
  }, [orders]);

  const preparingOrdersArray = useMemo(() => {
    if (!orders) {
      return;
    }
    const arr = orders.filter(item => item.status !== "done");
    return arr.filter((item, index) => (index < 10 ? item : null));
  }, [orders]);

  const handleClick = useCallback(
    orderId => {
      history.push({
        pathname: `/feed/${orderId}`,
        state: { background: location },
      });
    },
    [history, location],
  );

  useEffect(() => {
    dispatch({ type: "wsFeedConnectionStart" });
    return () => {
      dispatch({ type: "wsCloseConnection" });
    };
  }, []);

  return (
    <>
      <section className={styles.feedSection}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <ul className={styles.feedWrapper}>
          {orders.length === 0 ? (
            <>
              <FeedOrderCardSkeleton />
              <FeedOrderCardSkeleton />
              <FeedOrderCardSkeleton />
              <FeedOrderCardSkeleton />
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
                  handleClick={handleClick}
                />
              );
            })
          )}
        </ul>
      </section>
      <section className={styles.totalSection}>
        <div className={styles.previewBox}>
          <div className={styles.readyBox}>
            <p className="text text_type_main-medium">Готовы:</p>
            <ul className={styles.readyList}>
              {readyOrdersArray &&
                readyOrdersArray.map(order => {
                  return (
                    <li key={order._id}>
                      <p
                        className={`text text_type_digits-default ${styles.readyText}`}
                      >
                        {order.number}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className={styles.preparingBox}>
            <p className="text text_type_main-medium">В работе:</p>
            <ul className={styles.readyList}>
              {preparingOrdersArray &&
                preparingOrdersArray.map(order => {
                  return (
                    <li key={order._id}>
                      <p className={`text text_type_digits-default`}>
                        {order.number}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className={styles.totalCounterBox}>
          <p className="text text_type_main-medium">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div className={styles.totalCounterBox}>
          <p className="text text_type_main-medium">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </section>
    </>
  );
}
