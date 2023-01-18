import styles from "./constructor-card.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useEffect, useRef, FC } from "react";
import { burgerConstructorSlice } from "services/reducers/burger-constructor-slice";
import { IDraggableCard } from "types/types";
import { useAppDispatch, useAppSelector } from "hooks";

interface IConstructorCard {
  card: IDraggableCard;
  index: number;
}

export const ConstructorCard: FC<IConstructorCard> = ({ card, index }) => {
  const dispatch = useAppDispatch();
  const { dragStatus } = useAppSelector(
    state => state.burgerConstructorReducer.dragData,
  );
  const ref = useRef<HTMLLIElement>(null);

  const {
    applyDraggingStyles,
    startDragging,
    endDragging,
    changeIngredientsPlaces,
    deleteIngredient,
  } = burgerConstructorSlice.actions;

  function moveCard(
    dragIndex: number,
    hoverIndex: number,
    dragId: number,
    item: IDraggableCard,
  ) {
    dispatch(changeIngredientsPlaces({ dragIndex, hoverIndex, item }));
    dispatch(applyDraggingStyles(dragId));
  }

  function handleIngredientDelete(index: number): void {
    dispatch(deleteIngredient(index));
  }

  const [, dropRef] = useDrop({
    accept: "card",
    hover(item: { index: number; dragId: number }) {
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragId = item.dragId;

      if (!ref.current || dragIndex === hoverIndex) {
        return;
      }
      moveCard(dragIndex, hoverIndex, dragId, card);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef, preview] = useDrag({
    type: "card",
    item: () => {
      const dragId = card.dragId;
      return { dragId, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      dispatch(startDragging());
      dispatch(applyDraggingStyles(card.dragId));
    } else {
      dispatch(endDragging());
    }
  }, [
    isDragging,
    applyDraggingStyles,
    card.dragId,
    dispatch,
    endDragging,
    startDragging,
  ]);

  dropRef(preview(ref));

  return (
    <li ref={ref} className={`${styles.fillingBoxItem}`}>
      <div ref={dragRef} className={styles.dragIconWrapper}>
        <DragIcon type="primary" />
      </div>
      <div
        className={`${styles.itemWrapper} ${
          dragStatus && card.isDragging && styles.itemWrapperOnDragging
        } ${dragStatus && !card.isDragging && styles.itemWrapperOnCanDrop}`}
      >
        <ConstructorElement
          handleClose={() => {
            handleIngredientDelete(index);
          }}
          text={card.name}
          price={card.price}
          thumbnail={card.image}
        />
      </div>
    </li>
  );
};
