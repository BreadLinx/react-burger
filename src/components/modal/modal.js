import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ModalOverlay} from '../modal-overlay/modal-overlay.js';
import {modalRoot} from '../../index.js';
import PropTypes from 'prop-types';

export function Modal({children, closePopup}) {

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
    children: PropTypes.node.isRequired,
    closePopup: PropTypes.func.isRequired,
};