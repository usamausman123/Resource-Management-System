import React, { useState } from 'react';
import { I2cButton, I2cDialog, I2cBadge} from '@webcomponents/i2cwebcomponents/dist/react';
import Modal from "react-bootstrap/Modal";
import classes from './RequestList.module.css'


function RequestList(props: any) {
    const [open, setOpen] = useState(false);
    const { onHide, show } = props;



    return (
        
    <React.Fragment>
    <Modal
      // {...props}
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`${classes['request-list-dialog']} request-list-dialog `}

    >
      <Modal.Body>
        <h2>Request List</h2>
        <div className="row mb-4">
                    <div className="col-10" ><strong>Scheduled Shift</strong> March 2021</div>
                    <div className="col-2" style={{float:'right', textAlign:"right"}}> <a href="#" style={{color:"#666666"}}>View All</a></div>
                </div>

                <div className={`${classes['flex-detail']} row mb-4 mx-0`}>
                    <div className="col-70" > Monday 21 March (8:00 AM - 1:00 PM) <p>Paid Time Off</p></div>
                    <div className="col-30" style={{float:'right', textAlign:"right"}}> <I2cBadge className="pending" variant="primary" >Pending</I2cBadge></div>
                </div>

                <div className={`${classes['flex-detail']} row mb-4 mx-0`} >
                    <div className="col-70" >Tuesday 14 March <p>Sick Leave</p></div>
                    <div className="col-30" style={{float:'right', textAlign:"right"}}> <I2cBadge className="approved" variant="success">Approved</I2cBadge></div>
                </div>

                <div className={`${classes['flex-detail']} row mb-4 mx-0`} >
                    <div className="col-70" > Friday 04 March (4:00 PM - 6:00 PM) <p>Unpaid Time Off</p></div>
                    <div className="col-30" style={{float:'right', textAlign:"right"}}> <I2cBadge className="rejected" variant="neutral">Rejected</I2cBadge></div>
                </div>

                <div className={`${classes['flex-detail']} row mb-4 mx-0`} >
                    <div className="col-70" > Tuesday 01 March (6:00 PM - 7:00 PM) <p>Unpaid Time Off</p></div>
                    <div className="col-30" style={{float:'right', textAlign:"right"}}> <I2cBadge className="approved" variant="success">Approved</I2cBadge></div>
                </div>


       
      </Modal.Body>
      <Modal.Footer className="bg-light d-flex justify-content-center py-4">
        <I2cButton variant="default" size="x-large" onClick={onHide}>
          Close
        </I2cButton>
      </Modal.Footer>
    </Modal>
  </React.Fragment>
    );

}

export default RequestList;


interface PopupDetails {
    id: number,
    title: string,
    open: Boolean,
    onI2cAfterHide: (active: boolean) => void,
    setOpen: (active: boolean) => void
}
