import styles from "./ingredient-icon-styled.module.css";
import { FC } from "react";

interface IIngredientIconStyled {
  src: string;
  alt: string;
  remainder?: number;
}

export const IngredientIconStyled: FC<IIngredientIconStyled> = ({
  src,
  alt,
  remainder = 0,
}) => {
  return (
    <div className={styles.ingredientIconWrapper}>
      {remainder !== 0 && (
        <div className={styles.ingredientsRemainder}>
          <p className="text text_type_main-default">+{remainder}</p>
        </div>
      )}
      <div className={styles.iconWrapper}>
        <img src={src} alt={alt} className={styles.ingredientIcon} />
      </div>
    </div>
  );
};
