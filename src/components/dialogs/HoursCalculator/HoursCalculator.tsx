import React, { useState } from "react";
import {  I2cButton } from "@webcomponents/i2cwebcomponents/dist/react";
import { Calculator } from "iconsax-react";
import classes from "./HoursCalculator.module.css";
import Modal from "react-bootstrap/Modal";

function HoursCalculator(props: any) {
  const { onHide, show } = props;

  return (
   
    <React.Fragment>
      <Modal
        // {...props}
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={classes['hoursCalculatorPopup']}

      >
        <Modal.Body>
          <div className={`${classes['main']} text-center`}>
            <div className={classes["icon"]}>
              <Calculator size="42" color="#fff" variant="Bold"/>
            </div>
            
            <h3>Hours Calculator</h3>
            <p className="mb-0">This Feature is not available yet.</p>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light d-flex justify-content-center py-4">
          <I2cButton variant="default" size="x-large" onClick={onHide}>
            Close
          </I2cButton>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default HoursCalculator;

// interface PopupDetails {
//     id: number,
//     title: string,
//     onI2cAfterHide: (active: boolean) => void,
//     setOpen: (active: boolean) => void
// }
