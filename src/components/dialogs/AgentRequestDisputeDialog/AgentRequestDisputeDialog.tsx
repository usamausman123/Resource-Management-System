import { I2cButton, I2cDivider, I2cMenuItem, I2cSelect, I2cInput } from '@webcomponents/i2cwebcomponents/dist/react';
import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import classes from './AgentRequestDisputeDialog.module.css'

import Select from 'react-select';
import DatePicker from "react-datepicker";
import TimePicker from "rc-time-picker";
import { InfoCircle } from 'iconsax-react';

const AgentRequestDisputeDialog = (props:any) => {
    const { editonhide, show } = props;

      
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [disputeType, setDisputeType] = useState({label: props.modalid, value: props.modalid})
    const [disputeTypeToggle, setDisputeTypeToggle] = useState<any>(disputeType.value);
    const [startTime, setStartTime] = useState(null);

    const [weekDay,setWeekDay] = useState(false)



    const daytoggle = () => setWeekDay(!weekDay);

    let days = [
        {
            day:'Mo',
            date:10
        },
        {
            day:'Tu',
            date:10
        },
        {
            day:'We',
            date:10
        },
        {
            day:'Th',
            date:10
        },
        {
            day:'Fri',
            date:10
        },
    ]

    
    const options:any = [
        {value :'Day',label:'Day'},
        {value :'Week',label:'Week'},
        {value : "Pay Period" , label:'Pay Period'},
      ]


      const handleChange = (e: any) => {
        setDisputeType(e);
        setDisputeTypeToggle(e.value)
      };
      
    
  return (
    <React.Fragment>
    <Modal // {...props}
        show={show} aria-labelledby="contained-modal-title-vcenter" centered className={`${classes['AgentRequestDisputeDialog']} AgentRequestDisputeDialog` }>
    <Modal.Body className="p-0">
        <h2>Request Dispute</h2>
        <form>
        <div className='row  mb-4'>
            <div className={`${classes['ticket']} col-6`}>
                <I2cInput type={'number' } label={'Ticket Number' } className={classes['tokenInput']}/>
                <div className={classes['ticket-tooltip']}>
                    <InfoCircle size="18" color="#999999" className={classes['ticket-info-icon']}/>
                    <span className={classes["ticket-tooltiptext"]}>Put the 'Ticket number' here if didn't assigned yet leave the field blank</span>
                </div>
               
            </div>
            <div className="col-6">
                    <label>Dispute Type</label>
                    <Select className="custom-select" options={options} isSearchable={false} defaultValue={{ label: props.modalid, value: props.modalid, }} onChange={(value: any) => handleChange(value)}/>
            </div>
        </div>
        <div className={'row mb-4' }>
            <div className="col-6">
                <label>From Date</label>
                <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
            </div>
            <div className="col-6 ">
                <label>To Date</label>
                <DatePicker selected={endDate} onChange={(date:any) => setEndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
            </div>  
        </div>
        {
           disputeTypeToggle === 'Day'?
            <React.Fragment>
                <div className='row mb-4'>
                    <div className="col-6">
                        <label>Start Time</label>
                        <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                    <div className="col-4">
                        <label>End Time</label>
                        <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                    <div className="col-2 d-flex align-items-end">
                        <p className="w-100 text-center mb-0">9h 30m</p>
                    </div>
                </div>  
                <div className="row">
                    <div className="col-12">
                        <I2cInput type={'text'} label={'Note to Supervisor/Admin (Reason)'} className={classes['noteInput']}/>

                    </div>
                </div>
            </React.Fragment> : disputeTypeToggle === 'Week'?
            <React.Fragment>
                <h3>Weekly Dispute</h3>
                
                <div className="row mx-0 px-0 week-content">
                        {
                            days.map(
                                (day:any, index:any)=>(
                                    <div className=' px-0 mb-4' key={index}>
                                        <div className="row mb-3">
                                            <div className="col-2 d-flex justify-content-start align-items-end">
                                                <div className={classes['shift']}>
                                                    <input type="checkbox" id={day.day} onClick={daytoggle}/>
                                                    <div className={`d-flex align-items-center text-center justify-content-center ${classes['shift-content']}`} >
                                                        {day.day}
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            <div className="col-10 d-flex align-items-end">
                                                <div className='row'>
                                                    <div className="col-5">
                                                        {index === 0?<label>Start Time</label>:''}
                                                        <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                                                    </div>
                                                    <div className="col-5 ps-4 pe-0">
                                                        {index === 0?<label>End Time</label>:''}
                                                        <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                                                    </div>
                                                    <div className="col-2 d-flex align-items-end justify-content-end">
                                                        <span className={classes['calculateTime']}>9h 30m</span>
                                                    </div>
                                            </div>
                                        </div>
                                       
                                        </div>
                                        {
                                            weekDay == true?<React.Fragment>
                                                <div className="row">
                                                    <div className='col-2'></div>
                                                    <div className="col-10">
                                                        <I2cInput type={'text'} label={'Note to Supervisor/Admin (Reason)'} className={classes['noteInput']}/>
                                                    </div>
                                                </div>
                                            </React.Fragment>:''
                                        }
                                    
                                        
                                    </div>
                                )
                            )
                        }
                </div>
            </React.Fragment> : 
            <React.Fragment>
                <h3>Pay Period Dispute</h3>
                
                <div className="row mx-0 px-0 week-content">
                        {
                            days.map(
                                (day:any, index:any)=>(
                                    <div className=' px-0 mb-4' key={index}>
                                        <div className="row mb-3">
                                            <div className="col-2 d-flex justify-content-start align-items-end">
                                                <div className={classes['shift']}>
                                                    <input type="checkbox" id={day.day} className="checkbox-input" onClick={daytoggle}/>
                                                    <div className={`d-flex align-items-center text-center justify-content-center ${classes['shift-content']}`}  >
                                                        {day.day}
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            <div className="col-10 work-from d-flex align-items-end">
                                                <div className='row'>
                                                <div className="col-5">
                                                        {index === 0?<label>Start Time</label>:''}
                                                        <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                                                    </div>
                                                    <div className="col-5 ps-4 pe-0">
                                                        {index === 0?<label>End Time</label>:''}
                                                        <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                                                    </div>
                                                    <div className="col-2 d-flex align-items-end justify-content-end">
                                                        <span className={classes['calculateTime']}>9h 30m</span>
                                                    </div>
                                            </div>
                                        </div>
                                       
                                        </div>
                                        {
                                            weekDay == true?<React.Fragment>
                                                <div className="row">
                                                    <div className='col-2'></div>
                                                    <div className="col-10">
                                                        <I2cInput type={'text'} label={'Note to Supervisor/Admin (Reason)'} className={classes['noteInput']}/>
                                                    </div>
                                                </div>
                                            </React.Fragment>:''
                                        }
                                    
                                        
                                    </div>
                                )
                            )
                        }
                </div>
            </React.Fragment> 
        }
      
    </form>
    </Modal.Body>
    <Modal.Footer className='bg-light d-flex justify-content-center py-4'> 
            <I2cButton variant="default" size='x-large' onClick={editonhide} className="me-3"> Cancel </I2cButton>
            <I2cButton variant="primary" size='x-large' onClick={editonhide}>Submit for Approval</I2cButton>
    </Modal.Footer>
</Modal>


</React.Fragment>
  )
}

export default AgentRequestDisputeDialog