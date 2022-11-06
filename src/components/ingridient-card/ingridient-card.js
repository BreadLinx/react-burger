import {useEffect, useState} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingridientCardStyles from './ingridient-card.module.css';
import {ingridientPropTypes} from '../../utils/prop-types.js';
import {useDispatch, useSelector} from 'react-redux';
import {ingredientDetailsSlice} from '../../services/reducers/ingredient-details-slice.js';
import { useDrag } from 'react-dnd';
export function IngridientCard({cardData}) {
    const {setRelevantIngredient} = ingredientDetailsSlice.actions;
    const dispatch = useDispatch();

    const [counter, setCounter] = useState(0);

    const {burgerStructure} = useSelector(state => state.burgerConstructorReducer);

    const [{isDrag}, dragRef] = useDrag({
      type: 'ingredient',
      item: cardData,
      collect: monitor => ({
        isDrag: monitor.isDragging(),
      })
    });

    useEffect(() => {
      if(burgerStructure.bun && burgerStructure.bun._id === cardData._id) {
        setCounter(2);
      } else {
        setCounter(burgerStructure.ingredients.filter(item => item._id === cardData._id).length);
      }
    }, [burgerStructure]);

    function handleClick() {
        dispatch(setRelevantIngredient(cardData));
    }

    return (
        <li ref={dragRef} onClick={handleClick}
         className={`pl-4 pr-4 ${ingridientCardStyles.card} ${isDrag ? ingridientCardStyles.onDrag : ''}`}
         >
          {counter !== 0 && <Counter count={counter} size="default" />}
          <img src={cardData.image} alt={cardData.name} />
          <span className={`text text_type_digits-default mt-1 ${ingridientCardStyles.costWrapper}`}>{cardData.price}<CurrencyIcon type="primary" /></span>
          <p className={`text text_type_main-default mt-1 ${ingridientCardStyles.card__description}`}>{cardData.name}</p>
        </li>
    );
}

IngridientCard.propTypes = {
  cardData: ingridientPropTypes.isRequired,
};