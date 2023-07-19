import {  I2cButton,  } from "@webcomponents/i2cwebcomponents/dist/react";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "../AddShiftBid/AddShiftBid.module.css";
import Select from "react-select";

import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";



const EditShiftBid = (props: any) => {
  const { editOnHide, show } = props;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);


  let shifts = [
    {
      id: 0,
      shift: "Regular Shift",
      workFrom: "",
    },
    {
      id: 1,
      shift: "D1 Shift",
      workFrom: "",
    },
    {
      id: 2,
      shift: "D2 Shift",
      workFrom: "",
    },
    {
      id: 3,
      shift: "D3 Shift",
      workFrom: "",
    },
  ];
  const selectEmployeeOptions: any = [
    { value: "option-1", label: "Option 1" },
    { value: "option-2", label: "Option 2" },
    { value: "option-3", label: "Option 3" },
    { value: "option-4", label: "Option 4" },
    { value: "option-5", label: "Option 5" },
    { value: "option-6", label: "Option 6" },
  ];
  const shiftHoursOptions: any = [
    { value: "bid", label: "Shift Bid" },
    { value: "regular", label: "Regular Shift" },
    { value: "d1", label: "D1 Shift" },
    { value: "d2", label: "D2 Shift" },
    { value: "d3", label: "D3 Shift" },
    { value: "custom", label: "Custom" },
  ];
  const workFromOptions: any = [
    { value: "office", label: "Office" },
    { value: "home", label: "Home" },
  ];

  return (
    <React.Fragment>
      <Modal
        // {...props}
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`${classes["add-shift-bid-dialog"]} add-shift-bid-dialog`}
      >
        <Modal.Body>
          <h2>Edit Shift Bid</h2>

          <div className="row mb-5 mx-0 px-0">
            <div className="col-md-6">
             
                <label>Select Employee</label>
                <Select
                  options={selectEmployeeOptions}
                  isSearchable={false}
                  defaultValue={selectEmployeeOptions[0]}
                />
             
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column w-100 ">
                <label>Dispute Type</label>
                <Select
                  options={shiftHoursOptions}
                  isSearchable={false}
                  defaultValue={shiftHoursOptions[0]}
                  isDisabled={true}
                />
              </div>
            </div>
          </div>
          <div className="row mb-4 mx-0 px-0 ">
            <div className="col-sm-6">
            <label>Start Date</label>
                <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
            
            </div>
            <div className="col-sm-6">
            <label>End Date</label>
                <DatePicker selected={endDate} onChange={(date:any) => setEndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
            
            </div>
          </div>
          <div className=" mx-0 mb-4 px-2 dialog-content">
            {shifts.map((shift: any) => (
              <div className="row shift-work-container px-0 mb-4" key={shift.id}>
                <div className={`col-sm-3 d-flex justify-content-center ${classes['shift']}`}>
                  <input
                    type="checkbox"
                    id={shift.id}
                    className="checkbox-input"
                  />
                  <div className={`d-flex align-items-center text-center justify-content-center ${classes['shift-content']}`}>
                    {shift.shift}
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="d-flex flex-column w-100 ">
                    <label>Work From</label>
                    <Select
                      options={workFromOptions}
                      isSearchable={false}
                      defaultValue={workFromOptions[0]}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mb-4 mx-0 px-0 dialog-content">
                <label>Break</label>
                <TimePicker placeholder="Select Time"  minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
            
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light d-flex justify-content-center">
          <I2cButton
            variant="default"
            size="x-large"
            onClick={editOnHide}
            className="me-3"
          >
            {" "}
            Cancel{" "}
          </I2cButton>
          <I2cButton variant="primary" size="x-large" onClick={editOnHide}>
            Proceed
          </I2cButton>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default EditShiftBid;
