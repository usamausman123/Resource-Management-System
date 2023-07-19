import { I2cButton } from "@webcomponents/i2cwebcomponents/dist/react";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import classes from"./SelectFlextimeDialog.module.css";

import TimePicker from "rc-time-picker";


const SelectFlextimeDialog = (props: any) => {
  const {show, editOnHide } = props
  const [manual, setManual] = useState(false);
  const daytoggle = () => setManual(!manual);
  const [startTime, setStartTime] = useState(null);

  const [activeDay, setActiveDay] = useState("");
  const dayClick = (index: any) => {
    setActiveDay(index);
  };

  let list = ["1h", "2h", "3h", "4h", "Add Manual"];

  return (
    <React.Fragment>
      <Modal
        // {...props}
        show = {show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`${classes["SelectFlextimeDialog"]} SelectFlextimeDialog`}
      >
        <Modal.Body>
          <React.Fragment>
            <h2>Select Flex Time</h2>
            <div
              className={
                activeDay === "Add Manual"
                  ? "row mx-0 px-0 time-content mb-4"
                  : "row mx-0 px-0 time-content "
              }
            >
              <ul className="px-0">
                {list.map((menu: any, index:any) => (
                  <li
                    key={index}
                    onClick={() => {
                      dayClick(menu);
                    }}
                    className={
                      menu === activeDay
                        ?  `${classes["active-li"]}`
                        : menu.id === 5 || menu.id === 6
                        ? `${classes["inactive-li"]}`
                        : ""
                    }
                  >
                    <span>{menu}</span>
                  </li>
                ))}
              </ul>
            </div>
            {activeDay === "Add Manual" ? (
              <React.Fragment>
                <div className="row mb-3">
                  <div className="col-6">
                      <label>Start Time</label>
                    <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                  </div>
                  <div className="col-6">
                        <label>End Time</label>
                      <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    
                  </div>
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
          </React.Fragment>
        </Modal.Body>
        <Modal.Footer className="bg-light d-flex justify-content-center py-4">
          <I2cButton
            variant="default"
            size="x-large"
            onClick={editOnHide}
            className="me-3"
          >
            {" "}
            Cancel{" "}
          </I2cButton>
          <I2cButton
            variant="primary"
            size="x-large"
            onClick={editOnHide}
          >
            Proceed
          </I2cButton>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default SelectFlextimeDialog;
