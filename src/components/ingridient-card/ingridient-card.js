import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientCardStyles from './ingridient-card.module.css';
import PropTypes from 'prop-types';
import {ingridientPropTypes} from '../../utils/prop-types.js';

export function IngridientCard({cardData, children, popupEditFunctions}) {
    function handleClick() {
        popupEditFunctions.setIsIngredientModalOpened(true);
        popupEditFunctions.setIngredientDetailsData({
          image: cardData.image_large,
          name: cardData.name,
          calories: cardData.calories,
          proteins: cardData.proteins,
          fats: cardData.fat,
          carbohydrates: cardData.carbohydrates
        });
    }

    return (
        <li onClick={handleClick}
         className={`pl-4 pr-4 ${ingridientCardStyles.card}`}
         >
          {children}
          <img src={cardData.image} alt={cardData.name} />
          <span className={`text text_type_digits-default mt-1 ${ingridientCardStyles.costWrapper}`}>{cardData.price}<CurrencyIcon type="primary" /></span>
          <p className={`text text_type_main-default mt-1 ${ingridientCardStyles.card__description}`}>{cardData.name}</p>
        </li>
    );
}

IngridientCard.propTypes = {
  cardData: ingridientPropTypes.isRequired,
  children: PropTypes.node.isRequired,
  popupEditFunctions: PropTypes.shape({
    setIsIngredientModalOpened: PropTypes.func,
    closePopup: PropTypes.func,
    setIngredientDetailsData: PropTypes.func,
  }).isRequired
};