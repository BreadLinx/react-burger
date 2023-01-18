import styles from "./order-feed.module.css";
import { FeedOrderCard } from "components/feed-order-card/feed-order-card";
import { useMemo, useCallback, useEffect, FC } from "react";
import { FeedOrderCardSkeleton } from "components/feed-order-card-skeleton/feed-order-card-skeleton";
import { useLocation, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { IFeedOrder } from "types/types";

export const OrderFeed: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const { messages } = useAppSelector(state => state.webSocketReducer);
  const { orders, total, totalToday } =
    messages.length !== 0
      ? (messages[messages.length - 1] as {
          orders: IFeedOrder[];
          total: number;
          totalToday: number;
        })
      : { orders: [], total: 0, totalToday: 0 };

  const readyOrdersArray = useMemo(() => {
    if (!orders) {
      return;
    }
    const arr = orders.filter(
      (item: IFeedOrder): boolean => item.status === "done",
    );
    return arr.filter((item: IFeedOrder, index: number) =>
      index < 10 ? item : null,
    );
  }, [orders]);

  const preparingOrdersArray = useMemo(() => {
    if (!orders) {
      return;
    }
    const arr = orders.filter(
      (item: IFeedOrder): boolean => item.status !== "done",
    );
    return arr.filter((item: IFeedOrder, index: number) =>
      index < 10 ? item : null,
    );
  }, [orders]);

  const handleClick = useCallback<(orderId: string) => void>(
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
  }, [dispatch]);

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
            orders.map((order: IFeedOrder) => {
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
                readyOrdersArray.map((order: IFeedOrder) => {
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
                preparingOrdersArray.map((order: IFeedOrder) => {
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
};
