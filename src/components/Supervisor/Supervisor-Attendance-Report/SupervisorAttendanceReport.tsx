import DateRangeDropdown from '../../../common/DateRangeDropdown/DateRangeDropdown';
import { requestsTabData, singleAgentShiftsData } from "../agentsAttendanceData";
import { ArrowDown2, ArrowLeft, CloseCircle, More, TickCircle } from 'iconsax-react';
import userImage from '../../../assets/profile.png';
import { agentsData } from '../Attendance-Search/AgentsData';
import AgentSearch from '../../AgentSearch/AgentSearch';
import PaginatedItems from '../../react-paginate/react-paginate';
import { I2cButton, I2cDropdown, I2cMenu, I2cMenuItem } from '@webcomponents/i2cwebcomponents/dist/react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../Supervisor-Attendance/SupervisorAttendance.module.css';
import componentClasses from './SupervisorAttendanceReport.module.css';
import '../sticky-table.css';

const SupervisorAttendanceReport = () => {
    const footerRef = useRef<HTMLDivElement>(null); // page footer reference
    const scrollBoxRef = useRef<HTMLDivElement>(null); // scrollbox reference in which scroll will be applied
    const [tabVal, setTabVal] = useState('Shifts');
    const [singleAgentDataSource, setSingleAgentDataSource] = useState<any>(singleAgentShiftsData); // Shifts tab data
    const [requestsDataSource, setRequestsDataSource] = useState<any[]>(requestsTabData); // Requests tab data
    const [showAgentsSearch, setShowAgentsSearch] = useState(false);
    let tabValHolder: string = "Requests"; // it will be either 'Schedule' or 'Shifts Bid'
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let agentsDatasource = [...agentsData];
    
    const tabChange = (val: string) => {
        tabValHolder = val;
        setTabVal(tabValHolder);
    }
    const onfilterData = (filteredData: any[]) => {
        agentsDatasource = [...filteredData];
    }
    const formatAMPM = (date: Date) => {
        let hours = date.getHours();
        let minutes: any = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        let formattedTime = hours + ':' + minutes + ' ' + ampm;
        return formattedTime;
    }

    return (
        <React.Fragment>

            <div className='pb-3'>
                <div className="d-flex align-items-center resource-detail">
                    <div className="me-3 position-relative">
                        <Link to='/supervisor-attendance' className="btn btn-back btn-sm ps-0 pe-1 font-12 me-3"><i><ArrowLeft size="20" color="#222" /></i></Link><img src={userImage} className="media-img" alt="user pic" />
                    </div>
                    <div className="media-body font-12 d-flex align-items-center">
                        <div className="me-3">
                            <span className="resource-name d-block">Rojer Asclene Johnson</span>
                        </div>
                        <div className="dropdown d-inline-block me-3">
                            <button className={`btn btn-sm ${componentClasses['resource-dropdown-circle-btn']}` } onClick={() => setShowAgentsSearch(prevState => !prevState)}> 
                                <ArrowDown2 size="10" color="#46B0E6" />
                            </button>
                            { showAgentsSearch && <AgentSearch data={agentsData} setData={onfilterData} hideAgentSearch= {() => setShowAgentsSearch(prevState => !prevState)} /> }
                        </div>
                    </div>
                </div>
            </div>    
            
            {/* <h2>{'report view : ' + reportView  + ' Tab view : ' + tabVal}</h2> */}
            <div className={classes['attendance-wrapper']}>
                <div className='p-4 header-content'>
                    <div className='row justify-content-between align-items-center'>
                        <div className='col-xxl-4 col-xl-3 d-flex justify-content-xl-start justify-content-center'>
                            <h1>Attendance &amp; Schedule</h1>
                        </div>
                        <div className='col-xl-3 justify-content-center d-flex mt-xl-0 mb-xl-0 mb-3 mt-3'>
                            <div className={`nav btn-group btn-group-sm d-inline-block ${classes['tabs-toggle']}`} role="group" aria-label="toggle button group">
                                <input type="radio" className={classes['btn-check']} name="btnradio" id="btnradio1" onChange={() => {tabChange('Shifts'); /* tableHeight(); */ } } autoComplete="off"  defaultChecked aria-label="Schedule Tab" />
                                <label className={`btn ${classes['btn-outline-secondary']}`} htmlFor="btnradio1">Shifts</label>

                                <input type="radio" className={classes['btn-check']} name="btnradio" id="btnradio2" onChange={() => { tabChange('Requests');  /* tableHeight(); */ } } autoComplete="off" value="0" aria-label="Shifts Bid Tab" />
                                <label className={`btn ${classes['btn-outline-secondary']}`} htmlFor="btnradio2">Requests</label>
                            </div>
                        </div>
                        <div className='d-flex justify-content-xl-end justify-content-center flex-wrap align-items-center col'>
                            <div className="dropdown d-inline-block me-1">
                                <I2cDropdown>
                                    <I2cButton className={componentClasses['download-dropdown-button']} size="large" slot="trigger" caret>
                                        Download
                                    </I2cButton>
                                    <I2cMenu className={componentClasses['download-dropdown']}>
                                        <I2cMenuItem className={componentClasses['download-dropdown-item']}>PDF</I2cMenuItem>
                                        <I2cMenuItem className={componentClasses['download-dropdown-item']}>XLS</I2cMenuItem>
                                        <I2cMenuItem className={componentClasses['download-dropdown-item']}>CSV</I2cMenuItem>
                                    </I2cMenu>
                                </I2cDropdown>
                            </div>
                            <div className="dropdown d-inline-block me-3">
                                <DateRangeDropdown />
                            </div>
                            <div className="nav btn-group btn-group-sm d-inline-block tabs-toggle view-switch-tabs" role="group" aria-label="toggle button group">
                                <I2cButton size="small" variant="primary">
                                    + Add Schedule
                                </I2cButton>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    tabVal === 'Shifts' &&
                    <React.Fragment>
                        <div className={classes['report-summary']}>
                            <div className="">
                                Total Scheduled Hours
                                <span className={classes['blue']}>220</span>
                            </div>
                            <div>
                                Available Hours
                                <span className={classes['green']}>215</span>
                            </div>
                            <div>
                                Leaves
                                <span className={classes['red']}>01</span>
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
                        <div>
                            <div className="table-wrapper sticky-table">
                                <div className="table">
                                    <div className="thead">
                                        <div className="tr">
                                            <div className="th right-shadow-cell">Date</div>
                                        </div>
                                        {
                                            singleAgentDataSource && singleAgentDataSource['attendanceDetail'] &&
                                            Object.keys(singleAgentDataSource['attendanceDetail']).map((singleDate: any, index) => {
                                                return (
                                                    <div key={singleDate + index} className={`tr ${singleAgentDataSource['attendanceDetail'][singleDate]['onLeave'] ? 'leave-row' : ''} ${!singleAgentDataSource['attendanceDetail'][singleDate]['hasShift'] ? 'no-shift-row' : ''}`}>
                                                        <div className="td right-shadow-cell">
                                                            {monthNames[new Date(singleDate).getUTCMonth()]  + ' ' + new Date(singleDate).getDate() + ', ' + new Date(singleDate).getFullYear()}
                                                            
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <div className="tbody">
                                        <div className='d-inline-block' style={{'minWidth': '100%'}}>
                                            <div className="tr p-0">
                                                <div className="th">Login</div>
                                                <div className="th">Logout</div>
                                                <div className="th">Call Time</div>
                                                <div className="th">Training Time</div>
                                                <div className="th">Ticket Management</div>
                                                <div className="th">Case Management</div>
                                                <div className="th">QA Time</div>
                                                <div className="th">Schedule HOURS</div>
                                                <div className="th">Break Time</div>
                                                <div className="th">Paid Time Off</div>
                                                <div className="th">Flex HOURS</div>
                                                <div className="th">UNPAID TIME OFF APPROVED</div>
                                                <div className="th">UNPAID TIME OFF PENDING</div>
                                            </div>
                                            {
                                                singleAgentDataSource && singleAgentDataSource['attendanceDetail'] &&
                                                Object.values(singleAgentDataSource['attendanceDetail']).map((singleDateData: any, index) => {
                                                    return (
                                                        <div key={singleDateData + index} className={`tr p-0 ${singleDateData.onLeave ? 'leave-row justify-content-center' : ''} ${!singleDateData.hasShift ? 'no-shift-row justify-content-center' : ''}`}>
                                                            {
                                                                (singleDateData.onLeave && singleDateData.hasShift) ? <div className="td border-0"> Leave </div> :
                                                                (
                                                                    ((!singleDateData.onLeave && !singleDateData.hasShift)) ? <div className="td border-0"> No Shift </div> :
                                                                    <React.Fragment>
                                                                        <div className="td">
                                                                            {singleDateData.loginTime.length && formatAMPM(new Date(singleDateData.loginTime))}
                                                                        </div>
                                                                        <div className="td">
                                                                            {singleDateData.logoutTime.length && formatAMPM(new Date(singleDateData.logoutTime))}
                                                                        </div>
                                                                        <div className="td">{singleDateData.callTime}</div>
                                                                        <div className="td">{singleDateData.trainingsTime}</div>
                                                                        <div className="td">{singleDateData.ticketManagementDuration}</div>
                                                                        <div className="td">{singleDateData.caseManagementDuration}</div>
                                                                        <div className="td">{singleDateData.qaTime}</div>
                                                                        <div className="td scheduled-hours-cell">{singleDateData.scheduledHours}</div>
                                                                        <div className="td">{singleDateData.breakHours}</div>
                                                                        <div className={`td ${singleDateData.paidTimeOff!=='0' ? 'paid-timeoff-cell' : ''}`}>{singleDateData.paidTimeOff}</div>
                                                                        <div className={`td ${singleDateData.flexHours!=='0' ? 'flex-hours-cell' : ''}`}>{singleDateData.flexHours}</div>
                                                                        <div className={`td ${singleDateData.unpaidTimeOff!=='0' ? 'unpaid-timeoff-approved-cell' : ''}`}>{singleDateData.unpaidTimeOff}</div>
                                                                        <div className={`td ${singleDateData.unpaidTimeOffPending!=='0' ? 'unpaid-timeoff-pending-cell' : ''}`}>{singleDateData.unpaidTimeOffPending}</div>
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                            
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="tfooter">
                                        <div className="tr">
                                            <div className="th left-shadow-cell">Avaiable Time</div>
                                            <div className="th">Occurrences</div>
                                        </div>
                                        {
                                            singleAgentDataSource && singleAgentDataSource['attendanceDetail'] &&
                                            Object.values(singleAgentDataSource['attendanceDetail']).map((singleDateData: any, index) => {
                                                return (
                                                    <div key={singleDateData + index} className={`tr ${singleDateData.onLeave ? 'leave-row' : ''} ${!singleDateData.hasShift ? 'no-shift-row' : ''}`}>
                                                        <div className="td left-shadow-cell">{singleDateData.availableTime}</div>
                                                        <div className={`td ${singleDateData.occurences!=='0' ? 'occurence-cell' : ''}`}>{singleDateData.occurences}</div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </React.Fragment>
                }
                {
                    tabVal === 'Requests' &&
                    <div>
                        <div className={`${classes['tbl-container']} w-100 slim-scroll`}>
                            <table className={`${componentClasses['leave-table']} ${classes['standard-tbl-structure']}`}>
                                <thead>
                                    <tr>
                                        <th className="text-start ps-4">Start Date &amp; Time</th>
                                        <th className="text-start">Stop Date &amp; Time</th>
                                        <th className="text-center">Location</th>
                                        <th className="text-center">Reason</th>
                                        <th className="text-center">Hours</th>
                                        <th className="text-start">Notes</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                        <th className={`text-center ${componentClasses['status-dropdown']}`}>
                                            <div className="dropdown d-inline-block  ">
                                                <button className="btn btn-sm dropdown-toggle pb-0 pt-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i><More size="20" color="#222" /></i>
                                                </button>
                                                <ul className="dropdown-menu menu-right">
                                                    <li><a className={`dropdown-item ${componentClasses['dropdown-item']}`} href="#">Aprove All</a></li>
                                                    <li><a className={`dropdown-item ${componentClasses['dropdown-item']}`} href="#">Reject all</a></li>
                                                </ul>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={9} className="p-0 td-scroll border-bottom-0">
                                            <div className="table-scroll" ref={scrollBoxRef} >
                                                <table className="table-body-content">
                                                    <tbody>
                                                        {
                                                            requestsDataSource.length && 
                                                            requestsDataSource.map((data, index) => {
                                                                return (
                                                                    <tr className="no-border-bottom bg-white" id={'tr' + ++index} key={data.recordId}>
                                                                        <td className="text-start ps-4">{data.startDateTime} </td>
                                                                        <td className="text-start">{data.stopDateTime} </td>
                                                                        <td className="text-center">{data.location}</td>
                                                                        <td className="text-center">{data.reason}</td>
                                                                        <td className="text-center">{data.hours}:00</td>
                                                                        <td className="text-start">{data.note}</td>
                                                                        <td className="normal-letters">
                                                                            <span className={`${componentClasses['status-badge']} ${componentClasses[data.statusType]}`}>{data.status}</span>
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                (data.status==='Pending' || data.status==='Denied') &&
                                                                                // <a  href="#" className={componentClasses['action-icon']}>
                                                                                    <i className={`cursor-pointer ${componentClasses['action-icon']}`}><TickCircle size="20" color="#666" className={componentClasses['approve-icon']} /></i>
                                                                                // </a>
                                                                            }
                                                                            {
                                                                                
                                                                                data.status==='Approved' &&
                                                                                // <a href="#" className={`${componentClasses['action-icon']} ${componentClasses.disabled}`}>
                                                                                    <i className={`${componentClasses['action-icon']} ${componentClasses.disabled}`}><TickCircle size="20" color="#666" className={componentClasses['approve-icon']} /></i>
                                                                                // </a>
                                                                            }
                                                                            {
                                                                                (data.status==='Pending' || data.status==='Approved') &&
                                                                                // <a  href="#" className={componentClasses['action-icon']}>
                                                                                    <i className={`cursor-pointer ${componentClasses['action-icon']}`}><CloseCircle size="20" color="#666" className={componentClasses['reject-icon']} /></i>
                                                                                // </a>
                                                                            }
                                                                            {
                                                                                data.status==='Denied' &&
                                                                                // <a  href="#" className={`${componentClasses['action-icon']} ${componentClasses.disabled}`}>
                                                                                    <i className={`${componentClasses['action-icon']} ${componentClasses.disabled}`}><CloseCircle size="20" color="#666" className={componentClasses['reject-icon']} /></i>
                                                                                // </a>
                                                                            }
                                                                        </td>
                                                                        <td className={componentClasses['status-dropdown']}></td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                }
                <div className="bg-white p-4" ref={footerRef}>
                    <PaginatedItems />
                </div>

            </div>
        </React.Fragment>
    )
}

export default SupervisorAttendanceReport