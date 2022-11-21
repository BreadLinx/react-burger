import {useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ModalOverlay} from '../modal-overlay/modal-overlay.js';
import {modalRoot} from '../../index.js';
import PropTypes from 'prop-types';

export function Modal({children, closePopup}) {

    const closePopupByEsc = useCallback((evt) => {
        if(evt.key === "Escape") {
            closePopup();
        }
    }, [closePopup]);

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
                <div className={styles.modal}>
                    <button onClick={closePopup} type='button' className={styles.closeButton}><CloseIcon type="primary" /></button>
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