import { I2cAvatar, I2cDropdown, I2cMenuItem, I2cButton } from '@webcomponents/i2cwebcomponents/dist/react';
import { TickCircle, CloseCircle ,More} from 'iconsax-react';
import { useState } from 'react';
import Toaster from '../../../common/Toaster/Toaster';

import classes from "./SupervisorLeaveStyle.module.css";

export const SupervisorLeaveList = (props: any) => {

    const [toggleToaster, setToggleToaster] = useState(false);
		const [toggleType, setToggleType] = useState('success');
		const [toasterContent, setToasterContent] = useState(
			{
				heading: '',
				subHeading: ''
			}
		);
		let dataSets: any;
    dataSets = props.data;

    // Edit 
    const Edit = (e: any) => {
        alert("Popup");
    }

    // Delete
    const Delete = (e: any) => {
        alert("Popup");
    }

    // Handler
    const handleClick = (e: any) => {
        alert("Popup");
    }
    const onCloseToast = () => {
        setToggleToaster(false)
    }

    return (
        <>
            <table className={`${classes.supervisorLeave} ${classes.listMode}`}>
                <thead>
                    <tr className='table-header'>
                        <th className='ps-4'>Name</th>
                        <th>Location</th>
                        <th>Start Date &amp; Time</th>
                        <th>Stop Date &amp; Time</th>
                        <th>Reason</th>
                        <th>Hours</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th className={`pe-4 ${classes.moreAdjustment} `}> 
                            <div>Actions</div> 
                            <I2cDropdown className={classes.actionMenu}>
                                <I2cButton slot="trigger"> <More size="16" /></I2cButton>
                                <I2cMenuItem onClick={handleClick}>Approve All</I2cMenuItem>
                                <I2cMenuItem onClick={handleClick}>Reject All</I2cMenuItem>
                            </I2cDropdown>
                        </th>                        
                    </tr>
                </thead>
                <tbody>
                    {dataSets.map((dataSet: any, index: any) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <I2cAvatar className="me-3" image={dataSet.image} label="Agent Image" />
                                    <span className="d-inline-block mb-0 align-middle">
                                        {dataSet.agent_name} 
                                        <span className='d-block'> {dataSet.ticket_number}</span>
                                    </span>
                                </td>
                                <td>{dataSet.city}</td>
                                <td>{dataSet.start_date}</td>
                                <td>{dataSet.stop_date}</td>
                                <td>{dataSet.reason}</td>
                                <td>{dataSet.hour}</td>
                                <td>{dataSet.notes}</td>
                                <td><span className={"status-badge status" + dataSet.status}>{dataSet.status}</span></td>
                                <td>
                                    <TickCircle className="cursor-pointer me-2" size="16" color="#70728F" onClick={() => {setToggleToaster(true); setToggleType('success'); setToasterContent({heading: "I am a heading", subHeading: "I am a sub heading"}); }} />
                                    <CloseCircle className="cursor-pointer" size="16" color="#70728F" onClick={() => {setToggleToaster(true); setToggleType('error'); setToasterContent({heading: "I am a error heading", subHeading: "I am a error sub heading"}); }} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                { toggleToaster && <Toaster heading={toasterContent.heading} subHeading={toasterContent.subHeading} type={toggleType} closeToaster={onCloseToast} />}
            </div>

        </>
    );

}

export default SupervisorLeaveList;
