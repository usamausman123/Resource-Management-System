import { useState } from 'react';
import GraphChart from '../view/GraphChart';
import Highcharts from "highcharts";
import './HoursView.css';
import DateRangeDropdown from '../../common/DateRangeDropdown/DateRangeDropdown';

const HoursView = () => {

    //Graph Configuration
    const [options] = useState({
        chart: {
            height: 200,
            type: "areaspline",
            plotBorderWidth: 0
        },
        title: {
            text: "",
            align: "left",
            verticalAlign: "top",
            x: 10,
            y: 20
        },
        tooltip: {
            backgroundColor: "rgba(32, 29, 30, 0.01)",
            borderWidth: 0,
            borderRadius: 4,
            borderColor: null,
            shadow: false,
            formatter: function (this: Highcharts.TooltipFormatterContextObject) {
                return this.point.y + " Hours";
            }
        },
        series: [
            {
                type: "areaspline",
                data: [0, 8, 0, 9, 10, 9, 8],
                zoneAxis: "x",
                zones: [
                    {
                        value: 1,
                        color: "#EE4723",
                        fillColor: {
                            linearGradient: [0, 0, 0, 150],
                            stops: [
                                [0, '#EE4723'],
                                [10, Highcharts.color('#ffffff').setOpacity(0.1).get('rgba')]
                            ]
                        },
                    },
                    {
                        value: 5,
                        color: "#666666",
                        fillColor: {
                            linearGradient: [0, 0, 0, 150],
                            stops: [
                                [0, '#666666'],
                                [1, Highcharts.color('#ffffff').setOpacity(0.1).get('rgba')]
                            ]
                        },
                    },
                    {
                        value: 9,
                        color: "#39B7E9",
                        fillColor: {
                            linearGradient: [0, 0, 0, 150],
                            stops: [
                                [0, '#39B7E9'],
                                [1, Highcharts.color('#ffffff').setOpacity(0.1).get('rgba')]
                            ]
                        },
                    }
                ],
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
        <div className="HoursView">
            <div className="component-container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Hours View</h2>
                    </div>
                    <div className="col-md-6 text-right">
                        <div className="dropdown d-inline-block">
                            <DateRangeDropdown size="small" isFlex={true} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-left">
                        <ul className='hour-filter'>
                            <li><div className="blue"></div>Actual Hours</li>
                            <li><div className="red"></div>Leaves</li>
                            <li><div className="black"></div>Off Days</li>
                        </ul>
                    </div>
                </div>
                <GraphChart options={options} />
            </div>
        </div>
    );

}

export default HoursView;
