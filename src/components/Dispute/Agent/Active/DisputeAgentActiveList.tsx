import React, { useState } from 'react';
import { Edit2 } from 'iconsax-react';
import DisputeAgentActiveListChild from './AgentDisputeActive/DisputeAgentActiveListChild';
import AgentRequestDisputeDialog from '../../../dialogs/AgentRequestDisputeDialog/AgentRequestDisputeDialog';
import classes from '../AgentDispute.module.css';
export const AgentDisputeList = (props: any) => {

    let dataSets: any;
    dataSets = props.data;


    const [modalId, setModalId] = useState('');


    // Edit 
    const Edit = (i:string) => {
        setModalId(i)
        setModalShow(true)
        
    }

    const handleClick = (e: any) => {

        let getDataId = e.currentTarget.getAttribute("data-id");
        var child_id = "child_id" + getDataId;
        if (document.getElementById(child_id)?.hasAttribute('class')) {
            document.getElementById(child_id)?.removeAttribute('class');
        }
        else {
            document.getElementById(child_id)?.setAttribute('class', 'hidden');
        }
    }
    const [modalShow, setModalShow] = useState(false);


    return (
        <React.Fragment>
            <table className={classes['agent-dispute-table']}>
                <thead>
                    <tr className='table-header'>
                        <th className="ps-4">Ticket Number</th>
                        <th>Dispute Type</th>
                        <th>Start Date &amp; Time</th>
                        <th>stop Date &amp; Time</th>
                        <th className="text-center">Hours</th>
                        <th>Note to Supervisor/ Administrator</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dataSets.map((dataSet: any, index: any) => {
                        return (
                            <React.Fragment key={index}>
                                <tr className='parent-row' id={"parent_id" + index}>
                                    <td className="ps-4" data-id={index} onClick={(e) => handleClick(e)}> {dataSet.ticket_no}</td>
                                    <td data-id={index} onClick={(e) => handleClick(e)}>{dataSet.dispute_type}</td>
                                    <td data-id={index} onClick={(e) => handleClick(e)}>{dataSet.start_date}</td>
                                    <td data-id={index} onClick={(e) => handleClick(e)}>{dataSet.stop_date}</td>
                                    <td className="text-center" data-id={index} onClick={(e) => handleClick(e)}>{dataSet.hours}</td>
                                    <td data-id={index} onClick={(e) => handleClick(e)}>{dataSet.note}</td>
                                    <td data-id={index} onClick={(e) => handleClick(e)}><span className={"status-badge status" + dataSet.status}>{dataSet.status}</span></td>
                                    <td className="text-center"><Edit2 size="16" color="#70728F" onClick={() => Edit(dataSet.dispute_type)} /></td>
                                </tr>
                                
                                <tr id={"child_id" + index} data-id={index} className="hidden">
                                    {dataSet.dispute_type === "Pay Period" ? <td colSpan={9}> <DisputeAgentActiveListChild week={dataSet.data} /> </td> : <></> && dataSet.dispute_type == "Week" ? <td colSpan={9}> <DisputeAgentActiveListChild week={dataSet.data} /> </td> : <></>}
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
            {
                modalShow && <AgentRequestDisputeDialog  show={modalShow} editonhide={()=>setModalShow(false)}  modalid={modalId} dataset = {dataSets} />
            }
        </React.Fragment>
    
    );

}

export default AgentDisputeList;
