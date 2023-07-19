import { I2cButton, I2cDivider, I2cMenuItem, I2cSelect } from '@webcomponents/i2cwebcomponents/dist/react';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import classes from './AddScheduleDialog.module.css';
import Select from 'react-select';

import TimePicker from "rc-time-picker";
import DatePicker from "react-datepicker";
import { ArrowDown2 } from 'iconsax-react';
import AgentSearch from '../../AgentSearch/AgentSearch';

import Supervisor_Data from '../../Dispute/Supervisor/SupervisorData.json'




const AddScheduleDialog = (props:any) => {
    const {onHide, show } = props;

    const [shift, setShift] =useState<any>("regular");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sameEdToggle, setSameEdToggle] = useState(1);
    const [customDateToggle, setCustomdateToggle] = useState(0);
    const [showAgentsSearch, setShowAgentsSearch] = useState(false);
    const [supervisorData, setSupervisorData] = useState(Supervisor_Data);


    const [activeDay, setActiveDay] = useState(0);
    const dayClick = (index: any) => {setActiveDay(index);};



    const [startTime, setStartTime] = useState(null);

  
    // Toggle Functionality
    let sameEdToggleChecked: boolean = true;
    let customDateToggleChecked: boolean = true;
    if (sameEdToggle === 1) {
      sameEdToggleChecked = true;
    } else {
      sameEdToggleChecked = false;
    }
    if (customDateToggle === 1) {
      customDateToggleChecked = true;
    } else {
      customDateToggleChecked = false;
    }
  
    // Toggles
    const SameEverydayToggle = () => {
      return (
        <>
          <label className="switch me-2">
            <input
              type="checkbox"
              onChange={() => {
                sameEdToggle === 1 ? setSameEdToggle(0) : setSameEdToggle(1);
                setCustomdateToggle(0);
              }}
              checked={sameEdToggleChecked}
            />
            <span className="slider round"></span>
          </label>
        </>
      );
    };
    const CustomDatesToggle = () => {
      return (
        <>
          <label className="switch me-2">
            <input
              type="checkbox"
              onChange={() => {
                customDateToggle === 1
                  ? setCustomdateToggle(0)
                  : setCustomdateToggle(1);
              }}
              checked={customDateToggleChecked}
            />
            <span className="slider round"></span>
          </label>
          <span className="switch-text">Custom Dates</span>
        </>
      );
    };
  
    let days = [
      {
        id: 0,
        day: "mon",
        abv: "Mo",
        startTime: "",
        endtime: "",
      },
      {
        id: 1,
        day: "tue",
        abv: "Tu",
        startTime: "",
        endtime: "",
      },
      {
        id: 2,
        day: "wed",
        abv: "We",
        startTime: "",
        endtime: "",
      },
      {
        id: 3,
        day: "thu",
        abv: "Th",
        startTime: "",
        endtime: "",
      },
      {
        id: 4,
        day: "fri",
        abv: "Fr",
        startTime: "",
        endtime: "",
      },
      {
        id: 5,
        day: "sat",
        abv: "Sa",
        startTime: "",
        endtime: "",
      },
      {
        id: 6,
        day: "sun",
        abv: "Su",
        startTime: "",
        endtime: "",
      },
    ];

    const shiftHoursOptions:any = [
      {value :'bid',label:'Shift Bid'},
      {value :'regular',label:'Regular Shift'},
      {value : "d1" , label:'D1 Shift'},
      {value : "d2" , label:'D2 Shift'},
      {value : "d3" , label:'D3 Shift'},
      {value : "custom" , label:'Custom'},
    ]
    const selectEmployeeOptions:any = [
      {value :'option-1',label:'Option 1'},
      {value :'option-2',label:'Option 2'},
      {value : "option-3" , label:'Option 3'},
      {value : "option-4" , label:'Option 4'},
      {value : "option-5" , label:'Option 5'},
      {value : "option-6" , label:'Option 6'},
    ]
    const workFromOptions:any = [
      {value :'office',label:'Office'},
      {value :'home',label:'Home'},
      
    ]
    const shiftBid:any = [
      {value :'regular',label:'Regular Shift (9:OOAM - 6:00PM)'},
      {value :'d1',label:'D1 Shift (6:OOPM - 2:00AM)'},
      {value :'d2',label:'D2 Shift (2:OOAM - 6:00AM)'},
      {value :'d3',label:'D3 Shift (12:OOAM - 12:59AM)'},
      
    ]
  
  
  return (
    <React.Fragment>
        <Modal
      // {...props}
      show={show}
      
      aria-labelledby="contained-modal-title-vcenter"
      centered
    className={`${classes['add-schedule-dialogue']} add-schedule-dialogue`}
    >
      <Modal.Body>
        <h2>Add Schedule</h2>
            <div className="row mx-0 px-0 mb-4">
              <div className="col-sm-6 " >
                  <div className={`${classes['select-emp']} d-flex flex-column w-100`}>
                      <label>Select Employee</label>
                      <div className='d-flex align-items-center'  onClick={() => setShowAgentsSearch(prevState => !prevState)}>
                        <input type="text" readOnly value={'Multiple'}/>
                        <ArrowDown2 size="16" color="#666666"/>
                        

                      </div>{showAgentsSearch && <AgentSearch data={Supervisor_Data} setData={setSupervisorData} hideAgentSearch={() => setShowAgentsSearch(prevState => !prevState)} />}
                  </div>
              </div>
              <div className="col-sm-6">
                  <div className='d-flex flex-column w-100 '>
                      <label>Dispute Type</label>
                      <Select options={shiftHoursOptions} isSearchable={false} defaultValue={shiftHoursOptions[1]} onChange={(value:any) => setShift(value)} />
                  </div>
              </div>
            </div>
            <div className="row mx-0 mb-2">
              {shift.value === "bid" ? (
                <>
                  <div className="col-sm-6">
                          <label>Shift Bid</label>
                          <Select options={shiftBid} isSearchable={false} defaultValue={shiftBid[0]}  isMulti/>
                  </div>
                </>
              ) : shift.value === "custom" ? (
                <>
                  <div className="mb-4 d-flex">
                    <div className="col-6 d-flex align-items-center">
                      <SameEverydayToggle />
                      <span className="switch-text">Same Everyday</span>
                    </div>
                    <div className="col-6 d-flex align-items-center">
                      {sameEdToggle === 1 ? "" : <CustomDatesToggle />}
                    </div>
                  </div>
                  <div className="times">
                    <div>
                      {sameEdToggle === 1 ? (
                        <React.Fragment>
                            <div className="row mb-5">
                                <div className="col-sm-6">
                                    <label>Start Date</label>
                                    <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Start Date</label>
                                    <DatePicker selected={endDate} onChange={(date:any) => setEndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
                                </div>
                            </div>
                            {/* <SameDay days={days} /> */}
                            <div className={classes['sameDay']}>
                                    <ul>
                                        {days.map((menu:any) => (
                                            <li key={menu.id} onClick={() => {dayClick(menu.id);}} className={ menu.id === activeDay?  `${classes['active-li']}`: (menu.id === 5 || menu.id === 6) ? `${classes["inactive-li"]}`:''} >
                                            <span>{menu.abv}</span>
                                        </li>
                                        ))}
                                    </ul>
                                    <div className='row'>
                                        <div className="col-sm-6">
                                            <label>Start Time</label>
                                            <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                                        </div>
                                        <div className="end-time col-sm-4">
                                            <label>End Time</label>
                                            <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                                        </div>
                                        <div className='col-sm-2 d-flex align-items-end'>
                                            <span>8h 30min</span> 
                                        </div>
                                      
                                    </div>
                                </div>
                        </React.Fragment>
                        
                      ) : (
                        // <NotSameDay customDateToggle={customDateToggle} days={days} />
                        <ul className={classes['not-same-day']}>
                          {days.map((menu:any) => (
                              <li key={menu.id} className={(menu.id === 5 || menu.id ===6)? `${classes['inactive']} row mb-4`:'row mb-4'}>
                                
                                      <div className={`${classes['days']} col-sm-2`}>
                                          <div>
                                              <span className={customDateToggle ==  1?   `${classes['updatedFontSize']}`:''}> {menu.abv} </span>
                                              {customDateToggle ==  1? <span>{10 + menu.id}</span> :''} 
                                          </div>
                                          
                                          
                                      </div>
                                      <div className={menu.id != 0? 'col-sm-4 d-flex align-items-end': 'col-sm-4'}>
                                        {
                                          menu.id === 0? <label>Start Time</label> : ''
                                        }
                                          <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                                      </div>
                                      <div className={menu.id != 0? 'col-sm-4 d-flex align-items-end': 'col-sm-4'}>
                                        {
                                          menu.id === 0? <label>End Time</label>: ''
                                        }
                                          <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                                      </div>
                                      <div className='col-sm-2 d-flex align-items-end'>
                                          <span>No Shift</span>
                                      </div>
                                  
                              </li>
                          ))}
                      </ul>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className={'col-sm-6'}>
                    <label className={classes['custom-label']}>Break</label>
                    <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
               </div>
              <div className= { shift.value === "bid" ? 'col-sm-6 mt-4 ':'col-sm-6 '}>
                    <label>Work From</label>
                    <Select options={workFromOptions} isSearchable={false} defaultValue={workFromOptions[0]} />
              </div>
            </div>
          
      </Modal.Body>
      <Modal.Footer className='bg-light d-flex justify-content-center py-4'> 
            <I2cButton variant="default" size='x-large' onClick={onHide} className="me-3"> Cancel </I2cButton>
            <I2cButton variant="primary" size='x-large' onClick={onHide}>Proceed</I2cButton>
      </Modal.Footer>
    </Modal>


    </React.Fragment>
  )
}

export default AddScheduleDialog