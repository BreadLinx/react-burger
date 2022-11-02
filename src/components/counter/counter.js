import {useEffect, useReducer} from 'react';
import {useSelector} from 'react-redux';
import counterStyles from './counter.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {ingridientPropTypes} from '../../utils/prop-types.js';

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'SET_COUNT':
          return { count: action.value };
        default:
          throw new Error(`Wrong type of action: ${action.type}`);
    }
}

export function Counter() {

    const {burgerStructure} = useSelector(state => state.burgerConstructorReducer);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(burgerStructure.bun && burgerStructure.ingredients) {
            const value = burgerStructure.bun.price * 2 + burgerStructure.ingredients.reduce((prevValue, item) => {
                return prevValue + item.price
            }, 0);
            dispatch({type: 'SET_COUNT', value});
        } else if(burgerStructure.bun && !burgerStructure.ingredients) {
            const value = burgerStructure.bun.price * 2;
            dispatch({type: 'SET_COUNT', value});
        } else {
            dispatch({type: 'SET_COUNT', value: 0});
        }
    }, [burgerStructure]);

    return (
        <span className={`text text_type_digits-medium ${counterStyles.totalCounter}`}>{state.count}<CurrencyIcon type="primary" /></span>
    );
}