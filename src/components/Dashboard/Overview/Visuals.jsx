import Chart from "react-apexcharts";
import axios from "axios";
import { useSelector } from "react-redux";
import NoValues from "../NoValues";
import style from "./Overview.module.css";

const Visuals = (properties) => {
  const option1 = {
    chart: {
      id: "Property chart",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 2,
    },
    xaxis: {
      type: "datet/ime",
      categories: properties?.property_month,
    },
    fill: {
      opacity: 0.7,
    },
  };
  const option2 = {
    chart: {
      id: "Property chart",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: false,

      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    offsetY: -20,
    stroke: {
      curve: "smooth",
      show: true,
      width: 1,
    },
    xaxis: {
      type: "datet/ime",
      categories: properties?.property_month,
    },
    fill: {
      type: "gradient",
      gradient: {
        colorFrom: "red",
        colorTo: "yellow",
        stops: [0, 100],
        opacityFrom: 0.7,
        opacityTo: 0.9,
      },
      fillColors: ["#00E396", "#775DD0"],
    },
  };

  const series = [
    {
      name: "Number of Properties",
      data: properties?.sums,
    },
  ];
  console.log(properties.sums);
  return (
    <>
      {properties?.sums?.length !== 0 ? (
        <div className="">
          <div className={`${style.mixedChart}`}>
            <Chart
              className="chart-container"
              options={option1}
              series={series}
              type="area"
              height="300"
              width="500"
            />
            <Chart
              className="chart-container"
              options={option2}
              series={series}
              type="bar"
              height="300"
              width="500"
            />
          </div>{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Visuals;
