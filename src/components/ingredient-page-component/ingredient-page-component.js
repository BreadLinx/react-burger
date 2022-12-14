import styles from "./ingredient-page-component.module.css";
import { Loader } from "../loader/loader";
import { ingridientPropTypes } from "../../utils/prop-types.js";

export function IngredientPageComponent({ ingredient }) {
  return (
    <section className={styles.box}>
      {!ingredient ? (
        <Loader />
      ) : (
        <>
          <h2 className={`text text_type_main-large ${styles.title}`}>
            Детали ингредиента
          </h2>
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className={styles.image}
          />
          <p className={`text text_type_main-medium mt-4 mb-8 ${styles.name}`}>
            {ingredient.name}
          </p>
          <ul className={styles.compound}>
            <li className={styles.component}>
              <p className="text text_type_main-default text_color_inactive">
                Калории,ккал
              </p>
              <p
                className={`text text_type_digits-medium text_color_inactive ${styles.digits}`}
              >
                {ingredient.calories}
              </p>
            </li>
            <li className={styles.component}>
              <p className="text text_type_main-default text_color_inactive">
                Белки, г
              </p>
              <p
                className={`text text_type_digits-medium text_color_inactive ${styles.digits}`}
              >
                {ingredient.proteins}
              </p>
            </li>
            <li className={styles.component}>
              <p className="text text_type_main-default text_color_inactive">
                Жиры, г
              </p>
              <p
                className={`text text_type_digits-medium text_color_inactive ${styles.digits}`}
              >
                {ingredient.fat}
              </p>
            </li>
            <li className={styles.component}>
              <p className="text text_type_main-default text_color_inactive">
                Углеводы, г
              </p>
              <p
                className={`text text_type_digits-medium text_color_inactive ${styles.digits}`}
              >
                {ingredient.carbohydrates}
              </p>
            </li>
          </ul>
        </>
      )}
    </section>
  );
}

IngredientPageComponent.propTypes = {
  ingredient: ingridientPropTypes.isRequired,
};
