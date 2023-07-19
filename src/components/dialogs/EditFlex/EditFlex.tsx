import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  I2cButton,
  I2cInput,
} from "@webcomponents/i2cwebcomponents/dist/react";
import classes from "../AddNewFlex/AddNewFlex.module.css";
import Select from "react-select";

import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import AgentSearch from "../../AgentSearch/AgentSearch";
import { ArrowDown2 } from "iconsax-react";
import Supervisor_Data from '../../Dispute/Supervisor/SupervisorData.json'


const EditFlex = (props: any) => {
  const {show, editOnHide} = props
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [weekDay, setWeekDay] = useState(false);
  const [disputeType, setDisputeType] = useState("day");
  const [startTime, setStartTime] = useState(null);

  const [showAgentsSearch, setShowAgentsSearch] = useState(false);
  const [supervisorData, setSupervisorData] = useState(Supervisor_Data);



  const selectEmployeeOptions: any = [
    { value: "option-1", label: "Option 1" },
    { value: "option-2", label: "Option 2" },
    { value: "option-3", label: "Option 3" },
    { value: "option-4", label: "Option 4" },
    { value: "option-5", label: "Option 5" },
    { value: "option-6", label: "Option 6" },
  ];

  return (
    <React.Fragment>
      <Modal
        // {...props}
        show = {show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`${classes["AddNewFlex"]} AddNewFlex`}
      >
        <Modal.Body>
          <h2>Edit Flex</h2>
          <div className="row mb-4">
            <div className="col-6">
              
            <label>From Date</label>
                <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
            
            </div>
            <div className="col-6 ">
              
            <label>To Date</label>
                <DatePicker selected={endDate} onChange={(date:any) => setEndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
            
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <div className="start-time">
              <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
              </div>
            </div>
            <div className="col-6">
              <div className="end-time ">
              <label>End Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <I2cInput type={"text"} label={"Criteria"} className={classes["input"]} />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6 pe-4">
              <I2cInput type={"number"} label={"Factor"} className={classes["input"]} />
            </div>
            <div className="col-6 ps-4 ">
              <I2cInput type={"text"} label={"Amount"} className={classes["input"]} />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <I2cInput
                type={"text"}
                label={"Incentive Description"}
                className={classes["input"]}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <div className={`${classes['select-emp']} d-flex flex-column w-100`}>
                      <label>Assign To</label>
                      <div className='d-flex align-items-center'  onClick={() => setShowAgentsSearch(prevState => !prevState)}>
                        <input type="text" readOnly value={'Multiple'}/>
                        <ArrowDown2 size="16" color="#666666"/>
                        

                      </div>{showAgentsSearch && <AgentSearch data={Supervisor_Data} setData={setSupervisorData} hideAgentSearch={() => setShowAgentsSearch(prevState => !prevState)} />}
              </div>
            </div>
          </div>
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

export default EditFlex;
