import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export function ModalOverlay({closePopup}) {
    return ( 
            <section onClick={
              (evt) => {
                if(evt.target.className === styles.modalOverlay) {
                  closePopup();
                }
              }
            } 
            className={styles.modalOverlay}>
            </section>
        );
}

ModalOverlay.propTypes= {
  closePopup: PropTypes.func.isRequired,
};