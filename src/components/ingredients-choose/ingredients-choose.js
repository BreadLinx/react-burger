import {forwardRef} from 'react';
import ingredientsChooseStyles from './ingredients-choose.module.css';
import {IngridientCard} from '../ingridient-card/ingridient-card.js';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {ingridientPropTypes} from '../../utils/prop-types.js';
import {IngridientCardSkeleton} from '../ingridient-card-skeleton/ingridient-card-skeleton.js';

export const IngredientsChoose = forwardRef(({type, data}, ref) => {
  const name = type === 'buns' ? 'Булки' : type === 'sauces' ? 'Соусы' : 'Начинки';
  const {ingredientsRequest} = useSelector(state => state.burgerIngredientsReducer);

  return (
    <li id={type} className='pt-10'>
      <h2 ref={ref} className={`text text_type_main-medium mb-6`}>{name}</h2>
      <ul className={ingredientsChooseStyles.cardsWrapper}>
        {
          ingredientsRequest ?
          <>
            <IngridientCardSkeleton/>
            <IngridientCardSkeleton/>
          </> :
          data.map((card) => {
            return (
              <IngridientCard key={card._id} cardData={card} />
            );
          })
        }
      </ul>
    </li>
  );
});

IngredientsChoose.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingridientPropTypes).isRequired,
};