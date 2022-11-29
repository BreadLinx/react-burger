import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import styles from "./burger-ingredients.module.css";
import { TabWrapper } from "../tab-wrapper/tab-wrapper.js";
import { IngredientsChoose } from "../ingredients-choose/ingredients-choose.js";

export function BurgerIngredients() {
  const { ingredients } = useSelector(state => state.burgerIngredientsReducer);

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
}
