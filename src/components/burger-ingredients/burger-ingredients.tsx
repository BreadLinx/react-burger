import { useInView } from "react-intersection-observer";
import styles from "./burger-ingredients.module.css";
import { TabWrapper } from "components/tab-wrapper/tab-wrapper";
import { IngredientsChoose } from "components/ingredients-choose/ingredients-choose";
import { FC } from "react";
import { useAppSelector } from "hooks/useAppSelector";

export const BurgerIngredients: FC = () => {
  const { ingredients } = useAppSelector(
    state => state.burgerIngredientsReducer,
  );

  const [bunsRef, inViewBuns] = useInView();
  const [saucesRef, inViewSauces] = useInView();
  const [mainsRef, inViewMains] = useInView();

  const buns = ingredients.filter(item => item.type === "bun");
  const sauces = ingredients.filter(item => item.type === "sauce");
  const mains = ingredients.filter(item => item.type === "main");

  return (
    <section className={`${styles.section}`}>
      <h1 className={`text text_type_main-large mt-10`}>Соберите бургер</h1>
      <TabWrapper
        inViewBuns={inViewBuns}
        inViewSauces={inViewSauces}
        inViewMains={inViewMains}
      ></TabWrapper>
      <ul className={styles.ingredientsChooseWrapper}>
        <IngredientsChoose type="buns" data={buns} ref={bunsRef} />
        <IngredientsChoose type="sauces" data={sauces} ref={saucesRef} />
        <IngredientsChoose type="mains" data={mains} ref={mainsRef} />
      </ul>
    </section>
  );
};
