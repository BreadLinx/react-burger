import { useEffect, useCallback, FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "components/modal-overlay/modal-overlay";
import { modalRoot } from "../..";

interface IModal {
  closePopup: () => void;
  children: ReactNode;
}

export const Modal: FC<IModal> = ({ children, closePopup }) => {
  const closePopupByEsc = useCallback<(evt: Event & { key: string }) => void>(
    evt => {
      if (evt.key === "Escape") {
        closePopup();
      }
    },
    [closePopup],
  );

  useEffect(() => {
    document.addEventListener("keydown", closePopupByEsc);

    return () => {
      document.removeEventListener("keydown", closePopupByEsc);
    };
  }, [closePopupByEsc]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closePopup={closePopup} />
      <div className={styles.modal}>
        <button
          onClick={closePopup}
          type="button"
          className={styles.closeButton}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    modalRoot,
  );
};
