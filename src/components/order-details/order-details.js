import orderDetailsStyle from './order-details.module.css';
import orderCheckedImage from '../../images/orderCheched.svg';
import {Loader} from '../loader/loader.js';
import PropTypes from 'prop-types';

export function OrderDetails({isLoading, orderData}) {
    return (
        <>
          {
            isLoading ?
            <Loader/> :
            (
              <>
                <h2 className={`text text_type_digits-large ${orderDetailsStyle.title}`}>{orderData.orderNumber}</h2>
                <p className={`text text_type_main-medium ${orderDetailsStyle.orderId}`}>идентификатор заказа</p>
                <img src={orderCheckedImage} alt='Галочка выполнения заказа' className={orderDetailsStyle.orderChecked} />
                <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
                <p className={`text text_type_main-default text_color_inactive ${orderDetailsStyle.waitText}`}>Дождитесь готовности на орбитальной станции</p>
              </>
            )
          }
        </>
    );
}

OrderDetails.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  orderData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    orderNumber: PropTypes.number.isRequired
  })
};