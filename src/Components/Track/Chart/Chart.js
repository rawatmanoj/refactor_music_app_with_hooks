import React, { useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Context } from "../../../store/store";

import "./Chart.scss";

const Chart = () => {
  const [state, dispatch] = useContext(Context);
  console.log(state.audioFeatures);

  const data = {
    labels: [
      "acousticness",
      "danceability",
      "instrumentalness",
      "liveness",
      "speechiness",
      "valence",
    ],
    datasets: [
      {
        label: "My First dataset",
        fillColor: "white",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return (
    <div className="chart-container">
      <div>
        <Bar
          data={data}
          width={1000}
          height={500}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
