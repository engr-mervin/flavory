//--------------------THIS IS ONLY GOOD SOLUTION TO MODALS THAT ARE OF THE SAME STYLE --------------------
//Create a modal component
//Context will handle if it's shown or not, create a boolean state in context
//This boolean is then used to conditionally render a <Modal></Modal> object that is in _app.js
//Make sure that this object is also portalled into the modal-root available in _document.js
//Context will also expose a function made to change the modal message and button names, etc
//and I also want to set the message, a function to run when a button is clicked
//It will also take in a closing function
//-------------------ALTERNATIVE SOLUTION-----------------------------------------------------------------
//ALL OF THE ABOVE, BUT IN ADDITION:
//create a useModal hook which takes in a component, which (component) has all the functionality it needs
//This component is the one rendered on _app.js instead
//This hook is also the one responsible for changing the message and
//------ANOTHER ALTERNATIVE-------------------------------------------------------------------------------
//instead of a hook, expose the function taking in the component in context api

import { createContext, useReducer } from "react";

const initialVal = {
  isShown: false,
  title: "",
  message: "",
  okFunction: null,
  closeFunction: null,
  isConfirmButtonShown: true,
  isCancelButtonShown: true,
  canBeClosed: true,
  disableButtons: false,
  okButtonText: "Confirm",
  cancelButtonText: "Cancel",
};

const ModalContext = createContext(initialVal);

export default ModalContext;

const modalReducer = function (prev, action) {
  if (action.type === "HIDE") {
    return initialVal;
  }
  if (action.type === "SET_MODAL") {
    return { ...prev, ...action.params };
  }

  if (action.type === "SET_MESSAGE") {
    return { ...prev, message: action.message };
  }
  if (action.type === "SET_BUTTON_CONFIRM") {
    return { ...prev, isConfirmButtonShown: action.shown };
  }
  if (action.type === "SET_BUTTON_CANCEL") {
    return { ...prev, isCancelButtonShown: action.shown };
  }

  if (action.type === "SHOW") {
    return {
      ...prev,
      isShown: true,
      title: action.title ? action.title : "",
      message: action.message ? action.message : "",
      canBeClosed: action.canBeClosed ? action.canBeClosed : true,
      okFunction: action.okFunction ? action.okFunction : null,
      closeFunction: action.closeFunction ? action.closeFunction : null,
    };
  }

  if (action.type === "DISABLE_BUTTONS") {
    return { ...prev, disableButtons: action.disabled };
  }

  if (action.type === "SET_CAN_BE_CLOSED") {
    return { ...prev, canBeClosed: action.canBeClosed };
  }
};

export const ModalContextProvider = function ({ children }) {
  const [modalState, dispatchModal] = useReducer(modalReducer, initialVal);

  const setModalMessage = function (message) {
    dispatchModal({ type: "SET_MESSAGE", message: message });
  };

  const setModal = function (params) {
    dispatchModal({ type: "SET_MODAL", params });
  };
  const showModal = function (params) {
    dispatchModal({
      type: "SHOW",
      message: params.message,
      title: params.title,
      okFunction: params.okFunction,
      closeFunction: params.closeFunction,
      canBeClosed: params.canBeClosed,
    });
  };

  const hideModal = function () {
    dispatchModal({
      type: "HIDE",
    });
  };

  const confirmButtonSet = function (shown) {
    dispatchModal({
      type: "SET_BUTTON_CONFIRM",
      shown: shown,
    });
  };
  const cancelButtonSet = function (shown) {
    dispatchModal({
      type: "SET_BUTTON_CANCEL",
      shown: shown,
    });
  };
  const disableButtonsSet = function (disabled) {
    dispatchModal({
      type: "DISABLE_BUTTONS",
      disabled: disabled,
    });
  };

  const canBeClosedSet = function (canBe) {
    dispatchModal({
      type: "SET_CAN_BE_CLOSED",
      canBeClosed: canBe,
    });
  };
  const modalContextObject = {
    modalState,
    setModalMessage,
    showModal,
    hideModal,
    confirmButtonSet,
    cancelButtonSet,
    disableButtonsSet,
    canBeClosedSet,
    setModal,
  };
  return (
    <ModalContext.Provider value={modalContextObject}>
      {children}
    </ModalContext.Provider>
  );
};
