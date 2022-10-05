import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';
 
export function AppHeader() {
    return (
        <header className={appHeaderStyles.header}>
            <a href='#' className={`p-5 ${appHeaderStyles.button} ${appHeaderStyles.button_active}`}><BurgerIcon type="primary" /><p className='text text_type_main-default'>Конструктор</p></a>
            <a href='#' className={`p-5 ${appHeaderStyles.button}`}><ListIcon type="secondary" /><p className='text text_type_main-default'>Лента заказов</p></a>
            <Logo />
            <a href='#' className={`p-5 ${appHeaderStyles.button}`}><ProfileIcon type="secondary" /><p className='text text_type_main-default'>Личный кабинет</p></a>
        </header>
    );
}

