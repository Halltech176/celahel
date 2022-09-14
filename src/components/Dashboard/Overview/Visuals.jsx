
import Chart from 'react-apexcharts'
import axios from "axios";
import { useSelector } from "react-redux";
import NoValues from '../NoValues'
  const data = {
    // labels: properties.property_month,
    datasets: [
      {
        label: "Properties  Overview",
        lineTension: 0.1,
        backgroundColor: "whitesmoke",
        borderColor: "#2563eb",
        borderWidth: 3,
        pointRadius: 1,
        pointHoverRadius: 10,
        hoverBackgroundColor: "#2563eb",
        // data: properties.sums,
      },
    ],
  };

const Visuals = (properties) => {
 const options =   {
        chart: {
          id: 'apexchart-example'
        },
           stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
              },
        xaxis: {
          categories:properties?.property_month,
        },
         fill: {
                opacity: 1
              },
      }

      const      series= [{
        name: 'properties',
        data: properties?.sums,
      }]
  console.log(properties.sums);
  return (
    <>
      
    {
      properties?.sums?.length !== 0 ? <div className="row">
     <div className="mixed-chart">
       <Chart style={{overflow : 'scroll'}} options={options} series={series} type="bar" width={400} height={420} />
      </div>    </div> : ''
    }
    </>
  );
};
export default Visuals;
