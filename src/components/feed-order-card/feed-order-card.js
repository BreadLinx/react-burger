import styles from "./feed-order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientIconStyled } from "../ingredient-icon-styled/ingredient-icon-styled.js";
import { PropTypes } from "prop-types";
import { orderPropTypes } from "../../utils/prop-types";

export function FeedOrderCard({ order, showStatus = false, handleClick }) {
  const { ingredients } = useSelector(state => state.burgerIngredientsReducer);

  const orderIngredients = useMemo(() => {
    if (!order?.ingredients || !ingredients) {
      return;
    }
    const ingredientsArray = [];
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
    <li onClick={() => handleClick(order._id)} className={styles.wrapper}>
      <div className={styles.firstBox}>
        <p className="text text_type_digits-default">#{order.number}</p>
        {order.status === "pending" || order.status === "created" ? (
          <p className="text text_type_main-default text_color_inactive">
            Только что
          </p>
        ) : (
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        )}
      </div>
      <p className="text text_type_main-medium">{order.name}</p>
      {showStatus && (
        <p
          className={`text text_type_main-default ${
            order.status === "done" ? styles.orderDone : ""
          }`}
        >
          {order.status === "created" && "Создан"}
          {order.status === "done" && "Выполнен"}
          {order.status === "pending" && "В обработке"}
        </p>
      )}
      <div className={styles.secondBox}>
        <ul className={styles.ingredientsList}>
          {orderIngredients && orderIngredients.length <= 6
            ? orderIngredients.map((item, index) => {
                return (
                  <li key={item.structure._id + index}>
                    <IngredientIconStyled
                      src={item.structure.image}
                      alt={item.structure.name}
                    />
                  </li>
                );
              })
            : orderIngredients.map((item, index) => {
                if (index < 5) {
                  return (
                    <li key={item.structure._id + index}>
                      <IngredientIconStyled
                        src={item.structure.image}
                        alt={item.structure.name}
                      />
                    </li>
                  );
                }
                if (index === 5) {
                  return (
                    <li key={item.structure._id + index}>
                      <IngredientIconStyled
                        src={item.structure.image}
                        alt={item.structure.name}
                        remainder={orderIngredients.length - 6}
                      />
                    </li>
                  );
                }
                return null;
              })}
        </ul>
        <p className={`text text_type_digits-default ${styles.counterBox}`}>
          {counterValue} <CurrencyIcon type="primary" />
        </p>
      </div>
    </li>
  );
}

FeedOrderCard.propTypes = {
  order: orderPropTypes.isRequired,
  showStatus: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
