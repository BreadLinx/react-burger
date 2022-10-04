import React from 'react';
import ReactDOM from 'react-dom';
import ModalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {OrderDetails} from '../order-details/order-details.js';
import {IngredientDetails} from '../ingredient-details/ingredient-details.js';
import {ModalOverlay} from '../modal-overlay/modal-overlay.js';
import {modalRoot} from '../../index.js';
import PropTypes from 'prop-types';

export function Modal({type, opened, ingredientDetails, setModalOpened}) {

    React.useEffect(() => {
        document.addEventListener('keydown', (evt) => {
            if(evt.key === "Escape" && opened) {
                setModalOpened(false);
            }
        });
    }, [opened]);

    return ReactDOM.createPortal(
        (
            <>
                {
                    opened &&
                    <ModalOverlay setModalOpened={setModalOpened} >
                        <div className={ModalStyles.modal}>
                            <button onClick={() => {setModalOpened(false)}} type='button' className={ModalStyles.closeButton}><CloseIcon type="primary" /></button>
                            {type === 'order' && <OrderDetails/>}
                            {type === 'ingredient' && <IngredientDetails image={ingredientDetails.image} name={ingredientDetails.name} calories={ingredientDetails.calories} proteins={ingredientDetails.proteins} fats={ingredientDetails.fats} carbohydrates={ingredientDetails.carbohydrates} />}
                        </div>
                    </ModalOverlay>
                }
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    type: PropTypes.string.isRequired,
    opened: PropTypes.bool.isRequired,
    ingredientDetails: PropTypes.shape({
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fats: PropTypes.number,
        image: PropTypes.string,
        name: PropTypes.string,
        proteins: PropTypes.number,
    }).isRequired,
    setModalOpened: PropTypes.func.isRequired,
};