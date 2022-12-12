import styles from "./feed-order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientIconStyled } from "../ingredient-icon-styled/ingredient-icon-styled.js";

export function FeedOrderCard({ order }) {
  const history = useHistory();
  const location = useLocation();

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

  function handleClick() {
    history.push({
      pathname: `/feed/${order._id}`,
      state: { background: location },
    });
  }

  return (
    <li onClick={handleClick} className={styles.wrapper}>
      <div className={styles.firstBox}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </div>
      <p className="text text_type_main-medium">{order.name}</p>
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
