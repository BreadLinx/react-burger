import styles from "./modal-overlay.module.css";
import { FC, MouseEvent } from "react";

interface IModalOverlay {
  closePopup: () => void;
}

export const ModalOverlay: FC<IModalOverlay> = ({ closePopup }) => {
  return (
    <section
      onClick={(evt: MouseEvent<HTMLElement>) => {
        if ((evt.target as Element).className === styles.modalOverlay) {
          closePopup();
        }
      }}
      className={styles.modalOverlay}
    ></section>
  );
};
