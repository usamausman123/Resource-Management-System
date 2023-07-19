import { useState } from "react";
import LineChart from "../view/LineChart";
import "./ScheduleReport.css";
import DateRangeDropdown from "../../common/DateRangeDropdown/DateRangeDropdown";

const ScheduleReport = () => {
  const [options] = useState({
    chart: {
      height: 200,
      type: "column",
    },
    title: {
      text: " ",
    },
    xAxis: {
      categories: ["Su", "Mu", "Tu", "We", "Th"],
      crosshair: {
        color: "#F7F8F9",
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "",
      },
      gridLineColor: "rgba(32, 29, 30, 0.03)",
      gridLineWidth: 2,
      gridLineDashStyle: "Dash",
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        pointWidth: 10,
        stacking: "normal",
      },
    },
    series: [
      {
        name: "Scheduled",
        data: [25, 50, 60, 15, 12],
        color: "#F7CB94",
      },
      {
        name: "Unscheduled",
        data: [50, 15, 80, 50, 80],
        color: "#46B0E6",
      },
      {
        name: "Fake Series",
        data: [100, 100, 100, 100, 100],
        grouping: false,
        stacking: false,
        showInLegend: false,
        enableMouseTracking: false,
        zIndex: -1,
        color: "#EEEEF2",
      },
    ],
  });

  return (
    <div className="scheduleReport">
      <div className="component-container">
        <div className="component-header">
          <div className="col-6">
            {" "}
            <h2>Schedule Report</h2>
          </div>
          <div className="col-6 text-right">
            <div className="dropdown d-inline-block me-3">
              <DateRangeDropdown isFlex={true} />
            </div>
          </div>
        </div>

        <LineChart options={options} />

        <div className="component-footer">
          <div className="col-md-12">
            <span className="data-labels">
              <div className="blue"></div>Scheduled
            </span>
            <span className="data-labels">
              <div className="orange"></div>Unscheduled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleReport;
