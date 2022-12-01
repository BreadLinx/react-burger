import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './tab-wrapper.module.css';

export function TabWrapper({inViewBuns, inViewSauces, inViewMains}) {

    const [currentTab, setCurrentTab] = useState('buns');

    function setCurrentTabOnClick(value) {
      const element = document.getElementById(value);
      if(element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    useEffect(() => {
      if(inViewBuns) {
        setCurrentTab('buns');
      } else if(inViewSauces) {
        setCurrentTab('sauces');
      } else if(inViewMains) {
        setCurrentTab('mains');
      }
    }, [inViewBuns, inViewSauces, inViewMains]);

    return (
        <div className={`mt-5 ${styles.box}`}>
          <Tab value="buns" active={currentTab === 'buns'} onClick={setCurrentTabOnClick}>
            Булки
          </Tab>
          <Tab value="sauces" active={currentTab === 'sauces'} onClick={setCurrentTabOnClick}>
            Соусы
          </Tab>
          <Tab value="mains" active={currentTab === 'mains'} onClick={setCurrentTabOnClick}>
            Начинки
          </Tab>
        </div>
    );
}

TabWrapper.propTypes = {
  inViewBuns: PropTypes.bool.isRequired,
  inViewSauces: PropTypes.bool.isRequired,
  inViewMains: PropTypes.bool.isRequired,
};