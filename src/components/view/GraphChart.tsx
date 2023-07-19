import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import './charts.css';

export default function GraphChart(props: any) {
  
  //Important Comment
  
  // let color:any;
  // let value:any;
  // let fillColor:any;

  // const range = () => {
  //   let result = options.series[0].data;
  //   for (let i = 0; i < result.length; i++) {
  //     if (result[i] === 0) {
  //       color = "#EE4723";
  //       value = 9;

  //     }else if(result[i] === 1){
  //       color = options.series[0].zones[0].color = "#666666";
  //       value = options.series[0].zones[0].value = 9;

  //     }else if(result[i] >= 1){
  //       color = options.series[0].zones[0].color = "#46B0E6";
  //       value = options.series[0].zones[0].value = result[i];
  //     }
  //   }

  //   return;

  // }

  // useEffect(()=>{
  //   range();
  // },[])
  return (
    <div className="graph-container">
     <HighchartsReact highcharts={Highcharts} options={props.options} />
    </div>
  );
}
