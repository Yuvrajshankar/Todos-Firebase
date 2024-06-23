import React from 'react';
import styles from "./popup.module.css";
import Popup from 'reactjs-popup';

function PopupComponent({ isOpen, onClose, children }) {
  return (
    <Popup
      open={isOpen}
      closeOnDocumentClick
      onClose={onClose}
      overlayStyle={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}
    >
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </Popup>
  )
}

export default PopupComponent;
