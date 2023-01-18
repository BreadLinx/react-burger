import { forwardRef } from "react";
import styles from "./ingredients-choose.module.css";
import { IngridientCard } from "components/ingridient-card/ingridient-card";
import { useAppSelector } from "hooks";
import { IngridientCardSkeleton } from "components/ingridient-card-skeleton/ingridient-card-skeleton";
import { ICard } from "types/types";

interface IIngredientsChoose {
  type: string;
  data: ICard[];
}

export const IngredientsChoose = forwardRef<
  HTMLHeadingElement,
  IIngredientsChoose
>(({ type, data }, ref) => {
  const name =
    type === "buns" ? "Булки" : type === "sauces" ? "Соусы" : "Начинки";
  const { ingredientsRequest, ingredientsError } = useAppSelector(
    state => state.burgerIngredientsReducer,
  );

  return (
    <li id={type} className="pt-10">
      <h2 ref={ref} className={`text text_type_main-medium mb-6`}>
        {name}
      </h2>
      <ul className={styles.cardsWrapper}>
        {ingredientsRequest || ingredientsError ? (
          <>
            <IngridientCardSkeleton />
            <IngridientCardSkeleton />
          </>
        ) : (
          data.map(card => {
            return <IngridientCard key={card._id} cardData={card} />;
          })
        )}
      </ul>
    </li>
  );
});
