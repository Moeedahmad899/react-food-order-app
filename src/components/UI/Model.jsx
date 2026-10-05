import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


const Modal = forwardRef(function Modal(
  { children, open,onClose,className },
  ref
) {
  const dialog = useRef();

  useEffect(()=>{
    const model = dialog.current;
    if(open){
        model.showModal();
    }

    return ()=> model.close();
  },[open])

  return createPortal(
    <dialog
      ref={dialog}
      className={`model ${className}`}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;