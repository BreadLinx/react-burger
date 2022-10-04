import IngredientsChooseStyles from './ingredients-choose.module.css';
import {IngridientCard} from '../ingridient-card/ingridient-card.js';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'; 
import PropTypes from 'prop-types';

export function IngredientsChoose({name, data, popupEditFunctions}) {
    return (
        <li className='pt-10'>
          <h2 className={`text text_type_main-medium mb-6`}>{name}</h2>
          <ul className={IngredientsChooseStyles.cardsWrapper}>
            {data.map((card) => {
              return (
                <IngridientCard key={card._id} cardData={card} popupEditFunctions={popupEditFunctions} ><Counter count={1} size="default" /></IngridientCard>
              );
            })}
          </ul>
        </li>
    );
}

IngredientsChoose.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  popupEditFunctions: PropTypes.objectOf(PropTypes.func).isRequired
};