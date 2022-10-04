import orderDetailsStyle from './order-details.module.css'; 
import orderCheckedImage from '../../images/orderCheched.svg';

export function OrderDetails() {
    return (
        <>
            <h2 className={`text text_type_digits-large ${orderDetailsStyle.title}`}>034536</h2>
            <p className={`text text_type_main-medium ${orderDetailsStyle.orderId}`}>идентификатор заказа</p>
            <img src={orderCheckedImage} className={orderDetailsStyle.orderChecked} />
            <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive ${orderDetailsStyle.waitText}`}>Дождитесь готовности на орбитальной станции</p>
        </>
    );
}