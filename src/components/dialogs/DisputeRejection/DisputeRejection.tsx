
import React, { useState } from 'react'
import { I2cButton, I2cMenuItem, I2cSelect, I2cInput } from '@webcomponents/i2cwebcomponents/dist/react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import classes from "../AgentRequestDisputeDialog/AgentRequestDisputeDialog.module.css";





const DisputeRejection = (props:any) => {
    const {show, edithide} = props
    const [disputeType, setDisputeType] = useState('day')

    const options:any = [
        {value :'Day',label:'Day'},
        {value :'Week',label:'Week'},
        {value : "Pay Period" , label:'Pay Period'},
      ]
          
  return (
    <React.Fragment>
    <Modal 
    // {...props} 
    show = {show}
    aria-labelledby="contained-modal-title-vcenter" centered className={`${classes['AgentRequestDisputeDialog']} AgentRequestDisputeDialog`} > 
    <Modal.Body>
        <h2>Disputes Rejection</h2>
        <div className='row mb-4'>
            <div className="col-6">
                <I2cInput type={'number'} label={'Token'} className={classes["tokenInput"]}/>
            </div>
            <div className="col-6">
                 <div className='d-flex flex-column w-100 '>
                      <label>Dispute Type</label>
                      <Select options={options} isSearchable={false}  defaultValue={{ label: props.modalid, value: props.modalid }}/>
                  </div>
            </div>
           
        </div>
        <div className="row">
            <div className="col-12">
                <I2cInput type={'text'} label={'Note to Supervisor/Admin (Reason)'} className={classes["noteInput"]}/>

            </div>
        </div>
       

    </Modal.Body>
    <Modal.Footer className='bg-light d-flex justify-content-center py-4'> 
            <I2cButton variant="default" size='x-large' onClick={edithide} className="me-3"> Cancel </I2cButton>
            <I2cButton variant="primary" size='x-large' onClick={edithide}>Proceed</I2cButton>
    </Modal.Footer>
</Modal>


</React.Fragment>
  )
}

export default DisputeRejection