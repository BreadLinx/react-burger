import styles from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useMemo, FC } from "react";
import { Loader } from "components/loader/loader";
import { useAppSelector } from "hooks";

export const IngredientDetails: FC = () => {
  const { id } = useParams() as { id: string };
  const { ingredients } = useAppSelector(
    state => state.burgerIngredientsReducer,
  );

  const ingredient = useMemo(() => {
    if (ingredients) {
      return ingredients.find(item => item._id === id);
    }
    return;
  }, [ingredients, id]);

  return (
    <>
      {!ingredient ? (
        <div className={styles.loaderBox}>
          <Loader />
        </div>
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
    </>
  );
};
