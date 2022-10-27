import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {TabWrapper} from '../tab-wrapper/tab-wrapper.js';
import {IngredientsChoose} from '../ingredients-choose/ingredients-choose.js';
import PropTypes from 'prop-types';
import {Modal} from '../modal/modal.js';
import {IngredientDetails} from '../ingredient-details/ingredient-details.js';

export function BurgerIngredients({data}) {
    const [isIngredientModalOpened, setIsIngredientModalOpened] = React.useState(false);
    const [ingredientDetailsData, setIngredientDetailsData] = React.useState(null);
    const buns = data.filter(item => item.type === 'bun');
    const sauces = data.filter(item => item.type === 'sauce');
    const mains = data.filter(item => item.type === 'main');

    function closePopup() {
      setIsIngredientModalOpened(false);
    }

    return (
        <section className={`${burgerIngredientsStyles.section}`}>
          <h1 className={`text text_type_main-large mt-10`}>Соберите бургер</h1>
          <TabWrapper></TabWrapper>
          <ul className={burgerIngredientsStyles.ingredientsChooseWrapper}>
            <IngredientsChoose name='Булки' popupEditFunctions={{setIsIngredientModalOpened, setIngredientDetailsData}} data={buns} />
            <IngredientsChoose name='Соусы' popupEditFunctions={{setIsIngredientModalOpened, setIngredientDetailsData}} data={sauces} />
            <IngredientsChoose name='Начинки' popupEditFunctions={{setIsIngredientModalOpened, setIngredientDetailsData}} data={mains} />
          </ul>
          {
          isIngredientModalOpened &&
          <Modal closePopup={closePopup}>
            <IngredientDetails ingredientDetails={ingredientDetailsData} />
          </Modal>
          }
        </section>
    );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}; 