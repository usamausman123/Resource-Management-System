import { I2cButton } from '@webcomponents/i2cwebcomponents/dist/react';
import { Home2, Monitor } from 'iconsax-react';
import React, { useRef, useState } from 'react'
import DateRangeDropdown from '../../common/DateRangeDropdown/DateRangeDropdown';
import AgentSelectShiftBid from '../dialogs/AgentSelectShiftBid/AgentSelectShiftBid';
import PaginatedItems from '../react-paginate/react-paginate';
import ScheduleCalender from './Schedule-Calender/ScheduleCalender';
import classes from './ScheduledTime.module.css';
import { agentShiftsBidData } from './shiftsBidData';

const ScheduledTime = () => {
    const [tabVal, setTabVal] = useState('Schedule');
    const [shiftsBidDataSource, setShiftsBidDataSource] = useState(agentShiftsBidData);
    const [modalShow, setModalShow] = useState(false);
    const footerRef = useRef<HTMLDivElement>(null); // page footer reference
    const scrollBoxRef = useRef<HTMLDivElement>(null); // scrollbox reference in which scroll will be applied
    let tabValHolder: string = "Schedule"; // it will be either 'Schedule' or 'Shifts Bid'
    const tabChange = (val: string) => {
        tabValHolder = val;
        setTabVal(tabValHolder);
    }

    return (
        <div className={classes['schedule-time-wrapper']}>
            <div className='p-4 header-content'>
                <div className='row justify-content-between align-items-center'>
                    <div className='col-xxl-4 col-xl-3 d-flex justify-content-xl-start justify-content-center'>
                        <h1>Scheduled Time</h1>
                    </div>
                    <div className='col-xl-4 justify-content-center d-flex mt-xl-0 mb-xl-0 mb-3 mt-3'>
                        <div className={`nav btn-group btn-group-sm d-inline-block ${classes['tabs-toggle']}`} role="group" aria-label="toggle button group">
                            <input type="radio" className={classes['btn-check']} name="btnradio" id="btnradio1" onChange={() => {tabChange('Schedule'); } } autoComplete="off"  defaultChecked aria-label="Schedule Tab" />
                            <label className={`btn ${classes['btn-outline-secondary']}`} htmlFor="btnradio1">Schedule</label>

                            <input type="radio" className={classes['btn-check']} name="btnradio" id="btnradio2" onChange={() => { tabChange('Shifts Bid'); } } autoComplete="off" value="0" aria-label="Shifts Bid Tab" />
                            <label className={`btn ${classes['btn-outline-secondary']}`} htmlFor="btnradio2">Shifts Bid</label>
                        </div>
                    </div>
                    <div className='d-flex justify-content-xl-end justify-content-center flex-wrap align-items-center col'>
                        <div className="dropdown d-inline-block">
                            {
                                tabVal==='Schedule' ? 
                                <DateRangeDropdown scheduledTime={true} /> :
                                <DateRangeDropdown />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                tabVal==='Schedule' &&
                <React.Fragment>
                    <div className={classes['report-summary']}>
                        <div>
                            Current Scheduled Week
                            <span className={classes['blue']}>02</span>
                        </div>
                        <div>
                            Future Scheduled Week
                            <span className={classes['green']}>02</span>
                        </div>
                        <div>
                            Leaves
                            <span className={classes['red']}>01</span>
                        </div>
                        <div>
                            Current Scheduled Hours
                            <span className={classes['blue']}>80</span>
                        </div>
                        <div>
                            PTO Balance
                            <span className={classes['blue']}>4H 30M</span>
                        </div>
                        <div>
                            PTO Consumed
                            <span className={classes['blue']}>1H 30M</span>
                        </div>
                    </div>
                    <ScheduleCalender />
                </React.Fragment>
            }
            {
                shiftsBidDataSource && shiftsBidDataSource.length && tabVal==='Shifts Bid' &&
                <React.Fragment>
                    <div className={`${classes['tbl-container']} w-100 slim-scroll`}>
                        <table className={classes['standard-tbl-structure']}>
                            <thead>
                                <tr>
                                    <th className="text-start ps-4">Start Date &amp; Time</th>
                                    <th className="text-start">Stop Date &amp; Time</th>
                                    <th className="text-start">Shifts Offer by Supervisor</th>
                                    <th className="text-start">My Shift Priorities</th>
                                    <th className="text-start">Shifts Approved by Supervisor</th>
                                    {/* <th className="text-start" style={{width: '21%'}}>Note to Manager/Administrator</th> */}
                                    <th className="text-end pe-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={6} className="p-0 border-0">
                                        <div className="table-scroll" ref={scrollBoxRef} >
                                        <table className='table-body-content'>
                                            <tbody>
                                            {
                                                shiftsBidDataSource && shiftsBidDataSource.length && shiftsBidDataSource.map((dataSet: any, index: any) => {
                                                return (
                                                    <tr key={dataSet.recordId}>
                                                        <td className="text-start ps-4">{dataSet.startDateTime}</td>
                                                        <td className="text-start">{dataSet.stopDateTime}</td>
                                                        <td className="text-start">
                                                            {
                                                                dataSet.offeredShifts && dataSet.offeredShifts.length && dataSet.offeredShifts.map((shift:string, index: number) => {
                                                                    return (
                                                                        <div key={dataSet.recordId + '' + index} className="d-inline-block me-2 mb-2">
                                                                            <span className={`${classes['status-badge']} ${classes.dotless} ${ shift.includes('Regular') ? classes.purple : (shift.includes('D1') ? classes.yellow : (shift.includes('D2') ? classes.blue : classes.green)) } d-flex align-items-center`}>
                                                                                <i className="me-1">
                                                                                    {
                                                                                        shift.includes('D3') ? 
                                                                                        <React.Fragment>
                                                                                            <Monitor className='me-1' size="10" variant="Bold"/> 
                                                                                            <Home2 size="10" variant="Bold"/>
                                                                                        </React.Fragment> :
                                                                                        <Monitor size="10" variant="Bold"/>
                                                                                    }
                                                                                </i>{shift}
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                })
                                                            }
                                                        </td>
                                                        <td className="text-start">
                                                            {
                                                                (dataSet.agentShiftsPriorities && dataSet.agentShiftsPriorities.length) ? dataSet.agentShiftsPriorities.map((shift:string, index: number) => {
                                                                    return (
                                                                        <div key={dataSet.recordId + '' + index} className="d-inline-block me-2 mb-2">
                                                                            <span className={`${classes['status-badge']} ${classes.dotless} ${ shift.includes('Regular') ? classes.purple : (shift.includes('D1') ? classes.yellow : (shift.includes('D2') ? classes.blue : classes.green)) } d-flex align-items-center`}>
                                                                                <i className="me-1">
                                                                                    {
                                                                                        shift.includes('D3') ? 
                                                                                        <React.Fragment>
                                                                                            <Monitor className='me-1' size="10" variant="Bold"/> 
                                                                                            <Home2 size="10" variant="Bold"/>
                                                                                        </React.Fragment> :
                                                                                        <Monitor size="10" variant="Bold"/>
                                                                                    }
                                                                                </i>{shift}
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                }) : <span>-</span>
                                                            }
                                                        </td>
                                                        <td className="text-start">
                                                            {
                                                                (dataSet.agentShiftApprovedbySupervisor && dataSet.agentShiftApprovedbySupervisor.length) ? dataSet.agentShiftApprovedbySupervisor.map((shift:string, index: number) => {
                                                                    return (
                                                                        <div key={dataSet.recordId + '' + index} className="d-inline-block me-2 mb-2">
                                                                            <span className={`${classes['status-badge']} ${classes.dotless} ${ shift.includes('Regular') ? classes.purple : (shift.includes('D1') ? classes.yellow : (shift.includes('D2') ? classes.blue : classes.green)) } d-flex align-items-center`}>
                                                                                <i className="me-1">
                                                                                    {
                                                                                        shift.includes('D3') ? 
                                                                                        <React.Fragment>
                                                                                            <Monitor className='me-1' size="10" variant="Bold"/> 
                                                                                            <Home2 size="10" variant="Bold"/>
                                                                                        </React.Fragment> :
                                                                                        <Monitor size="10" variant="Bold"/>
                                                                                    }
                                                                                </i>{shift}
                                                                            </span>
                                                                        </div>
                                                                    );
                                                                }) : <span>-</span>
                                                            }
                                                        </td>
                                                        <td className="text-end pe-4">
                                                            {/* <span className={`text-center ${classes['status-badge']} ${dataSet.shiftStatus==='Pending' ? classes.yellow : (dataSet.shiftStatus==='Approved' ? classes.green : classes.purple)}`}>{dataSet.shiftStatus}</span> */}
                                                            {/* {
                                                                dataSet.shiftStatus==='Pending' ?
                                                                <I2cBadge variant="light-warning" pill>
                                                                    {dataSet.shiftStatus}
                                                                </I2cBadge> :
                                                                <I2cBadge variant="light-success" pill>
                                                                    {dataSet.shiftStatus}
                                                                </I2cBadge>
                                                            } */}
                                                            {
                                                                dataSet.shiftStatus ?
                                                                <span className={"status-badge status" + dataSet.shiftStatus}>{dataSet.shiftStatus}</span> :
                                                                <I2cButton className='btn-checkin d-md-inline-block d-none' size="small" variant="primary"  onClick={() => setModalShow(true)}>
                                                                    Opt In
                                                                </I2cButton>
                                                            }
                                                            
                                                        </td>
                                                    </tr>
                                                )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                        {modalShow && <AgentSelectShiftBid  show={modalShow} editOnHide={() => setModalShow(false)} />}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>                     
                    </div>
                    <div className="col-md-12 p-4">
                        <PaginatedItems />
                    </div>
                </React.Fragment>
            }
            
        </div>        
    )
}

export default ScheduledTime