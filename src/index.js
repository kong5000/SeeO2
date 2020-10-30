import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Chart from "./Chart";
import AverageChart from "./AverageChart";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import ioClient from "socket.io-client";
import loading from "./images/load.gif";
const socket = ioClient("http://localhost:8002");

//Connect to the backend and render the frontend
socket.on("connect", () => {
  socket.on("SendSensors", (data) => {
    ReactDOM.render(
      <React.StrictMode>
        <App sensors={data} socket={socket} />
      </React.StrictMode>,
      document.getElementById("root")
    );
  });

  socket.on("receiveHistoricalData", (data) => {
    //Render historical data where the sidebar is
    const [c02Data, c02Avg] = getChartData(data.data, "co2", data.offset);
    const [tvocData, tvocAvg] = getChartData(data.data, "tvoc", data.offset);

    ReactDOM.render(
      <div className="sidebarChart">
        <div className="controlls-container">
          <button
            onClick={() => {
              socket.emit("getHistoricalData", {
                id: data.data[0].sensors_id,
                offset: data.offset,
              });
              ReactDOM.render(
                <div className="sidebarChart" id="loading">
                  <img src={loading} alt="loading" />
                </div>,
                document.getElementById("side")
              );
            }}
          >
            {"<"}
          </button>

          <span>
            {data.offset * 24 + 24} - {data.offset * 24}
          </span>

          <button
            onClick={() => {
              if (data.offset > -0) {
                socket.emit("getHistoricalData", {
                  id: data.data[0].sensors_id,
                  offset: data.offset - 2,
                });
                ReactDOM.render(
                  <div className="sidebarChart" id="loading">
                    <img src={loading} alt="loading" />
                  </div>,
                  document.getElementById("side")
                );
              }
            }}
          >
            {">"}
          </button>
        </div>
        <h4 className="hoursAgo">Hours Ago</h4>
        <Chart data={c02Data} dataKey="co2" fill="#8884d8" />
        <Chart data={tvocData} dataKey="tvoc" fill="#448844" />
        <AverageChart
          data={[{ name: "Avg", c02: c02Avg, tvoc: tvocAvg }]}
          dataKey="average"
        />
        {/*Arrow buttons to switch pages in the data view*/}
      </div>,
      document.getElementById("side")
    );
  });

  socket.on("alertCreated", (data) => {
    alert(data);
    return;
  });
});

//Get data from last 24 hours for bar charts
const getChartData = (data, dataKey, offset) => {
  const chartData = [];
  let average = 0;

  for (let i = 0 + offset * 140; i <= 139 + offset * 140; i++) {
    const dataPoint = {};
    if (data[i]) {
      dataPoint.name = data[i].date;

      // data[i][dataKey] > 0 ? dataPoint[dataKey] = data[i][dataKey] : dataPoint.empty = 100;
      if (data[i][dataKey] > 0) {
        dataPoint[dataKey] = data[i][dataKey];
        average += data[i][dataKey];
      } else {
        dataPoint.empty = 100;
      }

      chartData.push(dataPoint);
    } else {
      //Push empty data if none exists
      dataPoint.empty = 100;
      chartData.push(dataPoint);
    }
  }
  average /= 140;

  return [chartData, average];
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
