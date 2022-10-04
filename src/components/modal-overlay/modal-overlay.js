import ModalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export function ModalOverlay({children, setModalOpened}) {
    return ( 
            <section onClick={
              (evt) => {
                if(evt.target.className === ModalOverlayStyles.modalOverlay) {
                  setModalOpened(false);
                }
              }
            } 
            className={ModalOverlayStyles.modalOverlay}>
              {children}
            </section>
        );
}

ModalOverlay.propTypes= {
  children: PropTypes.any.isRequired,
  setModalOpened: PropTypes.func.isRequired
};