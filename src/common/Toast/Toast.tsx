import React, { useState } from 'react';
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import { CloseButton } from 'react-toastify/dist/components';
let toastOpener: boolean = false;
const Toast = () => {
    const [isToastOpen, setIsToastOpen] = useState(false);
    const slideTransition = cssTransition({
        enter: "animate__animated animate__slideInLeft",
        exit: "animate__animated animate__slideOutLeft"
    });
    
    const notify = () => {
        // toast("Wow so easy !");
        const toastContent = <><strong>Request Rejected!</strong><p>You have rejected a request</p></>;
        // if(toastOpener === false) {
            toastOpener = true;
            console.log(toastOpener);
            toast(toastContent, {
            position: "bottom-left",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: slideTransition,
            onClose: () => {'close click'}  
            });
        // }
    }
    const customCloseButtonHandler = ({ closeToast }: {closeToast: any}) => { // When you use a custom close button, your button will receive a 'closeToast' function. You need to use it to close the toast.
        return <i onClick={() => {
          toastOpener = false;
          console.log(toastOpener);
          console.log('toast closed');
          closeToast();
        }}> x </i>;
      }
    return (
        <div>
          <button onClick={notify}>Notify !</button>
          <ToastContainer />
        </div>
    )
}

export default Toast;