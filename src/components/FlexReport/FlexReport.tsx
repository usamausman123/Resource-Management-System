import { useState } from "react";
import PieChart from "../view/PieChart";
import DateRangeDropdown from "../../common/DateRangeDropdown/DateRangeDropdown";
import "./FlexReport.css";

const FlexReport = () => {
  //Pie Data
  const [data] = useState([
    {
      y: 300,
      color: "#46B0E6",
      name: "Requests",
    },
    {
      y: 200,
      color: "#EF9829",
      name: "Promotions",
    },
  ]);

  //PieCHart Configurations
  const [options] = useState({
    chart: {
      height: 200,
      animation: false,
      type: "pie",
      backgroundColor: null,
    },
    title: {
      text: null,
    },
    tooltip: {
      backgroundColor: "#FFFFFF",
      borderWidth: 0,
      borderRadius: 5,
      borderColor: null,
      shadow: false,
      valueSuffix: "%",
      enabled: true,
      formatter: function (this: Highcharts.TooltipFormatterContextObject) {
        return this.point.name + " " + `<strong>${this.point.y}</strong>`;
      },
    },
    plotOptions: {
      pie: {
        animation: {
          duration: 750,
          easing: "easeOutQuad",
        },
        shadow: false,
        center: ["50%", "50%"],
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
      },
      series: {
        animation: {
          duration: 750,
          easing: "easeOutQuad",
        },
        //   hover: {
        //     halo: {
        //         size: 500,
        //     }

        // }
      },
    },
    series: [
      {
        animation: {
          duration: 750,
          easing: "easeOutQuad",
        },
        name: "Spending",
        data: data,
        size: "100%",
        innerSize: "55%",
        dataLabels: {
          formatter: function (this: Highcharts.TooltipFormatterContextObject) {
            return data[0].y + " Hours";
          },
          color: "#ffffff",
          distance: 0,
        },
      },
    ],
  });

  return (
    <div className="FlexReport">
      <div className="'component-container">
        <div className="component-header">
          <div className="col-6">
            <h2>Flex Report</h2>
          </div>
          <div className="col-6 text-right">
            <div className="dropdown d-inline-block me-3">
              <DateRangeDropdown isFlex={true} />
            </div>
          </div>
        </div>

        <PieChart data={data} options={options} />

        <div className="component-footer">
          <div className="col-md-12">
            <span>
              <div className="blue"></div>Requests: <strong>{data[0].y}</strong>
            </span>
            <span>
              <div className="orange"></div>Promotions:{" "}
              <strong>{data[1].y}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexReport;
