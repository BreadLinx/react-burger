import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyles from './app-header.module.css';
 
export function AppHeader() {
    return (
        <header className={AppHeaderStyles.header}>
            <button type='button' className={`p-5 ${AppHeaderStyles.button}`}><BurgerIcon type="primary" /><p className='text text_type_main-default'>Конструктор</p></button>
            <button type='button' className={`p-5 ${AppHeaderStyles.button}`}><ListIcon type="primary" /><p className='text text_type_main-default'>Лента заказов</p></button>
            <Logo />
            <button type='button' className={`p-5 ${AppHeaderStyles.button}`}><ProfileIcon type="primary" /><p className='text text_type_main-default'>Личный кабинет</p></button>
        </header>
    );
}

