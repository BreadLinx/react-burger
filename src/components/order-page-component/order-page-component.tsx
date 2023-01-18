import styles from "./order-page-component.module.css";
import { Loader } from "components/loader/loader";
import { useAppSelector } from "hooks";
import { useMemo, FC } from "react";
import { IngredientIconStyled } from "components/ingredient-icon-styled/ingredient-icon-styled";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IFeedOrder, IFeedOrderCardIngredient, ICard } from "types/types";

interface IOrderPageComponent {
  order: IFeedOrder;
}

export const OrderPageComponent: FC<IOrderPageComponent> = ({ order }) => {
  const { ingredients } = useAppSelector(
    state => state.burgerIngredientsReducer,
  );

  const orderIngredients = useMemo(() => {
    if (!order?.ingredients || !ingredients) {
      return;
    }

    const ingredientsArray: Array<IFeedOrderCardIngredient> = [];

    order.ingredients.forEach(item => {
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
          structure: { ...(ingredient as ICard) },
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
    <section className={styles.box}>
      {!orderIngredients ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <p
            className={`text text_type_digits-default mb-10 ${styles.numberText}`}
          >
            #{order.number}
          </p>
          <div className="mb-15">
            <p className="text text_type_main-medium mb-3">{order.name}</p>
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
            {order.status === "pending" || order.status === "created" ? (
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
      )}
    </section>
  );
};
