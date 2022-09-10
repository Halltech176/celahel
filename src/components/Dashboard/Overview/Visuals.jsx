import { Line } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Visuals = (properties) => {
  const data = {
    labels: properties.property_month,
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
        data: properties.sums,
      },
    ],
  };
  const config = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    type: "line",
    data: data,
    options: {
      reponsive: true,
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "property overview",
        },
      },
    },
  };
  console.log(properties.sums);
  return (
    <>
      <Line data={data} options={config} />
    </>
  );
};
export default Visuals;
