import burgerIngredientsStyles from './burger-ingredients.module.css';
import {TabWrapper} from '../tab-wrapper/tab-wrapper.js';
import {IngredientsChoose} from '../ingredients-choose/ingredients-choose.js';
import PropTypes from 'prop-types';
import {Modal} from '../modal/modal.js';
import {IngredientDetails} from '../ingredient-details/ingredient-details.js';

export function BurgerIngredients({data, popupEditFunctions, states}) {
    const buns = data.filter(item => item.type === 'bun');
    const sauces = data.filter(item => item.type === 'sauce');
    const mains = data.filter(item => item.type === 'main');

    return (
        <section className={`${burgerIngredientsStyles.section}`}>
          <h1 className={`text text_type_main-large mt-10`}>Соберите бургер</h1>
          <TabWrapper></TabWrapper>
          <ul className={burgerIngredientsStyles.ingredientsChooseWrapper}>
            <IngredientsChoose name='Булки' popupEditFunctions={popupEditFunctions} data={buns} />
            <IngredientsChoose name='Соусы' popupEditFunctions={popupEditFunctions} data={sauces} />
            <IngredientsChoose name='Начинки' popupEditFunctions={popupEditFunctions} data={mains} />
          </ul>
          {
          states.isIngredientModalOpened &&
          <Modal closePopup={popupEditFunctions.closePopup}>
            <IngredientDetails ingredientDetails={states.ingredientDetailsData} />
          </Modal>
          }
        </section>
    );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  popupEditFunctions: PropTypes.shape({
    setIsIngredientModalOpened: PropTypes.func,
    closePopup: PropTypes.func,
    setIngredientDetailsData: PropTypes.func,
  }).isRequired
}; 