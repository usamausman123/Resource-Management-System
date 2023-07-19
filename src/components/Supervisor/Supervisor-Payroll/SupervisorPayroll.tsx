import React, { useEffect, useRef, useState } from 'react'

import DateRangeDropdown from '../../../common/DateRangeDropdown/DateRangeDropdown';
import { multiAgentsPayrollData } from './supervisorPayrollData';
import { agentsData } from '../Attendance-Search/AgentsData';
import { setHeight } from '../../../common/heightHandler';
import AgentSearch from '../../AgentSearch/AgentSearch';
import { I2cButton, I2cDropdown, I2cMenu, I2cMenuItem } from '@webcomponents/i2cwebcomponents/dist/react';
import { ArrowDown2 } from 'iconsax-react';
import SimpleBarReact from "simplebar-react";
import PaginatedItems from '../../react-paginate/react-paginate';
import userImage from '../../../assets/profile.png';
import classes from './SupervisorPayroll.module.css';
import '../sticky-table.css';
import { Link } from 'react-router-dom';

const SupervisorPayroll = () => {

    const footerRef = useRef<HTMLDivElement>(null); // page footer reference
    const scrollBoxRef = useRef<HTMLDivElement>(null); // scrollbox reference in which scroll will be applied
    const [multiAgentsDataSource, setMultiAgentsDataSource] = useState<any>(multiAgentsPayrollData); // agent payroll data in JSON format 
    const [showAgentsSearch, setShowAgentsSearch] = useState(false); // for showing Agent-Search filter component
    const [scrollContainerHeight, setScrollContainerHeight] = useState<number | undefined>(undefined);
    // const location = useLocation(); // for getting the current route path
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let agentsDatasource = [...agentsData]; // used for Agent-Search filter component

    const tableHeight = (): void => {
        const scrollHeight = setHeight(scrollBoxRef.current, footerRef.current);
        // console.log(scrollHeight.substring(0, scrollHeight.length - 2));
        setScrollContainerHeight(scrollBoxRef.current?.clientHeight);
        // console.log(scrollContainerHeight);
        // console.log(scrollBoxRef.current?.clientHeight);
    }
    /* useEffect(() => {
        tableHeight();
        // console.log(scrollBoxRef.current?.clientHeight);
        window.addEventListener('resize', tableHeight);
        // return () => window.removeEventListener("resize", tableHeight);
    }, []); */
    const tBodyData = (
        <div className='d-inline-block' style={{'minWidth': '100%'}}>
            <div className="tr p-0">
                <div className={`th ${classes['table-cell']} ${classes['middle-date-cell']}`}>Monday Mar 10, 2021</div>
            </div>
            <div className="tr p-0">
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>Regular</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>D1</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>D2</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>D3</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>PTOs</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>BER</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>Overtime</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>HOL</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>EPL</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>EPFL</div>
                <div className={`th ${classes['table-cell']} ${classes['blue-cell']}`}>Total</div>
            </div>
            {
                multiAgentsDataSource && multiAgentsDataSource.length > 0 &&
                multiAgentsDataSource.map((agent: any,) => {
                    return (
                        agent && agent['payrollDetail'] &&
                        Object.values(agent['payrollDetail']).map((singleDateData: any, index) => {
                            return (
                            <div key={singleDateData + index} className="tr p-0">
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.Regular ? singleDateData.Regular : '-'}</div>
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.D1 ? singleDateData.D1 : '-'}</div>
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.D2 ? singleDateData.D2 : '-'}</div>
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.D3 ? singleDateData.D3 : '-'}</div>
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.PTOs ? singleDateData.PTOs : '-'}</div>
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.Bereaved ? singleDateData.Bereaved : '-'}</div>
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.Overtime ? singleDateData.Overtime : '-'}</div>
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.HOL ? singleDateData.HOL : '-'}</div>
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.EPL ? singleDateData.EPL : '-'}</div>
                                <div className={`td ${classes['table-cell']}`}>{singleDateData.EPFL ? singleDateData.EPFL : '-'}</div>
                                <div className={`td border-end-0 ${classes['table-cell']}`}>{singleDateData.TotalHours ? singleDateData.TotalHours : '-'}</div>
                            </div>
                            );
                        })
                    );
                })
            }
        </div>
    );
    const onfilterData = (filteredData: any[]) => {
        agentsDatasource = [...filteredData];
    }

    return (
        
        <div className={classes['supervisor-payroll-wrapper']}>
            
            <div className={`p-4 ${classes['header-content']}`}>
                <div className='row justify-content-between align-items-center'>
                    <div className='col-xxl-4 col-xl-3 d-flex justify-content-xl-start justify-content-center'>
                        <h1>Payroll Report</h1>
                    </div>
                    <div className='d-flex justify-content-xl-end justify-content-center flex-wrap align-items-center col'>
                        <div className="dropdown d-inline-block me-1">
                            <I2cDropdown>
                                <I2cButton className={classes['download-dropdown-button']} size="large" slot="trigger" caret>
                                    Download
                                </I2cButton>
                                <I2cMenu className={classes['download-dropdown']}>
                                    <I2cMenuItem className={classes['download-dropdown-item']}>PDF</I2cMenuItem>
                                    <I2cMenuItem className={classes['download-dropdown-item']}>XLS</I2cMenuItem>
                                    <I2cMenuItem className={classes['download-dropdown-item']}>CSV</I2cMenuItem>
                                </I2cMenu>
                            </I2cDropdown>
                        </div>
                        <div className="dropdown d-inline-block me-1">
                            <I2cDropdown>
                                <I2cButton className={classes['download-dropdown-button']} size="large" slot="trigger" caret>
                                    All Locations
                                </I2cButton>
                                <I2cMenu className={classes['download-dropdown']}>
                                    <I2cMenuItem className={classes['download-dropdown-item']}>All Sites</I2cMenuItem>
                                    <I2cMenuItem className={classes['download-dropdown-item']}>New York</I2cMenuItem>
                                    <I2cMenuItem className={classes['download-dropdown-item']}>Los Angeles</I2cMenuItem>
                                    <I2cMenuItem className={classes['download-dropdown-item']}>Chicago</I2cMenuItem>
                                    <I2cMenuItem className={classes['download-dropdown-item']}>Houston</I2cMenuItem>
                                </I2cMenu>
                            </I2cDropdown>
                        </div>
                        <div className='cursor-pointer dropdown d-inline-block me-1' onClick={() => setShowAgentsSearch(prevState => !prevState)}>
                            All Agents
                            <i className="ms-2 float-end"><ArrowDown2 size="16" /></i>
                        </div>
                            {/* <I2cButton className="dateranger-picker-opener" onClick={() => setShowAgentsSearch(prevState => !prevState)} size="large">
                            Select Employee <i className="ms-2"><ArrowDown2 size="12" color="#222" /></i>
                            </I2cButton> */}
                        { showAgentsSearch && <AgentSearch data={agentsData} setData={onfilterData} hideAgentSearch= {() => setShowAgentsSearch(prevState => !prevState)} /> }
                        <div className="dropdown d-inline-block">
                            <DateRangeDropdown />
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes['report-summary']}>
                <div className="">
                    Regular
                    <span className={classes['blue']}>9:00 AM TO 6:00 PM - $0.25</span>
                </div>
                <div>
                    D1
                    <span className={classes['blue']}>6:00 AM TO 2:00 AM - $0.50</span>
                </div>
                <div>
                    D2
                    <span className={classes['blue']}>2:00 AM TO 6:00 AM - $0.75</span>
                </div>
                <div>
                    D3
                    <span className={classes['blue']}>12:00 AM TO 11:59 AM - $0.75(SU)</span>
                </div>
            </div>

            {/* <SimpleBarReact style={{ maxHeight: scrollContainerHeight }}> */}
                <div className="table-wrapper sticky-table" ref={scrollBoxRef}>
                    <div className="table mb-0">
                        <div className="thead">
                            <div className="tr">
                                <div className={`th right-shadow-cell ${classes['three-column-cell']} ${classes['emp-detail-cell']}`}>Employee Details</div>
                            </div>
                            {
                                multiAgentsDataSource && multiAgentsDataSource.length > 0 &&
                                multiAgentsDataSource.map((agent: any) => {
                                    return (
                                        <div key={agent.agentId} className="tr">
                                            <div className={`td justify-content-start right-shadow-cell ps-4 ${classes['three-column-cell']}`}>
                                                <div className="me-3 position-relative">
                                                    <img src={userImage} className="media-img" alt="user pic" />
                                                </div>
                                                <div className='text-start'>
                                                    <Link to={'/supervisor-payroll-report'} className={classes['router-link']}>
                                                        <span>{agent.agentName}</span><br />
                                                        <span style={{color: '#8E90AA'}}>{agent.agentId}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <SimpleBarReact className='d-none d-xl-block' style={{width: 'calc(100% - 700px)'}}>
                            <div className="tbody w-100" style={{overflowX: 'unset'}}>
                                {tBodyData}
                            </div>
                        </SimpleBarReact>
                        <div className="tbody d-block d-xl-none w-auto" style={{overflowX: 'unset'}}>
                            {tBodyData}
                        </div>
                        <div className="tfooter">
                            <div className="tr">
                                <div className={`th left-shadow-cell ${classes['three-column-cell']} ${classes['final-hours-cell']}`}>Final Hours</div>
                                <div className={`th ${classes['three-column-cell']} ${classes['PTO-calculation-cell']}`}>PTO Calculation</div>
                            </div>
                            <div className="tr">
                                <div className={`th left-shadow-cell ${classes['table-cell']} ${classes['yellow-cell']}`}>1st Week</div>
                                <div className={`th ${classes['table-cell']} ${classes['yellow-cell']}`}>2nd Week</div>
                                <div className={`th ${classes['table-cell']} ${classes['yellow-cell']}`}>Total Hrs</div>
                                <div className={`th ${classes['table-cell']} ${classes['green-cell']}`}>Pre. Balance</div>
                                <div className={`th ${classes['table-cell']} ${classes['green-cell']}`}>Earned PTO</div>
                                <div className={`th ${classes['table-cell']} ${classes['green-cell']}`}>Cur. Balance</div>
                            </div>
                            {
                                multiAgentsDataSource && multiAgentsDataSource.length > 0 &&
                                multiAgentsDataSource.map((agent: any) => {
                                    return (
                                        <div key={agent.agentId} className="tr">
                                            <div className={`td left-shadow-cell ${classes['table-cell']}`}>{agent.finalHours['1st_week']}</div>
                                            <div className={`td ${classes['table-cell']}`}>{agent.finalHours['2nd_week']}</div>
                                            <div className={`td ${classes['table-cell']} ${classes['yellow-cell']}`}>{agent.finalHours['total_hours']}</div>
                                            <div className={`td ${classes['table-cell']}`}>{agent.PTO_Calculation['pre_balance']}</div>
                                            <div className={`td ${classes['table-cell']}`}>{agent.PTO_Calculation['earned_PTO']}</div>
                                            <div className={`td border-end-0 ${classes['table-cell']} ${classes['green-cell']}`}>{agent.PTO_Calculation['current_balance']}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            {/* </SimpleBarReact> */}

            <div className="bg-white p-4" ref={footerRef}>
                <PaginatedItems />
            </div>

        </div>
    );
}

export default SupervisorPayroll