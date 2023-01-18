import styles from "./order-feed-modal.module.css";
import { useParams } from "react-router-dom";
import { useAppSelector } from "hooks";
import { useMemo, FC } from "react";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientIconStyled } from "components/ingredient-icon-styled/ingredient-icon-styled";
import { Loader } from "components/loader/loader";
import { IFeedOrder } from "types/types";

export const OrderFeedModal: FC = () => {
  const { id } = useParams() as { id: string };
  const { ingredients } = useAppSelector(
    state => state.burgerIngredientsReducer,
  );

  const { messages } = useAppSelector(state => state.webSocketReducer);
  const { orders } =
    messages.length !== 0
      ? (messages[messages.length - 1] as { orders: Array<IFeedOrder> })
      : { orders: [] };

  const order = useMemo(() => {
    return orders.find((order: IFeedOrder) => order._id === id);
  }, [id, orders]);

  const orderIngredients = useMemo(() => {
    if (!order?.ingredients || !ingredients) {
      return;
    }
    const ingredientsArray: any[] = [];
    order.ingredients.forEach((item: any) => {
      if (
        ingredientsArray.some(ingredient => ingredient.structure._id === item)
      ) {
        return ingredientsArray.map(ingredient => {
          if (ingredient.structure._id === item) {
            return { ...ingredient, repeat: ++ingredient.repeat };
          } else {
            return ingredient;
          }
        });
      } else {
        const ingredient = ingredients.find(
          ingredient => ingredient._id === item,
        );
        ingredientsArray.push({
          structure: { ...ingredient },
          repeat: 1,
        });
      }
    });
    return ingredientsArray;
  }, [ingredients, order?.ingredients]);

  const counterValue = useMemo(() => {
    if (!orderIngredients) {
      return;
    }
    return orderIngredients.reduce((prevValue, item) => {
      return item.structure.price * item.repeat + prevValue;
    }, 0);
  }, [orderIngredients]);

  return (
    <>
      {!orderIngredients ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        order && (
          <div className={styles.wrapper}>
            <p className="text text_type_digits-default mb-15">
              #{order.number}
            </p>
            <div className="mb-15">
              <p className="text text_type_main-medium">{order.name}</p>
              <p
                className={`text text_type_main-default ${
                  order.status === "done" ? styles.orderDone : ""
                }`}
              >
                {order.status === "created" && "Создан"}
                {order.status === "done" && "Выполнен"}
                {order.status === "pending" && "В обработке"}
              </p>
            </div>
            <div className={`mb-10 ${styles.compoundBox}`}>
              <p className="text text_type_main-medium">Состав:</p>
              <ul className={styles.compoundList}>
                {orderIngredients &&
                  orderIngredients.map((item, index) => {
                    return (
                      <li
                        key={item.structure._id + index}
                        className={`${styles.ingredientBox}`}
                      >
                        <div className={styles.textBox}>
                          <IngredientIconStyled
                            src={item.structure.image}
                            alt={item.structure.name}
                          />
                          <p className="text text_type_main-default">
                            {item.structure.name}
                          </p>
                        </div>
                        <p
                          className={`text text_type_digits-default ${styles.ingredientTotal}`}
                        >
                          {`${item.repeat} x ${item.structure.price}`}
                          <CurrencyIcon type="primary" />
                        </p>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={styles.totalBox}>
              {order.status === "created" || order.status === "pending" ? (
                <p className="text text_type_main-default text_color_inactive">
                  Только что
                </p>
              ) : (
                <p className="text text_type_main-default text_color_inactive">
                  <FormattedDate date={new Date(order.createdAt)} />
                </p>
              )}
              <p
                className={`text text_type_digits-default ${styles.totalTextBox}`}
              >
                {counterValue}
                <CurrencyIcon type="primary" />
              </p>
            </div>
          </div>
        )
      )}
    </>
  );
};
