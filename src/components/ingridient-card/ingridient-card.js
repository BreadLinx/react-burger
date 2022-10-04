import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngridientCardStyles from './ingridient-card.module.css';
import PropTypes from 'prop-types';

export function IngridientCard({cardData, children, popupEditFunctions}) {
    return (
        <li onClick={() => {
          popupEditFunctions.setModalOpened(true);
          popupEditFunctions.setpopupType('ingredient');
          popupEditFunctions.setIngredientDetailsData({
            image: cardData.image_large,
            name: cardData.name,
            calories: cardData.calories,
            proteins: cardData.proteins,
            fats: cardData.fat,
            carbohydrates: cardData.carbohydrates
          });
        }}
         className={`pl-4 pr-4 ${IngridientCardStyles.card}`}
         >
          {children}
          <img src={cardData.image} alt={cardData.name} />
          <span className={`text text_type_digits-default mt-1 ${IngridientCardStyles.costWrapper}`}>{cardData.price}<CurrencyIcon type="primary" /></span>
          <p className={`text text_type_main-default mt-1 ${IngridientCardStyles.card__description}`}>{cardData.name}</p>
        </li>
    );
}

IngridientCard.propTypes = {
  cardData: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string,
    image_mobile: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.any.isRequired,
  popupEditFunctions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
};