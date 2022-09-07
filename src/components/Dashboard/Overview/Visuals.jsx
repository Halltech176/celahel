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

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "july",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Properties  Overview",
      lineTension: 0.5,
      backgroundColor: "whitesmoke",
      borderColor: "blue",
      borderWidth: 5,
      pointRadius: 1,
      pointHoverRadius: 10,
      hoverBackgroundColor: "blue",
      // hoverBorderColor: "none",
      data: [65, 70, 80, 81, 56, 50, 70, 40, 70, 50, 57, 30],
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
const Visuals = () => {
  const selector = useSelector((state) => state);

  const fetchData = async (id) => {
    try {
      const token = window.JSON.parse(localStorage.getItem("token"));

      const response = await axios.get(
        `https://celahl.herokuapp.com/api/property?populate=images&page=1&limit=${selector.totalDocs}`,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      console.log(response.data.data.docs);
    } catch (err) {
      throw err;
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Line data={data} options={config} />
    </>
  );
};
export default Visuals;
