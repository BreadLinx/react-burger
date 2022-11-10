import counterStyles from './counter.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {PropTypes} from 'prop-types';

export function Counter({value}) {
    return (
        <span className={`text text_type_digits-medium ${counterStyles.totalCounter}`}>{value}<CurrencyIcon type="primary" /></span>
    );
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
}; 