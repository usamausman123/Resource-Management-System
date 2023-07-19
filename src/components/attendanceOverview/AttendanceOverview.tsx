import { useState } from 'react';
import GraphChart from '../view/GraphChart';
import LineChart from '../view/LineChart';
import { Diagram, Profile2User, UserTick, UserRemove, Clock } from 'iconsax-react';
import Highcharts from "highcharts";
import data from './AttendanceOverview.json';
import './AttendanceOverview.css';
import DateRangeDropdown from '../../common/DateRangeDropdown/DateRangeDropdown';

const AttendanceOverview = () => {
    let value = data;

    const [toggle, setToggle] = useState(false);

    const toggler = () => {
        return toggle === false ? setToggle(true) : setToggle(false);
    }

    //LineChart Configuration
    const [lineChartOptions] = useState({
        chart: {
            height: 200,
            type: 'column'
        },
        title: {
            text: ' '
        },
        xAxis: {
            categories: ['Su', 'Mu', 'Tu', 'We', 'Th', 'Fri', 'Sat'],
            crosshair: {
                color: '#F7F8F9'
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: ''
            },
            gridLineColor: "rgba(32, 29, 30, 0.03)",
            gridLineWidth: 2,
            gridLineDashStyle: "Dash",
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                pointWidth: 10,
            },

        },
        series: [{
            name: 'Present',
            data: [70, 80, 60, 50, 70, 80, 60],
            color: '#03C04A',
            borderRadiusTopLeft: '50px',
            borderRadiusTopRight: '20px'
        }, {
            name: 'Late Arrival',
            data: [20, 40, 10, 25, 5, 10, 20],
            color: '#EF9829'
        },
        {
            name: 'Absent',
            data: [50, 20, 40, 30, 50, 40, 60],
            color: '#EE4723'
        }
        ]
    });

    //Graph Configuration
    const [options] = useState({
        chart: {
            height: 200,
            type: "areaspline",
            plotBorderWidth: 0
        },
        title: {
            text: ""
        },
        tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: null,
            shadow: true,
            formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                return "Present " + this.point.y;
            }
        },
        series: [
            {
                data: value[0].Present,
                color: "#03C04A",
                fillColor: {
                    linearGradient: [0, 0, 0, 120],
                    stops: [
                        [0, '#03C04A'],
                        [1, Highcharts.color('#ffffff').setOpacity(0.1).get('rgba')]
                    ]
                },
                marker: {
                    enabled: false
                }
            },

            {
                type: "spline",
                data: value[1].LateArrival,
                color: "#F7CB94",
                dashStyle: 'dash',
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            },
            {
                type: "spline",
                data: value[2].Absent,
                color: "#F7CB94",
                dashStyle: 'dash',
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            }
        ],
        legend: {
            enabled: false
        },
        xAxis: {
            type: "datetime",
            categories: [
                "11 Mar",
                "12 Mar",
                "13 Mar",
                "14 Mar",
                "15 Mar",
                "16 Mar",
                "17 Mar"
            ],
            gridZIndex: 1,
            gridLineWidth: 1,
            gridLineDashStyle: "Dash",
            gridLineColor: "rgba(32, 29, 30, 0.03)",
            lineWidth: 0,
            crosshair: {
                width: 1,
                color: "#39B7E9",
                dashStyle: "Dash"
            }
        },
        yAxis: {
            lineWidth: 0,
            title: {
                text: '',
            },
            gridLineWidth: 1,
            gridLineDashStyle: "Dash",
            gridLineColor: "rgba(32, 29, 30, 0.03)",
            crosshair: {
                width: 1,
                color: "#39B7E9",
                dashStyle: "Dash"
            }
        }
    });

    return (
        <div className="attendanceOverview">
            <div className='component-container'>
                <div className="component-header">
                    <div className="col-6">
                        <h2>Attendance Overview</h2>
                    </div>
                    <div className="col-6 text-right">

                        <div className="dropdown d-inline-block me-3"><DateRangeDropdown isFlex={true} /></div>
                        <div className='switch-container'><button className="button" onClick={toggler} disabled={toggle === false}><Diagram size="14" /> Line</button> <button disabled={toggle} className="button" onClick={toggler}><Diagram size="14" /> Bar</button>
                        </div>

                    </div>
                </div>

                <div className="agents-info">
                    <div className="agents-info-row">
                        <div className="col-md-3">
                            <span className="agents-info-title">
                                <Profile2User className="icon-users-light" size="22" color="#666666" /> Total Agents
                            </span>
                            <span className="d-block agents-info-value">
                                445
                            </span>
                        </div>
                        <div className="col-md-3">
                            <span className="agents-info-title">
                                <UserTick size="22" color="#666666" />  Present
                            </span>
                            <span className="d-block agents-info-value">
                                439<i className="agent-value-change text-danger">+1.3% &#8595;
                                </i>
                            </span>
                        </div>
                        <div className="col-md-3">
                            <span className="agents-info-title">
                                <UserRemove size="22" color="#666666" /> Absent
                            </span>
                            <span className="d-block agents-info-value">
                                5<i className="agent-value-change">+0.6% &#8593;</i>
                            </span>
                        </div>
                        <div className="col-md-3">
                            <span className="agents-info-title">
                                <Clock size="22" color="#666666" />  Late Arrival
                            </span>
                            <span className="d-block agents-info-value">
                                45 <i className="agent-value-change"> +0.5% &#8595;</i>
                            </span>
                        </div>
                    </div>
                </div>

                {toggle === true ? <LineChart options={lineChartOptions} /> : <GraphChart options={options} />}



                <div className="component-footer">
                    <div className="col-md-12">
                        <span className='data-labels'><div className="green"></div>Present</span>
                        <span className='data-labels'><div className="orange"></div>Late Arrival</span>
                        <span className='data-labels'><div className="red"></div>Absent</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AttendanceOverview;
