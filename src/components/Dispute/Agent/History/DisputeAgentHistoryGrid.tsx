import React from 'react';
import classes from '../AgentDispute.module.css';
export const DisputeAgentHistoryGrid = (props: any) => {
    let dataSets: any;
    dataSets = props.data;

    return (
        <div className={`grid-container ${classes['grid-container']}`}>
            {dataSets.map((dataSet: any, index: any) => {
                return (
                    <React.Fragment key={index}>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" >
                            <div className='component-grid'>
                                <table className='component-grid-table'>
                                    <tbody className='component-grid-tbody'>
                                        <tr className='component-grid-tr'>
                                            <td className='component-grid-td'>
                                                <h5>Ticket Number</h5>
                                                {dataSet.ticket_no}
                                            </td>
                                            <td className='component-grid-td'>
                                                <h5>Dispute Type</h5>
                                                {dataSet.dispute_type}
                                            </td>
                                            <td className='component-grid-td text-end'>
                                                <div className='hourCalendar'>
                                                    <span className="value">{dataSet.hours}</span>
                                                    <span className="unit">Hrs</span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className='component-grid-td'>
                                                <h5>Start Date &amp; Time</h5>
                                                {dataSet.start_date}
                                            </td>
                                            <td className='component-grid-td' colSpan={2}>
                                                <h5>Stop Date &amp; Time</h5>
                                                {dataSet.stop_date}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className='component-grid-td' colSpan={2}>
                                                <h5>Note to Supervisor/Administrator</h5>
                                                {dataSet.note}
                                            </td>
                                            <td className='component-grid-td text-end'>
                                                <span className={"status-badge status" + dataSet.status}>{dataSet.status}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })}
        </div>
    );

}

export default DisputeAgentHistoryGrid;
