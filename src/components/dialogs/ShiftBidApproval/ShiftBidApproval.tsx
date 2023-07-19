import {  I2cButton,} from "@webcomponents/i2cwebcomponents/dist/react";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "../AddShiftBid/AddShiftBid.module.css";
import Classes from "./ShiftBidApproval.module.css";
import { shiftsBidTabData } from "../../Supervisor/agentsAttendanceData";
import Select from "react-select";
import DatePicker from "react-datepicker";




const ShiftBidApproval = (props: any) => {
  const {show, editOnHide} = props
  const [startDate, setStartDate] = useState(null);
  const [startRegDate, setRegStartDate] = useState(null);
  const [startD1Date, setD1StartDate] = useState(null);
  const [startD2Date, setD2StartDate] = useState(null);
  const [startD3Date, setD3StartDate] = useState(null);



  const [endRegDate, setRegEndDate] = useState(null);
  const [endD1Date, setD1EndDate] = useState(null);
  const [endD2Date, setD2EndDate] = useState(null);
  const [endD3Date, setD3EndDate] = useState(null);

  const [shiftBidDataSource, setshiftBidDataSource] =
    useState<any[]>(shiftsBidTabData);
  let editShifts: any = [];


  shiftBidDataSource.map((data, index) => {
    if (data.recordId == props.editShiftRecId) {
      data.agentsDetails.map((ext: any) => {
        if (ext.shiftStatus == "Pending") {
          editShifts.push(ext.agentShiftPriority1);
          editShifts.push(ext.agentShiftPriority2);
        }
      });
    }
  });

  const selectEmployeeOptions: any = [
    { value: "option-1", label: "Option 1" },
    { value: "option-2", label: "Option 2" },
    { value: "option-3", label: "Option 3" },
    { value: "option-4", label: "Option 4" },
    { value: "option-5", label: "Option 5" },
    { value: "option-6", label: "Option 6" },
  ];
  const workFromOptions: any = [
    { value: "office", label: "Office" },
    { value: "home", label: "Home" },
  ];

  return (
    <React.Fragment>
      <Modal
        // {...props}
    show ={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`${classes["add-shift-bid-dialog"]} add-shift-bid-dialog`}
      >
        <Modal.Body>
          <h2>Shift Bid Approval</h2>
          <p>
            You can approve only 01 shift from Regular, D1, D2 priorities with
            D3.
          </p>

          <div className="row mb-5 mx-0 px-0">
            <div className="col-md-12 p-0 ">
              <div className="d-flex flex-column w-100 ">
                <label>Select Employee</label>
                <Select
                  options={selectEmployeeOptions}
                  isSearchable={false}
                  defaultValue={selectEmployeeOptions[0]}
                />
              </div>
            </div>
          </div>

          {editShifts.map((shift: any, index: any) => (
            <div className={`${Classes['shiftBidApproval-dialog-content']} row mx-0  mb-4 px-0`} key={index}>
              <div className={`col-sm-3 d-flex justify-content-center p-0 ${classes['shift']}`}>
                <input type="checkbox" id={index} className="checkbox-input" />
                <div className={`d-flex align-items-center text-center justify-content-center py-4 ${classes['shift-content']}`}>
                  {shift == "Regular (9:00AM - 6:00PM)" ? (
                    <span>Regular Shift</span>
                  ) : shift == "D1 (6:00PM - 3:00AM)" ? (
                    <span>D1 Shift</span>
                  ) : shift == "D2 (3:00AM - 12:00PM)" ? (
                    <span>D2 Shift</span>
                  ) : shift == "D3 (12:00AM - 12:59AM)" ? (
                    <span>D3 Shift</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-sm-9">
                <div className="row h-100">
                  
                  <div className="col-sm-6">
                    <label>Start Date</label>
                  {shift == "Regular (9:00AM - 6:00PM)" ? (
                    <DatePicker selected={startRegDate} onChange={(date:any) => setRegStartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                  ) : shift == "D1 (6:00PM - 3:00AM)" ? (
                    <DatePicker selected={startD1Date} onChange={(date:any) => setD1StartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                  ) : shift == "D2 (3:00AM - 12:00PM)" ? (
                    <DatePicker selected={startD2Date} onChange={(date:any) => setD2StartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                  ) : shift == "D3 (12:00AM - 12:59AM)" ? (
                    <DatePicker selected={startD3Date} onChange={(date:any) => setD3StartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                  ) : (
                    ""
                  )}
                    
                      
                     
                  </div>
                  <div className="col-sm-6">
                    <label>End Date</label>
                  {shift == "Regular (9:00AM - 6:00PM)" ? (
                    <DatePicker selected={endRegDate} onChange={(date:any) => setRegEndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                  ) : shift == "D1 (6:00PM - 3:00AM)" ? (
                    <DatePicker selected={endD1Date} onChange={(date:any) => setD1EndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                  ) : shift == "D2 (3:00AM - 12:00PM)" ? (
                    <DatePicker selected={endD2Date} onChange={(date:any) => setD2EndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                  ) : shift == "D3 (12:00AM - 12:59AM)" ? (
                    <DatePicker selected={endD3Date} onChange={(date:any) => setD3EndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                  ) : (
                    ""
                  )}
                    
                      
                     
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="row mb-4 mx-0 px-0">
            <div className="col-sm-3"></div>
            <div className="work col-sm-9 pe-0">
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

export default ShiftBidApproval;
