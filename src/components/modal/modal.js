import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ModalOverlay} from '../modal-overlay/modal-overlay.js';
import {modalRoot} from '../../index.js';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {ingredientDetailsSlice} from '../../services/reducers/IngredientDetailsSlice.js';
import {orderDetailsSlice} from '../../services/reducers/order-details-slice.js';
export function Modal({children, type}) {
    const dispatch = useDispatch();
    const {setIsPopupOpenedOnFalse, clearRelevantIngredient} = ingredientDetailsSlice.actions;
    const {setIsOrderPopupOpenedOnFalse} = orderDetailsSlice.actions;

    const closePopup = type === 'ingredients' 
    ? () => {
        dispatch(setIsPopupOpenedOnFalse());
        dispatch(clearRelevantIngredient());
    }
    : () => {
        dispatch(setIsOrderPopupOpenedOnFalse());
    };

    function closePopupByEsc(evt) {
        if(evt.key === "Escape") {
            closePopup();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', closePopupByEsc);

        return () => {
            document.removeEventListener('keydown', closePopupByEsc);
        }
    }, []);

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay closePopup={closePopup} />
                <div className={modalStyles.modal}>
                    <button onClick={closePopup} type='button' className={modalStyles.closeButton}><CloseIcon type="primary" /></button>
                    {children}
                </div>
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired
};