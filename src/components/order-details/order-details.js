import orderDetailsStyle from './order-details.module.css';
import orderCheckedImage from '../../images/orderCheched.svg';
import {useSelector} from 'react-redux';
import {OrderDetailsSkeleton} from '../order-details-skeleton/order-details-skeleton.js';

export function OrderDetails() {
    const {orderData, orderRequest} = useSelector(state => state.orderDetailsReducer);

    return (
    <>
      {
        orderRequest ?
        <OrderDetailsSkeleton/> :
        <h2 className={`text text_type_digits-large ${orderDetailsStyle.title}`}>{orderData.order.number}</h2>
      }
      <p className={`text text_type_main-medium ${orderDetailsStyle.orderId}`}>идентификатор заказа</p>
      <img src={orderCheckedImage} alt='Галочка выполнения заказа' className={orderDetailsStyle.orderChecked} />
      <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive ${orderDetailsStyle.waitText}`}>Дождитесь готовности на орбитальной станции</p>
    </>
    );
}