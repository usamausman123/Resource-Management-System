import  { useState } from 'react';
import { I2cButton, I2cDialog, I2cInput, I2cTextarea } from '@webcomponents/i2cwebcomponents/dist/react';
import './dialog.css';
// import "react-datepicker/dist/react-datepicker.css";
import  DateSelector  from '../calendar/DateSelector';
import { TimeSelector } from '../calendar/TimeSelector';
import { Dialog, DialogTitle, SelectChangeEvent } from '@mui/material';
import DropDownSelector from '../../common/Dropdown-Selector/DropDownSelector';

function DisputeModal(props: any) {

    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [requestType, setRequestType] = useState('');
    const [leaveType, setLeaveType] = useState('');

    function handleSubmit(event: any) {
        event.preventDefault();
        alert('All fields are valid!');
    }
    function startDateChangeHandler(value:any) {
        setStartDate(value);
    }
  
    function endDateChangeHandler(value:any) {
        setEndDate(value);
    }
    
    const requestTypeChangeHandler = (event: SelectChangeEvent) => {
        setRequestType(event.target.value);
    };
    const leaveTypeChangeHandler = (event: SelectChangeEvent) => {
        setLeaveType(event.target.value);
    };

    const closeModalHandler = () => {
        // setOpen(false);
        props.closeModal(false);
    }

    return (
        <>
            {/* <Dialog className="timeoff-dialog" label="Request Time Off (Paid/Unpaid)" open={open} onI2cAfterHide={() => setOpen(false)}> */}
            {/* <Dialog className="timeoff-dialog" open={props.open} onClose={() => setOpen(false)}> */}
            <Dialog className="dispute-dialog" open={props.openModal} onClose={closeModalHandler}>
                <DialogTitle className='dispute-dialog-heading'>{props.title}</DialogTitle>

                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-6 mb-3'>
                            <I2cInput type='number' className='dispute-modal-text-field' label="Ticket Number" size="small" />
                            {/* <DropDownSelector className='w-100' dropdownId="request-type" label="Ticket Number" dropdownValues= {['PTO (Paid Time Off)', 'Unpaid Time Off']} /> */}
                        </div>
                        <div className='col-6 mb-3'>
                            <DropDownSelector className='w-100' dropdownId="dispute-type" label="Dispute Type" dropdownValues= {['Day','Week']} />
                        </div>

                        <div className='col-6 mb-3'>
                            <DateSelector className='w-100' text='From Date'  value={startDate} onChange={startDateChangeHandler} />
                        </div>
                        <div className='col-6 mb-3'>
                            <DateSelector className='w-100' text='To Date' value={endDate} onChange={endDateChangeHandler} />
                        </div>

                        <div className='col-6 mb-3'>
                            <TimeSelector className='w-100' label={'Start Time'}/>
                        </div>
                        <div className='col-6 mb-3'>
                            <TimeSelector className='w-100' label={'End Time'} />
                        </div>
                    </div>
                    { props.isStatsView &&
                        <div className='row m-0'>
                            <div className='primary-badge d-flex'>
                                <span className='flex-grow-1'>Total PTO Requested</span>
                                <span className='flex-shrink-0'>9h 30m</span>
                            </div>
                        </div>
                    }
                    <I2cTextarea className='text-area' resize="none" size='small' rows={1} name="comment"  label="Note to Manager/Administrator" required></I2cTextarea>
                </form>

                <div className='footer text-center'>
                    <I2cButton className='me-4' size="large" onClick={closeModalHandler}>Cancel</I2cButton>   
                    <I2cButton variant="primary" size="large" onClick={closeModalHandler}>Submit for Approval</I2cButton>
                </div>

            </Dialog>

            {/* {props.isStatsView && <I2cButton className="button-default"  onClick={() => setOpen(true)}>{props.btnText}</I2cButton>} */}
        </>
    );

}

export default DisputeModal;
