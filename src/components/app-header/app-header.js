import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {Link} from 'react-router-dom'; 

export function AppHeader() {
    return (
        <header className={styles.header}>
            <Link to='/' className={`p-5 ${styles.button} ${styles.button_active}`}><BurgerIcon type="primary" /><p className='text text_type_main-default'>Конструктор</p></Link>
            <Link to='/' className={`p-5 ${styles.button}`}><ListIcon type="secondary" /><p className='text text_type_main-default'>Лента заказов</p></Link>
            <Logo />
            <Link to='/profile' className={`p-5 ${styles.button}`}><ProfileIcon type="secondary" /><p className='text text_type_main-default'>Личный кабинет</p></Link>
        </header>
    );
}

