import React, { useState } from "react";
import {  I2cButton,  I2cTextarea,} from "@webcomponents/i2cwebcomponents/dist/react";
import classes from "./TimeOff.module.css";

import Modal from "react-bootstrap/Modal";
import Select from 'react-select';
import TimePicker from "rc-time-picker";
import DatePicker from "react-datepicker";


function TimeOff(props: any) {
  const { openModal, isStatsView, closeModal, closeModalSuccess, title,  } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [requestType, setRequestType] = useState("");
  const [leaveType, setLeaveType] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    alert("All fields are valid!");
  }
  function startDateChangeHandler(value: any) {
    setStartDate(value);
    console.log("start date: " + value);
  }

  function endDateChangeHandler(value: any) {
    setEndDate(value);
    console.log("end date: " + value);
  }

  // const requestTypeChangeHandler = (event: SelectChangeEvent) => {
  //   setRequestType(event.target.value);
  // };
  // const leaveTypeChangeHandler = (event: SelectChangeEvent) => {
  //   setLeaveType(event.target.value);
  // };

  // const closeModalHandler = () => {
  //   // setOpen(false);
  //   // props.closeModal(false);
  // };

  const closeModalHandler = () => {
    props.closeModal(false);
  }


  const requestType_1:any = [
    {value :'pto',label:'PTO (Paid Time Off)'},
    {value :'unpaid',label:'Unpaid Time Off'}
  ]

  const leaveType_1:any = [
    {value :'Sick',label:'Sick Leave'},
    {value :'Casual',label:'Casual Leave'},
    {value :'Short',label:'Short Leave'},
    {value :'Annual',label:'Annual Leave'},
    
  ]


  return (
    //
    <React.Fragment>
      <Modal
        // {...props}
        show={openModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`${classes["timeoff-dialog"]} timeoff-dialog`}
      >
        <Modal.Body className='p-0'> 
          <h2>{title}</h2>
          <div className="row">
            <div className="col-12">
              {isStatsView ? (
                <div className={`${classes['badge-strip']} d-flex `}>
                  <span className="flex-grow-1">Available PTO Balance</span>
                  <span className="flex-shrink-0">14h 30m</span>
                </div>
              ) : (
                <div className={classes["timeoff-dialog-subheading"]}>
                  Your employer requires 7 days advance notice for time off
                  requests (except sick time).
                </div>
              )}
            </div>
          </div>
          <form className={classes.modelForm} onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-6 mb-4">
              <label>Dispute Type</label>
                      <Select className="custom-select" options={requestType_1} isSearchable={false} defaultValue={requestType_1[1]}  />
              </div>
              <div className="col-6 mb-4">
                {isStatsView && (
                  <React.Fragment>
                    <label>Leave Type</label>
                    <Select className="custom-select" options={leaveType_1} isSearchable={false} defaultValue={leaveType_1[1]}  />
                  </React.Fragment>
                )}
              </div>

              <div className="col-6 mb-4">
                    <label>From Date</label>
                    <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                
              </div>
              <div className="col-6 mb-4">
              <label>To Date</label>
                    <DatePicker selected={endDate} onChange={endDateChangeHandler}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                
              </div>

              <div className="col-6 mb-4">
              <label className='custom-label'>Start Time</label>
                    <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" inputReadOnly placement={'bottomLeft'} />
                
              </div>
              <div className="col-6 mb-4">
              <label className='custom-label'>End Time</label>
                    <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" inputReadOnly placement={'bottomLeft'} />
                
              </div>
            </div>
            {isStatsView && (
              <div className={`${classes['primary-badge']} d-flex `}>
                <span className="flex-grow-1">Total PTO Requested</span>
                <span className="flex-shrink-0">9h 30m</span>
              </div>
            )}
            <I2cTextarea className={classes["text-area"]} resize="none" size="small" rows={1} name="comment" label="Note to Manager/Administrator" required ></I2cTextarea>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-light d-flex justify-content-center py-4">
          <I2cButton variant="default" size="x-large" onClick={closeModalHandler} className="me-3" > Cancel </I2cButton>
          <I2cButton variant="primary" size="x-large" onClick={closeModalHandler} > Submit for Approval </I2cButton>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default TimeOff;

interface PopupDetails {
  id: number;
  title: string;
  open: Boolean;
  onI2cAfterHide: (active: boolean) => void;
  setOpen: (active: boolean) => void;
}
