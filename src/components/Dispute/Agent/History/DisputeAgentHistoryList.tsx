import React from 'react';
import HistoryDetail from './AgentDisputeHistory/HistoryDetail';
import classes from '../AgentDispute.module.css';

export const DisputeAgentHistoryList = (props: any) => {

    let dataSets: any;
    dataSets = props.data;

    // Edit 
    const Edit = (e: any) => {
        alert("Popup");
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

    return (

        <table className={classes['agent-dispute-table']}>
            <thead>
                <tr className='table-header'>
                    <th>Ticket Number</th>
                    <th>Dispute Type</th>
                    <th>Start Date &amp; Time</th>
                    <th>stop Date &amp; Time</th>
                    <th>Hours</th>
                    <th>Note to Supervisor/ Administrator</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {dataSets.map((dataSet: any, index: any) => {
                    return (
                        <React.Fragment key={index}>
                            <tr className='parent-row' id={"parent_id" + index} data-id={index} onClick={(e) => handleClick(e)}>
                                <td> {dataSet.ticket_no}</td>
                                <td>{dataSet.dispute_type}</td>
                                <td>{dataSet.start_date}</td>
                                <td>{dataSet.stop_date}</td>
                                <td>{dataSet.hours}</td>
                                <td>{dataSet.note}</td>
                                <td><span className={"status-badge status" + dataSet.status}>{dataSet.status}</span></td>
                            </tr>
                            
                            <tr id={"child_id" + index} data-id={index} className="hidden">
                                {dataSet.data ? <td colSpan={9}> <HistoryDetail className='child-table' data={dataSet.data} /> </td> : <></>}
                            </tr>
                        </React.Fragment>
                    )
                })}
            </tbody>
        </table>
    );

}

export default DisputeAgentHistoryList;
