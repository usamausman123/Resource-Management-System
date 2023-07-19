import { useState } from 'react';
import PieChart from '../view/PieChart';
import './PayrollReport.css';
import DateRangeDropdown from '../../common/DateRangeDropdown/DateRangeDropdown';

const PayrollReport = () => {

  //Pie Data
  const [data] = useState([
    {
      y: 100,
      color: "#03C04A",
      name: "Total Payable Time"
    },
    {
      y: 50,
      color: "#EF9829",
      name: "Unavailable Time"
    },
    {
      y: 20,
      color: "#EE4723",
      name: "Leaves"
    },
    {
      y: 5,
      color: "#FF7A93",
      name: "On Break"
    },
    {
      y: 20,
      color: "#46B0E6",
      name: "HOL"
    },
    {
      y: 10,
      color: "#51D2D0",
      name: "Bereaved"
    },
    {
      y: 15,
      color: "#B0B0B0",
      name: "Overtime"
    },
    {
      y: 20,
      color: "#9B89FF",
      name: "Regular"
    },
    {
      y: 10,
      color: "#5CE1D4",
      name: "PTOs"
    }
  ])

  //PieCHart Configurations
  const [options] = useState({
    chart: {
      height: 180,
      animation: false,
      type: 'pie',
      backgroundColor: null
    },
    title: {
      text: null
    },
    tooltip: {
      backgroundColor: "#FFFFFF",
      borderWidth: 0,
      borderRadius: 5,
      borderColor: null,
      shadow: false,
      valueSuffix: '%',
      enabled: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        return this.point.name + " " + `<strong>${this.point.y}</strong>`;
      }
    },
    plotOptions: {
      pie: {
        animation: {
          duration: 750,
          easing: 'easeOutQuad'
        },
        shadow: false,
        center: ['50%', '50%'],
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
      },
      series: {
        animation: {
          duration: 750,
          easing: 'easeOutQuad'
        },
        //   hover: {
        //     halo: {
        //         size: 500,
        //     }

        // }
      }
    },
    series: [{
      animation: {
        duration: 750,
        easing: 'easeOutQuad'
      },
      name: 'Spending',
      data: data,
      size: '100%',
      innerSize: '55%',
      dataLabels: {
        formatter: function (this: Highcharts.TooltipFormatterContextObject) {
          return data[0].y + " Hours";
        },
        color: '#ffffff',
        distance: 0
      }
    }],
  });


  return (
    <div className="PayrollReport">
      <div className="component-container">
        <div className="component-header">
          <div className="col-md-6">
            <h2>Payroll Report</h2>
          </div>
          <div className="col-md-6 text-right">
            <DateRangeDropdown isFlex={true} />
          </div>
        </div>

        <div className="PayrollReport-graph">
          <div className="col-md-6">
            <PieChart data={data} options={options} />
          </div>
          <div className="col-md-6 vt">
            <ul className='graph-bullet'>
              {data.map((agent, index) => {
                return (
                  <li key={index}><div className="circle" style={{ backgroundColor: `${agent.color}` }}></div><span>{agent.name}</span></li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

}

export default PayrollReport;
