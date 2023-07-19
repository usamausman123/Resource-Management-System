import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {  I2cButton,  I2cInput} from "@webcomponents/i2cwebcomponents/dist/react";
import classes from '../AgentRequestDisputeDialog/AgentRequestDisputeDialog.module.css'

import Classes from "./ApproveRejectDisputeDialog.module.css";

import Select from "react-select";

import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";





const ApproveRejectDisputeDialog = (props: any) => {
  const {show, edithide} = props
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [weekDay, setWeekDay] = useState(false);
  const [disputeType, setDisputeType] = useState<any>({label: props.modalid, value: props.modalid});
  const [disputeTypeToggle, setDisputeTypeToggle] = useState<any>(disputeType.value);
  const daytoggle = () => setWeekDay(!weekDay);
  const [startTime, setStartTime] = useState(null);


  let days = [
    {
      day: "Mo",
      date: 10,
    },
    {
      day: "Tu",
      date: 10,
    },
    {
      day: "We",
      date: 10,
    },
    {
      day: "Th",
      date: 10,
    },
    {
      day: "Fri",
      date: 10,
    },
  ];

  const options: any = [
    { value: "Day", label: "Day" },
    { value: "Week", label: "Week" },
    { value: "Pay Period", label: "Pay Period" },
  ];

  const handleChange = (e: any) => {
    setDisputeType(e);
    setDisputeTypeToggle(e.value)
  };


  return (
    <React.Fragment>
      <Modal
        // {...props}
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`${classes['AgentRequestDisputeDialog']} ${Classes['ApproveRejectDisputeDialog']} AgentRequestDisputeDialog`}
      >
        <Modal.Body>
          <h2>Approve/Reject Disputes</h2>
          <div className="row mb-4">
            <div className="col-6">
              <I2cInput
                type={"number"}
                label={"Token"}
                className={classes["tokenInput"]}
              />
            </div>
            <div className="col-6 d-flex justify-content-end">
              
                <div className="d-flex flex-column w-100 ">
                  <label>Dispute Type</label>
                  <Select
                    options={options}
                    isSearchable={false}
                    defaultValue={{
                      label: props.modalid,
                      value: props.modalid,
                    }}
                    onChange={(value: any) => handleChange(value)}
                  />
                </div>
              
            </div>
          </div>
          <div className={"row mb-4"}>
            <div className="col-6">
                <label>From Date</label>
                <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
             </div>
            <div className="col-6 ">
                <label>From Date</label>
                <DatePicker selected={endDate} onChange={(date:any) => setEndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
            </div>
          </div>
          {disputeTypeToggle === "Day" ? (
            <React.Fragment>
              <div className="row mb-4">
                <div className="col-3">
                  <I2cInput
                    type={"text"}
                    label={"Requested Time"}
                    className={`${classes['tokenInput']} w-100`}
                  />
                </div>
                <div className="col-9">
                  <I2cInput
                    type={"text"}
                    label={"Agent Notes/Comments"}
                    className={classes["noteInput"]}
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                  
                </div>
                <div className="col-4 pe-0">
                  
                <label>End Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                  
                </div>
                <div className="col-2 d-flex align-items-end justify-content-end">
                  <span>9h 30m</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <I2cInput
                    type={"text"}
                    label={"Note to Supervisor/Admin (Reason)"}
                    className={classes["noteInput"]}
                  />
                </div>
              </div>
            </React.Fragment>
          ) : disputeTypeToggle === "Week" ? (
            <React.Fragment>
              <h3>Weekly Dispute</h3>

              <div className={`${Classes['week-content']} row mx-0 px-0`}>
                {days.map((day: any, index: any) => (
                  <div className="week-container px-0 mb-4" key={index}>
                    <div className="row mb-3">
                      <div className="col-2 d-flex justify-content-start ">
                        <div className={classes["shift"]}>
                          <input type="checkbox" id={day.day} className="checkbox-input" onClick={daytoggle}                          />
                          <div className={`${classes['shift-content'] } d-flex align-items-center text-center justify-content-center `}>
                            {day.day}
                          </div>
                        </div>
                      </div>
                      <div className="col-10 work-from d-flex align-items-end">
                        <div className="row">
                          <div className="row mb-4">
                            <div className="col-4">
                              <I2cInput
                                type={"text"}
                                label={"Requested Time"}
                                
                                className={`${classes["tokenInput"]} w-100`}
                              />
                            </div>
                            <div className="col-8">
                              <I2cInput
                                type={"text"}
                                label={"Agent Notes/Comments"}
                                className={classes["noteInput"]}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-5 ">
                             
                                
                                  <label>Start Time</label>
                                  <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                              
                            </div>
                            <div className="col-5 ps-4 pe-0">
                             
                                
                                  <label>End Time</label>
                                  <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                              
                            </div>
                            <div className="col-2 d-flex align-items-end justify-content-end">
                              <span className="calculateTime">9h 30m</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {weekDay == true ? (
                      <React.Fragment>
                        <div className="row">
                          <div className="col-2"></div>
                          <div className="col-10">
                            <I2cInput
                              type={"text"}
                              label={"Note to Supervisor/Admin (Reason)"}
                              className="noteInput"
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h3>Pay Period Dispute</h3>

              <div className={`${Classes['week-content']} row mx-0 px-0`}>
                {days.map((day: any, index: any) => (
                  <div className="week-container px-0 mb-4" key={index}>
                    <div className="row mb-3">
                      <div className="col-2 d-flex justify-content-start ">
                        <div className={classes["shift"]}>
                          <input
                            type="checkbox"
                            id={day.day}
                            className="checkbox-input"
                            onClick={daytoggle}
                          />
                          <div className={`${classes['shift-content'] } d-flex align-items-center text-center justify-content-center `}>
                            {day.day}
                          </div>
                        </div>
                      </div>
                      <div className="col-10 work-from d-flex align-items-end">
                        <div className="row">
                          <div className="row mb-4">
                            <div className="col-4">
                              <I2cInput
                                type={"text"}
                                label={"Requested Time"}
                                className={`${classes["tokenInput"]} w-100`}
                              />
                            </div>
                            <div className="col-8">
                              <I2cInput
                                type={"text"}
                                label={"Agent Notes/Comments"}
                                className={classes["noteInput"]}
                              />
                            </div>
                          </div>
                          <div className="row">
                          <div className="col-5 ">
                             
                                
                             <label>Start Time</label>
                             <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                         
                            </div>
                            <div className="col-5 ps-4 pe-0">
                              
                           
                             <label>End Time</label>
                             <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                         
                            </div>
                            <div className="col-2 d-flex align-items-end justify-content-end">
                              <span className="calculateTime">9h 30m</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {weekDay == true ? (
                      <React.Fragment>
                        <div className="row">
                          <div className="col-2"></div>
                          <div className="col-10">
                            <I2cInput
                              type={"text"}
                              label={"Note to Supervisor/Admin (Reason)"}
                              className="noteInput"
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </React.Fragment>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-light d-flex justify-content-center py-4">
          <I2cButton
            variant="default"
            size="x-large"
            onClick={edithide}
            className="me-3"
          >
            {" "}
            Cancel{" "}
          </I2cButton>
          <I2cButton variant="primary" size="x-large" onClick={edithide}>
            Proceed
          </I2cButton>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ApproveRejectDisputeDialog;
