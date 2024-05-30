import React, { useEffect } from "react";

const ConfirmationModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal-content">
        <p>Item added to the cart!</p>
      </div>
    </div>
  );
};

export default ConfirmationModal;
