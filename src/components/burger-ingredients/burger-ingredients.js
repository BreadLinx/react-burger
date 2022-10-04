import BurgerIngredientsStyles from './burger-ingredients.module.css';
import {TabWrapper} from '../tab-wrapper/tab-wrapper.js';
import {IngredientsChoose} from '../ingredients-choose/ingredients-choose.js';
import PropTypes from 'prop-types';

export function BurgerIngredients({data, popupEditFunctions}) {
    return (
        <section className={`${BurgerIngredientsStyles.section}`}>
          <h1 className={`text text_type_main-large mt-10`}>Соберите бургер</h1>
          <TabWrapper></TabWrapper>
          <ul className={BurgerIngredientsStyles.ingredientsChooseWrapper}>
            <IngredientsChoose name='Булки' popupEditFunctions={popupEditFunctions} data={data.filter(item => item.type === 'bun')} />
            <IngredientsChoose name='Соусы' popupEditFunctions={popupEditFunctions} data={data.filter(item => item.type === 'sauce')} />
            <IngredientsChoose name='Начинки' popupEditFunctions={popupEditFunctions} data={data.filter(item => item.type === 'main')} />
          </ul>
        </section>
    );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  popupEditFunctions: PropTypes.objectOf(PropTypes.func).isRequired
}; 