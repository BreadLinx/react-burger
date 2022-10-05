import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export function ModalOverlay({closePopup}) {
    return ( 
            <section onClick={
              (evt) => {
                if(evt.target.className === modalOverlayStyles.modalOverlay) {
                  closePopup();
                }
              }
            } 
            className={modalOverlayStyles.modalOverlay}>
            </section>
        );
}

ModalOverlay.propTypes= {
  closePopup: PropTypes.func.isRequired
};