import { useContext } from "react";
import ModalContext from "../../store/modal-context";

const Modal = function () {
  const { modalState, hideModal } = useContext(ModalContext);

  if (!modalState.isShown) return "";
  const confirmHandler = async function () {
    if (!modalState.canBeClosed) return;
    if (modalState.okFunction) {
      await modalState.okFunction();
    }
  };
  const cancelHandler = function () {
    if (!modalState.canBeClosed) return;
    if (modalState.closeFunction) {
      modalState.closeFunction();
    }
    hideModal();
  };
  const overlayClickHandler = function (e) {
    if (!modalState.canBeClosed) return;
    if (e.target !== e.currentTarget) return;
    console.log("Hello");
    if (modalState.canBeClosed) {
      hideModal();
    }
  };
  return (
    <div className="modal__overlay" onClick={overlayClickHandler}>
      <div className="modal__box">
        <div className="modal__title-box">{modalState.title}</div>
        <div className="modal__message-box">{modalState.message}</div>
        <div className="modal__message-box-2">{modalState.message2}</div>

        <div className="modal__button-box">
          {modalState.isConfirmButtonShown ? (
            <button
              className="modal__button--confirm"
              onClick={confirmHandler}
              disabled={modalState.disableButtons}
            >
              {modalState.okButtonText}
            </button>
          ) : (
            ""
          )}
          {modalState.isCancelButtonShown ? (
            <button
              className="modal__button--cancel"
              onClick={cancelHandler}
              disabled={modalState.disableButtons}
            >
              {modalState.cancelButtonText}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
