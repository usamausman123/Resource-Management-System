import {    I2cButton,      } from "@webcomponents/i2cwebcomponents/dist/react";
  import React, { useState } from "react";
  import Modal from "react-bootstrap/Modal";
import Select from 'react-select';
import classes from './AgentSelectShiftBid.module.css'



import TimePicker from "rc-time-picker";



const AgentSelectShiftBid = (props:any) => { 
    const { editOnHide, show } = props;

    const [regWorkFrom, setRegWorkFrom] = useState(false);
    const [d1workFrom, setD1WorkFrom] = useState(false);
    const [d2workFrom, setD2WorkFrom] = useState(false);
    const [d3workFrom, setD3WorkFrom] = useState(false);
    const [startTime, setStartTime] = useState(null);

    
    const workFromOptions:any = [
        {value :'office',label:'Office'},
        {value :'home',label:'Home'},
    ]  

    const [p1, setP1] = useState<any>('')
    const [p2, setP2] = useState<any>('')

    
    const handleRegClick = () =>{
        if(p1 === ''){
            setP1('regular');
            setRegWorkFrom(!regWorkFrom) 
            if(p2 === 'regular'){
                setP1('')
                setP2('');
                setRegWorkFrom(!regWorkFrom) 
            }
        }
        else if(p1 != '' && p1 != 'regular'){
            if(p2===''){ 
                setP2('regular'); 
                setRegWorkFrom(!regWorkFrom)
                
            } 
            else if(p2 === 'regular'){
                setP2('');
                setRegWorkFrom(!regWorkFrom) 
            }
            else if(p2==='d1'){ 
                setD1WorkFrom(!d1workFrom)
                setRegWorkFrom(!regWorkFrom)
                setP2('regular'); 
            } 
            else if (p2 === 'd2'){
                setD2WorkFrom(!d2workFrom)
                setRegWorkFrom(!regWorkFrom)
                setP2('regular'); 
            }
            else if (p2 === 'd3'){ 
                setD3WorkFrom(!d3workFrom)
                setRegWorkFrom(!regWorkFrom)
                setP2('regular'); 
            }
           
        }

        if(p1 === 'regular'){
            setP1('');
            setRegWorkFrom(!regWorkFrom) 
        }
            
        
    }
    const handleD1Click = () =>{
        if(p1 === ''){
            setP1('d1');
            setD1WorkFrom(!d1workFrom)
            if(p2 === 'd1'){
                setP1('')
                setP2('');
                setD1WorkFrom(!d1workFrom) 
            }
        }
        else if(p1 != '' && p1 != 'd1'){
            if(p2===''){ 
                setP2('d1'); 
                setD1WorkFrom(!d1workFrom)
            } 
            else if(p2 === 'd1'){
                setP2('');
                setD1WorkFrom(!d1workFrom)
            }
            else if(p2==='regular'){
                setRegWorkFrom(!regWorkFrom)
                setD1WorkFrom(!d1workFrom)
                setP2('d1'); 
            } 
            else if (p2 === 'd2'){
                setD2WorkFrom(!d2workFrom)
                setD1WorkFrom(!d1workFrom)
                setP2('d1'); 
            }
            else if (p2 === 'd3'){
                setD3WorkFrom(!d3workFrom)
                setD1WorkFrom(!d1workFrom)
                setP2('d1'); 
            }
            
        }
        if(p1 === 'd1'){
            setP1('');
            setD1WorkFrom(!d1workFrom)
        }
       
        
    }
    const handleD2Click = () =>{
        if(p1 === ''){
            setP1('d2');
            setD2WorkFrom(!d2workFrom)
            if(p2 === 'd2'){
                setP1('')
                setP2('');
                setD2WorkFrom(!d2workFrom) 
            }
        }
        else if(p1 != '' && p1 != 'd2'){
            if(p2===''){ 
                setP2('d2'); 
                setD2WorkFrom(!d2workFrom)
               
            } 
            else if(p2 === 'd2'){
                setP2('');
                setD2WorkFrom(!d2workFrom)
               
            }
            else if(p2==='regular'){
                setRegWorkFrom(!regWorkFrom)
                setD2WorkFrom(!d2workFrom)
                setP2('d2'); 
            } 
            else if (p2 === 'd1'){
                setD1WorkFrom(!d1workFrom)
                setD2WorkFrom(!d2workFrom)
                setP2('d2');
            }
            else if (p2 === 'd3'){
                setD3WorkFrom(!d3workFrom)
                setD2WorkFrom(!d2workFrom)
                setP2('d2'); 
            }
        }
        if(p1 === 'd2'){
            setP1('');
            setD2WorkFrom(!d2workFrom)
        }
        
    }

    const handleD3Click = () =>{
        if(p1 === ''){
            setP1('d3');
            setD3WorkFrom(!d3workFrom)
            if(p2 === 'd3'){
                setP1('')
                setP2('');
                setD3WorkFrom(!d3workFrom) 
            }
        }
        else if(p1 != '' && p1 != 'd3'){
            if(p2===''){ 
                setP2('d3'); 
                setD3WorkFrom(!d3workFrom)
            } 
            else if(p2 === 'd3'){
                setP2('');
                setD3WorkFrom(!d3workFrom)
               
            }
            else if(p2==='regular'){
                setRegWorkFrom(!regWorkFrom)
                setD3WorkFrom(!d3workFrom)
                setP2('d3'); 
            } 
            else if (p2 === 'd1'){
                setD1WorkFrom(!d1workFrom)
                setD3WorkFrom(!d3workFrom)
                setP2('d3');
            }
            else if (p2 === 'd2'){
                setD2WorkFrom(!d2workFrom)
                setD3WorkFrom(!d3workFrom)
                setP2('d3'); 
            }
        }
        if(p1 === 'd3'){
            setP1('');
            setD3WorkFrom(!d3workFrom)
        }
      
    }
    
   


  return (
    <React.Fragment>
      <Modal
          // {...props}
          show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={`${classes["select-shift-bid"]} select-shift-bid`}
      >
        <Modal.Body>
          <h2>Select Shift Bid</h2>
          <p className='mb-5'>
            You can any 2 shift peiorities from the offered list by supervisor.
          </p>
           
            <div className="row mx-0 shiftBidApproval-dialog-content mb-4 px-0" >
                <div className={`col-sm-3 d-flex justify-content-center ${classes['shift']} ps-0`}>
                  <input type="checkbox" className="checkbox-input" onClick={handleRegClick} />
                  <div className={regWorkFrom && p1 === 'regular' || p2 === 'regular'? `d-flex align-items-center text-center justify-content-center ${classes['shift-content']} ${classes['active']} py-2`: `d-flex align-items-center text-center justify-content-center ${classes['shift-content']} py-2`}>
                      <span>Regular Shift</span>
                      {regWorkFrom && p1 === 'regular'?
                         <div className={classes['tag']}>P1</div>:regWorkFrom && p2 ==='regular'? <div className={classes['tag']}>P2</div>:''
                      }
                       
                  </div>
                  
                </div>
                <div className="col-sm-9">
                  <div className="row h-100">
                    <div className="col-sm-6 h-100 ">
                         <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                    <div className="col-sm-6 h-100  pe-0">
                         <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                  </div>
                </div>
              </div>
              {regWorkFrom && 
                 <div className='row mb-4' >
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <div className='d-flex flex-column w-100 '>
                            <label>Work From</label>
                            <Select options={workFromOptions} isSearchable={false} defaultValue={workFromOptions[0]} />
                        </div>
                    </div>
                </div>
              }
              <div className="row mx-0 shiftBidApproval-dialog-content mb-4 px-0" >
                <div className={`col-sm-3 d-flex justify-content-center ${classes['shift']} ps-0`}>
                  <input type="checkbox" className="checkbox-input" onClick={handleD1Click} />
                  <div className={d1workFrom && p1 === 'd1' || p2 === 'd1'? `d-flex align-items-center text-center justify-content-center ${classes['shift-content']} ${classes['active']} py-2`: `d-flex align-items-center text-center justify-content-center ${classes['shift-content']} py-2`}>
                      <span>D1 Shift</span>
                      {d1workFrom && p1 === 'd1'?
                         <div className={classes['tag']}>P1</div>:d1workFrom && p2 ==='d1'? <div  className={classes['tag']}>P2</div>:''
                      }
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="row h-100">
                    <div className="col-sm-6 h-100 ">
                         <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                    <div className="col-sm-6 h-100  pe-0">
                         <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                  </div>
                </div>
              </div>
              {d1workFrom &&  
                 <div className='row mb-4' >
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <div className='d-flex flex-column w-100 '>
                            <label>Work From</label>
                            <Select options={workFromOptions} isSearchable={false} defaultValue={workFromOptions[0]} />
                        </div>
                    </div>
                </div>
              }
              <div className="row mx-0 shiftBidApproval-dialog-content mb-4 px-0" >
                <div className={`col-sm-3 d-flex justify-content-center ${classes['shift']} ps-0`}>
                  <input type="checkbox" className="checkbox-input" onClick={handleD2Click} />
                  <div className={d2workFrom && p1 === 'd2' || p2 === 'd2'? `d-flex align-items-center text-center justify-content-center ${classes['shift-content']} ${classes['active']} py-2`: `d-flex align-items-center text-center justify-content-center ${classes['shift-content']} py-2`}>
                      <span>D2 Shift</span>
                      {d2workFrom && p1 === 'd2'?
                         <div className={classes['tag']}>P1</div>:d2workFrom && p2 ==='d2'? <div className={classes['tag']}>P2</div>:''
                      }
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="row h-100">
                    <div className="col-sm-6 h-100 ">
                         <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                    <div className="col-sm-6 h-100  pe-0">
                         <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                  </div>
                </div>
              </div>
              {d2workFrom && 
                 <div className='row mb-4' >
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <div className='d-flex flex-column w-100 '>
                            <label>Work From</label>
                            <Select options={workFromOptions} isSearchable={false} defaultValue={workFromOptions[0]} />
                        </div>
                    </div>
                </div>
              }
              <div className="row mx-0 shiftBidApproval-dialog-content mb-4 px-0" >
                <div className={`col-sm-3 d-flex justify-content-center ${classes['shift']} ps-0`}>
                  <input type="checkbox" className="checkbox-input" onClick={handleD3Click} />
                  <div className={d3workFrom && p1 === 'd3' || p2 === 'd3'? `d-flex align-items-center text-center justify-content-center ${classes['shift-content']} ${classes['active']} py-2`: `d-flex align-items-center text-center justify-content-center ${classes['shift-content']} py-2`}>
                      <span>D3 Shift</span>
                      {d3workFrom && p1 === 'd3'?
                         <div className={classes['tag']}>P1</div>:d3workFrom && p2 ==='d3'? <div className={classes['tag']}>P2</div>:''
                      }
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="row h-100">
                    <div className="col-sm-6 h-100 ">
                         <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                    <div className="col-sm-6 h-100  pe-0">
                         <label>Start Time</label>
                <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                    </div>
                  </div>
                </div>
              </div>
              {d3workFrom && 
                 <div className='row mb-4' >
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <div className='d-flex flex-column w-100 '>
                            <label>Work From</label>
                            <Select options={workFromOptions} isSearchable={false} defaultValue={workFromOptions[0]} />
                        </div>
                    </div>
                </div>
              }
              

              
            
            

        </Modal.Body>
        <Modal.Footer className="bg-light d-flex justify-content-center">
          <I2cButton
            variant="default" size='x-large'
            onClick={editOnHide}
            className="me-3"
          >
            {" "}
            Cancel{" "}
          </I2cButton>
          <I2cButton variant="primary" size='x-large' onClick={editOnHide}>
            Proceed
          </I2cButton>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

export default AgentSelectShiftBid