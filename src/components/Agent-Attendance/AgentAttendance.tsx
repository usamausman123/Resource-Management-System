import React, { useEffect, useRef, useState } from "react";
import { setHeight } from "../../common/heightHandler";
import classes from "./AgentAttendance.module.css";
//import "./attendace.css";
import { attendanceRequestTbl, attendanceTbl } from "./attendanceData";
// import { Popover } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import PopOver from "../../common/Popover-component/PopOver";
import { I2cMenuItem, I2cSelect } from "@webcomponents/i2cwebcomponents/dist/react";
import { Category, Diagram } from "iconsax-react";
import DateRangeDropdown from "../../common/DateRangeDropdown/DateRangeDropdown";
import PaginatedItems from "../react-paginate/react-paginate";




let tabValHolder: string = "shifts"; // it will be either 'shifts' or 'requests'
let reportViewHolder: string = "graph"; // it will be either 'graph' or 'grid'
const AgentAttendance = () => {
    const footerRef = useRef<HTMLDivElement>(null); // page footer reference
    const scrollBoxRef = useRef<HTMLDivElement>(null); // scrollbox reference in which scroll will be applied
    const xAxisRef = useRef<HTMLDivElement>(null);
    const [tabVal, setTabVal] = useState('shifts');
    const [reportView, setReportView] = useState('graph');
    const [graphTblData, setGraphTblData] = useState<any[]>([attendanceTbl]); // it will be use to represent graph data which could be 'attendanceTbl' or 'attendanceRequestTbl'
    const [htmlBars, setHtmlBars] = useState<any[]>([]);
    const [anchorElPopover, setAnchorElPopover] = React.useState<HTMLButtonElement | null>(null); // for Material UI Popover toggling
    // const [styles, setStyles] = useState<any>('');
    // let styles: any = '';
    const [xAxisHtml, setXAxisHtml] = useState('');
    // let graphTblData: any[] = []; 

    const tableHeight = (): void => {
        setTimeout(() => {
            setHeight(scrollBoxRef.current, footerRef.current, 1400);
        });
    }

    useEffect(() => {
        // tableHeight();
        // console.log(scrollBoxRef.current?.children[0]?.getBoundingClientRect().top);
        // console.log(scrollBoxRef.current?.nativeElement.getBoundingClientRect().top);
        tabValHolder = tabVal;
        reportViewHolder = reportView;
        graphInit();
    }, []);

    const graphInit = () => {
        // graphTblData = data;
        let data: any[] = [];
        if (reportViewHolder === 'graph') {
            console.log('tab value: ', tabValHolder);
            if (tabValHolder === 'requests') {
                data = [...attendanceRequestTbl];
                // setGraphTblData([...attendanceRequestTbl]);
            } else {
                data = [...attendanceTbl];
            }
            console.log(data.length);
            setGraphTblData([...data]);
        }
        // setGraphTblData([...data]);
        console.log(graphTblData);
        // console.log(data);
        setHtmlBars ([]);
        let elementsTemp: any[] = []
        let elements: any[] = []
        let minStart = 25;
        let maxEnd = 0;
    
        let xAxisHtmlContainer: any[] = [];
        let elemetWidth: any;
        let radiusCss = '';
        let promis = new Promise<any>((resolve, reject) => {
          setTimeout(() => {
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].graphData.length; j++) {
                if (data[i].graphData[j]['start'] < minStart) {
                  minStart = data[i].graphData[j]['start'];
                }
                if (data[i].graphData[j]['end'] > maxEnd) {
                  maxEnd = data[i].graphData[j]['end'];
                }
              }
            }
            for (let i = minStart; i <= maxEnd; i++) {
                xAxisHtmlContainer.push('<i class="x-axis-element">' + i + ':00 AM</i>');
                // let iTag = <i className="x-axis-element"> {i} :00 AM</i>;
                // xAxisHtmlContainer.push(iTag);
            }
            // xAxisHtml = xAxisHtmlContainer.join("");
            setXAxisHtml(xAxisHtmlContainer.join(""));
            resolve('Draw Chart Now');
            console.log(xAxisRef);

          });
        })
        promis.then((val) => {
            console.log(val);
            let box: any = xAxisRef;
            let xAxisWidth:number = 0;
            setTimeout(() => {
                xAxisWidth = box.current.offsetWidth / (maxEnd - minStart + 1);
                // console.log('data: ', data);
                let tempStyle:any= '';
                for (let i = 0; i < data.length; i++) {
                    
                    for (let j = 0; j < data[i].graphData.length; j++) {
                        const key = data[i].graphData[j].id;
                
                        if (j < data[i].graphData.length - 1) {
                            if (data[i].graphData[j]['end'] !== data[i].graphData[j + 1]['start']) {
                                radiusCss = 'border-top-right-radius:20px;border-bottom-right-radius:20px';
                            }
                        }
                        if (j > 0) {
                            if (data[i].graphData[j - 1]['end'] !== data[i].graphData[j]['start']) {
                                if (radiusCss !== '') {
                                    radiusCss = 'border-radius:20px;';
                                } else {
                                    radiusCss = 'border-top-left-radius:20px;border-bottom-left-radius:20px';
                                }
                            }
                        }
                        elementsTemp.push(key + ' ' + key + '-' + i + '-' + j);
                        elemetWidth = ((data[i].graphData[j]['end'] - data[i].graphData[j]['start']) * xAxisWidth) + 1;
                        const elementPosition = ((data[i].graphData[j]['start'] - minStart) * xAxisWidth) + 10;
                            tempStyle += '.' + key + '-' + i + '-' + j + '{width:' + elemetWidth + 'px; background:' + data[i].graphData[j]['color'] + '; left:' + elementPosition + 'px;' + radiusCss + '}';
                            //   setStyles(tempStyle);
                        //   console.log(tempStyle);
                        elements.push(elementsTemp);
                        elementsTemp = [];
                        radiusCss = '';
                        // console.log('elements: ', elements);dss
                    
                    }
                    const setElements= elements;
                    // htmlBarsHolder.push(elements);
                    // console.log('html bars: ', htmlBarsHolder);
                    setHtmlBars( (currentState) => [...currentState, setElements]);            
                    elements = [];
                }
        
        
                /* Create style document */
                const css: any = document.createElement('style');
                css.type = 'text/css';
                //   console.log('x axis' , xAxisHtml);
    
                if (css.styleSheet && tempStyle)
                    css.styleSheet.cssText = tempStyle;
                else
                    css.appendChild(document.createTextNode(tempStyle));
            
                /* Append style to the tag name */
                document.getElementsByTagName("head")[0].appendChild(css);
                //   console.log('css : ', css);
                //   console.log('css styles : ', tempStyle);
            });
        }).catch(function (error) { })
    
        // document.querySelectorAll(".graph-piece").addEventListener("click", e => console.log(event.target));
    
    };

    const changeView = (val: string) => {
        reportViewHolder = val;
        console.log(reportViewHolder);
        setReportView(reportViewHolder);
        graphInitOnViewChangeOrTabChange();
        // setTimeout(() => {
        // }, 1000);
    }

    const tabChange = (val: string) => {
        tabValHolder = val;
        setTabVal(tabValHolder);
        graphInitOnViewChangeOrTabChange();
    }

    const graphInitOnViewChangeOrTabChange = () => {
        // console.log('reportView : ', reportView);
        // console.log('tabVal : ', tabVal);
        // if (reportViewHolder === 'graph') {
        //     if (tabValHolder === 'requests') {
        //         // console.log(attendanceRequestTbl);
        //         graphInit([...attendanceRequestTbl]);
        //     } else {
        //         // console.log(attendanceTbl);
        //         graphInit([...attendanceTbl]);f
        //     }
        // }
        console.log('tab value: ', tabValHolder);
        console.log('report value: ', reportViewHolder);
        if (reportViewHolder === 'graph') {    
            graphInit();
        }
    }

    const instanceClicked = (data: any) => { 
        console.log(data);
    }


    /* Material UI Popover configuration start */
    const togglePopoverHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElPopover(event.currentTarget);
    };
    const closePopoverHandler = () => {
        setAnchorElPopover(null);
    };
    const open = !!anchorElPopover;
    /* Material UI Popover configuration  end */


    return (
        <div>
            {/* <h2>{'report view : ' + reportView  + ' Tab view : ' + tabVal}</h2> */}
            <div className={classes['attendance-wrapper']}>
                <div className={classes['attendance-record-container']}>
                    <div className='row justify-content-between align-items-center'>
                        <div className='col-xxl-4 col-xl-3 d-flex justify-content-xl-start justify-content-center'>
                            <h1>Attendance Record</h1>
                        </div>
                        <div className='col-xl-4 justify-content-center d-flex mt-xl-0 mb-xl-0 mb-3 mt-3'>
                            <div className={`${classes['nav']} btn-group btn-group-sm d-inline-block ${classes['tabs-toggle']}`} role="group" aria-label="toggle button group">
                                <input type="radio" className={classes['btn-check']} name="btnradio" id="btnradio1" onClick={() => {tabChange('shifts'); /* tableHeight(); */ } } autoComplete="off"  defaultChecked aria-label="Active Tab" />
                                <label className={`btn + ${classes['btn-outline-secondary']}`} htmlFor="btnradio1"> My Shifts</label>

                                <input type="radio" className={classes['btn-check']} name="btnradio" id="btnradio2" onClick={() => { tabChange('requests');  /* tableHeight(); */ } } autoComplete="off" value="0" aria-label="History Tab" />
                                <label className={`btn ${classes['btn-outline-secondary']}`} htmlFor="btnradio2">Requests</label>
                            </div>
                        </div>
                        <div className='d-flex justify-content-xl-end justify-content-center text-center col-xxl-4 col-xl-5'>
                            <div>
                                {
                                    tabVal === 'requests' && reportView  === 'graph' &&
                                    <div className="dropdown d-inline-block me-3">
                                        <I2cSelect className={classes['time-view-dropdown']} value="minutes-view">
                                            <I2cMenuItem className={classes['time-view-dropdown-item']} value="minutes-view">Minutes View</I2cMenuItem>
                                            <I2cMenuItem className={classes['time-view-dropdown-item']} value="hours-view">Hours View</I2cMenuItem>
                                        </I2cSelect>
                                    </div>
                                }
                                {/* <div className="d-inline-block me-3 dropdown">
                                    <app-date-range (getDates)="getDates($event)" (aplliedDateRange)="getDates2($event)"></app-date-range>
                                </div> */}
                                <div className="dropdown d-inline-block me-3">
                                    <DateRangeDropdown />
                                </div>
                                <div className={`${classes['nav']} btn-group btn-group-sm d-inline-block tabs-toggle view-switch-tabs`} role="group" aria-label="toggle button group">
                                    <input type="radio" className={classes['btn-check']} name="viewType" id="btnradiodisplay2" 
                                        onClick={
                                            () => {
                                                changeView('grid');
                                                // tabVal === 'requests' ? graphInit(attendanceRequestTbl) : graphInit(attendanceTbl); 
                                                // tableHeight();
                                            }
                                        }
                                        autoComplete="off" value="0" aria-label="Grid View Tab" />
                                    <label className={`btn ${classes['btn-outline-secondary']}`} aria-label="Grid-layout-label" htmlFor="btnradiodisplay2"><Category className="mb-1" size="20" color="#000" /><span className="ms-1">Grid</span></label>

                                    <input type="radio" className={classes['btn-check']} name="viewType" id="btnradiodisplay1" 
                                        onClick={
                                            () => {
                                                changeView('graph');
                                                // tableHeight();
                                            }
                                        }
                                        autoComplete="off" defaultChecked aria-label="Graph View Tab" />
                                    <label className={`btn ${classes['btn-outline-secondary']}`} aria-label="List-layout-label" htmlFor="btnradiodisplay1"><Diagram className="mb-1" size="20" color="#000" /> <span className="ms-1">Graph</span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    reportView === 'graph' && graphTblData &&
                    <div>
                        <div className={`${classes['tbl-container']} w-100 slim-scroll`}>
                            {
                                graphTblData.length > 0 &&
                                <table  className={`${classes['standard-tbl-structure']} ${classes['attendance-table']}`}>
                                    <thead>
                                        <tr>
                                            <th style={{width:'120px'}} className={classes['right-shadow-cell']}>
                                                Date
                                            </th>
                                            <th>
                                                { tabVal === 'shifts'? 'Shift Timings' : 'Request Status (Pending/Approved/Decline)' }
                                            </th>
                                            <th style={{width:'100px'}}>
                                                Scheduled
                                            </th>
                                            <th style={{width:'100px'}}>
                                                Available
                                            </th>
                                            <th style={{width:'100px'}}>
                                                break
                                            </th>
                                            <th style={{width:'100px'}}>
                                                occurrence
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={6} className="p-0 td-scroll scrollParent">
                                                <div className="table-scroll " ref={scrollBoxRef}>
                                                    <table className="table-body-content scrollChild">
                                                        <tbody>
                                                            <tr>
                                                                <td className={classes['right-shadow-cell']} width="120"></td>
                                                                <td>
                                                                    <div className={`position-relative ${classes['x-axis']}`} ref={xAxisRef} dangerouslySetInnerHTML={{__html: xAxisHtml}} />
                                                                    {/* <div className={`position-relative ${classes['x-axis']}`} ref={xAxisRef}>
                                                                        {xAxisHtml} {xAxisHtml.length}
                                                                    </div> */}
                                                                </td>
                                                                <td className={classes['left-shadow-cell']} width="100">

                                                                </td>
                                                                <td width="100">

                                                                </td>
                                                                <td width="100">

                                                                </td>
                                                                <td width="100">

                                                                </td>
                                                            </tr>
                                                            {
                                                                
                                                                htmlBars.length && graphTblData.map((item,  i) => { 
                                                                    // console.log('html bar:', htmlBars[i].length);
                                                                    // console.log(htmlBars.length);
                                                                    return (
                                                                        <tr key={i}><td className={`bg-white ${classes['right-shadow-cell']}`}>
                                                                                {item.cellsData?.date}
                                                                            </td>
                                                                            <td className={classes['graph-box']}>
                                                                            
                                                                                { !htmlBars[i].length && <span className={classes['no-shift-text']}>No Shift</span> }
                                                                                
                                                                                <div className={`position-relative ${classes['graph-cell']} ${!htmlBars[i].length ? classes['no-shift'] : ''  }`} 
                                                                                onClick={() =>instanceClicked(item)}>
                                                                                    { 
                                                                                        htmlBars[i].map((graphCell: any, j: number) => {
                                                                                            
                                                                                            // console.log("htmlBars[i]",item.graphData[j]?.id);
                                                                                            if(item.graphData[j]?.id &&  tabVal==='shifts')
                                                                                            {
                                                                                                return <span key={i+j} onClick={togglePopoverHandler} className={`${classes['graph-piece']} d-inline-block ${item.graphData[j]?.id}-${i}-${j}`}> {item.graphData[j].text}</span>;
                                                                                            }
                                                                                            if(item.graphData[j]?.id &&  tabVal==='requests')
                                                                                            {
                                                                                                return <Tooltip key={i+j} title="Request Rejected" placement="bottom"><span className={`${classes['graph-piece']} d-inline-block ${item.graphData[j]?.id}-${i}-${j}`}> {item.graphData[j].text}</span></Tooltip>;
                                                                                            }
                                                                                            return <></>;
                                                                                           

                                                                                        })
                                                                                    }
                                                                                </div>
                                                                                
                                                                            </td>
                                                                            <td className={`text-center bg-white ${classes['left-shadow-cell']}`}>
                                                                                {item.cellsData?.scheduled || 0}
                                                                            </td>
                                                                            <td className="text-center bg-white">
                                                                                {item.cellsData?.available || 0}
                                                                            </td>
                                                                            <td className="text-center bg-white">
                                                                                {item.cellsData?.breakCell || 0}
                                                                            </td>
                                                                            <td className="text-center bg-white">
                                                                                {item.cellsData?.occurrence || 0}
                                                                            </td></tr> 
                                                                    ) 
                                                                    
                                                                }) /* : <tr>No record found {htmlBars.length}</tr> */
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            }

                        </div>
                        <div className={classes['indicators-row']} ref={footerRef}>
                            <div className={`d-inline-block ${classes['chart-indicators']}`}>
                                <span><i className={classes.blue}></i> Actual</span>
                                <span><i className={classes['light-blue']}></i> Break</span>
                                <span><i className={classes['light-red']}></i> Occurrences</span>
                                <span><i className={classes.yellow}></i> Flex </span>
                                <span><i className={classes.green}></i> Paid Time Off  </span>
                                <span><i className={classes.red}></i> Unpaid Time Off (Pending Approvals) </span>
                                <span><i className={classes.purple}></i> Unpaid Time Off (Approved) </span>
                            </div>
                        </div>
                        
                    </div>
                }
                {
                    reportView === 'grid' && tabVal==='shifts' &&
                    <div className='w-100'>
                        <div className={`${classes['tbl-container']} w-100 slim-scroll`}>
                            <table className={`${classes['standard-tbl-structure']} ${classes['table-shifts']}` }>
                                <thead>
                                    <tr>
                                        <th className={classes['right-shadow-cell']}>
                                            Date
                                        </th>
                                        <th>
                                            Login
                                        </th>
                                        <th>
                                            Logout
                                        </th>
                                        <th>
                                            Call Time
                                        </th>
                                        <th>
                                            Trainings Time
                                        </th>
                                        <th>
                                            Ticket Managemnet
                                        </th>
                                        <th>
                                            Case Managemnet
                                        </th>
                                        <th>
                                            QA Time
                                        </th>
                                        <th>
                                            Scheduled Time
                                        </th>
                                        <th>
                                            Break Time
                                        </th>
                                        <th>
                                            Paid Time Off
                                        </th>
                                        <th>
                                            Flex Hourse
                                        </th>
                                        <th>
                                            Unpaid Time off Approved
                                        </th>
                                        <th>
                                            Unpaid Time off Pending
                                        </th>
                                        <th className={classes['left-shadow-cell']}>
                                            Available Time
                                        </th>
                                        <th>
                                            Occurrences
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={16} className="p-0 td-scroll scrollParent">
                                            <div className="table-scroll" ref={scrollBoxRef}>
                                                <table className="table-body-content scrollChild">
                                                    <tbody>
                                                        <tr>
                                                            <td className={classes['right-shadow-cell']}>Mar 26, 2012</td>
                                                            <td>9:25 AM</td>
                                                            <td>6:00 PM</td>
                                                            <td>4</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td className={classes['bg-blue']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-purple']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['left-shadow-cell']}>07:30:00</td>
                                                            <td className={classes['bg-red']}>1.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={classes['right-shadow-cell']}>Mar 26, 2012</td>
                                                            <td>9:25 AM</td>
                                                            <td>6:00 PM</td>
                                                            <td>4</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td className={classes['bg-blue']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-purple']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['left-shadow-cell']}>07:30:00</td>
                                                            <td className={classes['bg-red']}>1.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={classes['right-shadow-cell']}>Mar 26, 2012</td>
                                                            <td>9:25 AM</td>
                                                            <td>6:00 PM</td>
                                                            <td>4</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td className={classes['bg-blue']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-purple']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['left-shadow-cell']}>07:30:00</td>
                                                            <td className={classes['bg-red']}>1.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={classes['right-shadow-cell']}>Mar 26, 2012</td>
                                                            <td>9:25 AM</td>
                                                            <td>6:00 PM</td>
                                                            <td>4</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td className={classes['bg-blue']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-purple']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['left-shadow-cell']}>07:30:00</td>
                                                            <td className={classes['bg-red']}>1.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className={classes['right-shadow-cell']}>Mar 26, 2012</td>
                                                            <td>9:25 AM</td>
                                                            <td>6:00 PM</td>
                                                            <td>4</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td>1</td>
                                                            <td className={classes['bg-blue']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td className={classes['bg-purple']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['left-shadow-cell']}>07:30:00</td>
                                                            <td className={classes['bg-red']}>1.0</td>
                                                        </tr>
                                                        

                                                        {/* <tr *ngFor="let data of attendanceData;">
                                                            <td>{{data.date}}</td>
                                                            <td>{{data.loginTime | date: 'shortTime':'offset'}}</td>
                                                            <td>{{data.logoutTime | date: 'shortTime':'offset'}}</td>
                                                            <td>{{data.callDuration}}</td>
                                                            <td>{{data.trainingsDuration}}</td>
                                                            <td>{{data.ticketManagementDuration}}</td>
                                                            <td>{{data.caseManagementDuration}}</td>
                                                            <td>{{data.qaDuration}}</td>
                                                            <td class="bg-blue">{{data.scheduledStartTime}}</td>
                                                            <td>{{data.breakDuration}}</td>
                                                            <td class="bg-green">{{data.paidTimeOffDuration}}</td>
                                                            <td>{{data.availableTime}}</td>
                                                            <td class="bg-red">{{data.occurences}}</td>
                                                        </tr> */}
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
                {
                    reportView === 'grid' && tabVal==='requests' &&
                    <div className='w-100'>
                        <div className={`${classes['tbl-container']} w-100 slim-scroll`}>
                            <table className={`${classes['standard-tbl-structure']} ${classes['requests-table']} `}>
                                <thead>
                                    <tr>
                                        <th>
                                            Date
                                        </th>
                                        <th>
                                            Scheduled Time
                                        </th>
                                        <th>
                                            Break Time
                                        </th>
                                        <th>
                                            Paid Time Off
                                        </th>
                                        <th>
                                            Unpaid Time off Approved
                                        </th>
                                        <th>
                                            Unpaid Time off Pending
                                        </th>
                                        <th className={classes['left-shadow-cell']}>
                                            Available Time
                                        </th>
                                        <th>
                                            Occurrences
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={8} className="p-0 td-scroll scrollParent">
                                            <div className="table-scroll " ref={scrollBoxRef}>
                                                <table className="table-body-content scrollChild">
                                                    <tbody>
                                                        <tr>
                                                            <td>Mar 26, 2012</td>
                                                            <td>01:30:00</td>
                                                            <td >09:00:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td >00:15:00</td>
                                                            <td className={classes['bg-purple']}>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['bg-red']}>1.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Mar 26, 2012</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['bg-blue']}>09:00:00</td>
                                                            <td>00:15:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td>1.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Mar 26, 2012</td>
                                                            <td>01:30:00</td>
                                                            <td>09:00:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td>00:15:00</td>
                                                            <td>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['bg-red']}>1.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Mar 26, 2012</td>
                                                            <td>01:30:00</td>
                                                            <td className={classes['bg-blue']}>09:00:00</td>
                                                            <td>00:15:00</td>
                                                            <td className={classes['bg-green']}>00:15:00</td>
                                                            <td>09:00:00</td>
                                                            <td>01:30:00</td>
                                                            <td>1.0</td>
                                                        </tr>
                                                        
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
            </div>
            {
                reportView === 'grid' && 
                <div className="bg-white p-4" ref={footerRef}>
                    {/* <Pagination /> */}
                    <PaginatedItems />
                </div>
                
            }
            <PopOver openPopover={open} anchorEl={anchorElPopover} closePopover={closePopoverHandler} 
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} 
                transformOrigin={{vertical: 'center', horizontal: 'left',}}  />

            {/* <Popover 
                open={open} anchorEl={anchorElPopover} onClose={closePopoverHandler} 
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} 
                transformOrigin={{vertical: 'center', horizontal: 'left',}} 
            >
                <div className={`${poppoverClasses['popover-custom']} text-left pb-0`}>
                    <ul className={poppoverClasses['shift-details']}>
                        <li className="pt-0 pe-0 ps-0">
                            <div className={poppoverClasses['popover-custom-header']}>
                                <h3 className="mb-2"><i className="icon-clock d-inline-block me-1 icon"></i> Shift Schedule</h3>
                                <div className={poppoverClasses['scheduled-shift-time']}>
                                    <span className={poppoverClasses['scheduled-shift-time-label']}>Scheduled:</span> <span className={poppoverClasses['font-w-500']}>9h (09:00 AM - 6:00 PM)</span>
                                </div>
                                <div className={`${poppoverClasses['text-blue']} ${poppoverClasses['available-shift-time']}`}>
                                    <span className={poppoverClasses['scheduled-shift-time-label']}>Available:</span><span className="font-w-500"> 8h 25m (09:35 AM - 6:00 PM)</span>
                                </div>
                            </div>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span>Call Time</span>
                            <span className={poppoverClasses['shift-item-value']}>2h 30m</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span>Training Time</span>
                            <span className={poppoverClasses['shift-item-value']}>30m</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span>Ticket Management</span>
                            <span className={poppoverClasses['shift-item-value']}>2h 30m</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span>Case Management</span>
                            <span className={poppoverClasses['shift-item-value']}>1h 15m</span>
                        </li>
                        <li className="d-flex justify-content-between">
                            <span>QA Time</span>
                            <span className={poppoverClasses['shift-item-value']}>1h 25m</span>
                        </li>

                        <li className="d-flex justify-content-between">
                            <span>Request Time Off</span>
                            <span className={poppoverClasses['shift-item-value']}><a href="#" className={poppoverClasses['text-red']} data-bs-toggle="modal" data-bs-target="#requestTimeOffModalGraph">Apply for Approval</a></span>
                        </li>
                    </ul>
                    <div className={poppoverClasses.note}>
                        An occurrence is point deductions documented as an absence, tardy or missed time clock in/out.
                    </div>
                    <div className={poppoverClasses['custom-popover-footer']}>
                        <div>
                            <span className="icon icon-clock me-1"></span> <a href="#" data-bs-toggle="modal" data-bs-target="#disputeApproval">Mark as Dispute</a>
                        </div>
                        <div>
                            <span className="icon icon-calculator-2 me-1"></span>
                            <a href="#">Hours Calculator</a>
                        </div>
                    </div>
                </div>
            </Popover> */}
        </div>
    );
};

export default AgentAttendance;
