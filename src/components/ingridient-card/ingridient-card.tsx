import { useEffect, useState, FC } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingridient-card.module.css";
import { useAppSelector } from "hooks";
import { useDrag } from "react-dnd";
import { useHistory, useLocation } from "react-router-dom";
import { ICard } from "types/types";

interface IIngridientCard {
  cardData: ICard;
}

export const IngridientCard: FC<IIngridientCard> = ({ cardData }) => {
  const history = useHistory();
  const location = useLocation();

  const [counter, setCounter] = useState(0);

  const { burgerStructure } = useAppSelector(
    state => state.burgerConstructorReducer,
  );

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: cardData,
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (burgerStructure.bun && burgerStructure.bun._id === cardData._id) {
      setCounter(2);
    } else {
      setCounter(
        burgerStructure.ingredients.filter(item => item._id === cardData._id)
          .length,
      );
    }
  }, [burgerStructure, cardData._id]);

  function handleClick() {
    history.push({
      pathname: `/ingredients/${cardData._id}`,
      state: { background: location },
    });
  }

  return (
    <li
      ref={dragRef}
      onClick={handleClick}
      className={`pl-4 pr-4 ${styles.card} ${isDrag ? styles.onDrag : ""}`}
    >
      {counter !== 0 && <Counter count={counter} size="default" />}
      <img src={cardData.image} alt={cardData.name} />
      <span
        className={`text text_type_digits-default mt-1 ${styles.costWrapper}`}
      >
        {cardData.price}
        <CurrencyIcon type="primary" />
      </span>
      <p
        className={`text text_type_main-default mt-1 ${styles.card__description}`}
      >
        {cardData.name}
      </p>
    </li>
  );
};
