import OrderDetailsStyle from './order-details.module.css'; 
import orderCheckedImage from '../../images/orderCheched.svg';

export function OrderDetails() {
    return (
        <>
            <h2 className={`text text_type_digits-large ${OrderDetailsStyle.title}`}>034536</h2>
            <p className={`text text_type_main-medium ${OrderDetailsStyle.orderId}`}>идентификатор заказа</p>
            <img src={orderCheckedImage} className={OrderDetailsStyle.orderChecked} />
            <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`text text_type_main-default text_color_inactive ${OrderDetailsStyle.waitText}`}>Дождитесь готовности на орбитальной станции</p>
        </>
    );
}