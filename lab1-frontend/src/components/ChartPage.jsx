import "chart.js/auto";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";

export default function ChartPage(props) {
  const labels = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  //const [array, setArray] = useState();
  function getHoursFromDBTimestamp(timestamp) {
    let hour = new Date(timestamp).getHours();
    return hour;
  }

  useEffect(() => {
    let array = new Array(24).fill(0);
    props.data &&
      props.data.forEach((data) => {
        array[getHoursFromDBTimestamp(data.timestamp)] = data.hourlyConsumption;
      });
    setData({
      labels,
      datasets: [
        {
          label: props.device && props.device.description,
          data: array,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  }, [props.data, props.device]);

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: props.device && props.device.description,
        data: labels.map((l, i) => {
          if (
            props.data[i] &&
            getHoursFromDBTimestamp(props.data[i].timestamp) === l
          ) {
            return data.hourlyConsumption;
          } else return 0;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  return <Chart type={props.graph ? "line" : "bar"} data={data} />;
}
