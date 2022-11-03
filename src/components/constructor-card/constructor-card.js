import constructorCardStyles from './constructor-card.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd';
import {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {burgerConstructorSlice} from '../../services/reducers/burger-constructor-slice.js';
import PropTypes from 'prop-types';
import {constructorsIngridientPropTypes} from '../../utils/prop-types.js';

export function ConstructorCard({card, index}) {
    const dispatch = useDispatch();
    const {dragStatus} = useSelector(state => state.burgerConstructorReducer.dragData);
    const ref = useRef(null);

    const {applyDraggingStyles, startDragging, endDragging, changeIngredientsPlaces, deleteIngredient} = burgerConstructorSlice.actions;

    function moveCard(dragIndex, hoverIndex, dragId, item) {
      dispatch(changeIngredientsPlaces({dragIndex, hoverIndex, item}));
      dispatch(applyDraggingStyles(dragId));
    }

    function handleIngredientDelete(index) {
      dispatch(deleteIngredient(index));
    }

    const [, dropRef] = useDrop({
      accept: 'card',
      hover(item) {
        const dragIndex = item.index;
        const hoverIndex = index;
        const dragId = item.dragId;

        if (!ref.current || dragIndex === hoverIndex) {
          return;
        }
        moveCard(dragIndex, hoverIndex, dragId, card);
        item.index = hoverIndex;
      },
    });

    const [{isDragging}, dragRef, preview] = useDrag({
      type: 'card',
      item: () => {
        const dragId = card.dragId;
        return { dragId, index };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    });
    
    useEffect(() => {
      if(isDragging) {
        dispatch(startDragging());
        dispatch(applyDraggingStyles(card.dragId));
      } else {
        dispatch(endDragging());
      }
    }, [isDragging]);

    dropRef(preview(ref));

    return (
        <li ref={ref} className={`${constructorCardStyles.fillingBoxItem}`}>
            <div ref={dragRef} className={constructorCardStyles.dragIconWrapper}>
              <DragIcon type="primary" />
            </div>
            <div className={`${constructorCardStyles.itemWrapper} ${dragStatus && card.isDragging && constructorCardStyles.itemWrapperOnDragging} ${dragStatus && !card.isDragging && constructorCardStyles.itemWrapperOnCanDrop}`} >
                <ConstructorElement  handleClose={() => {handleIngredientDelete(index)}} text={card.name} price={card.price} thumbnail={card.image}/>
            </div>
        </li>
    );
}

ConstructorCard.propTypes = {
  card: constructorsIngridientPropTypes.isRequired,
  index: PropTypes.number.isRequired,
};