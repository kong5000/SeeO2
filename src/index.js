import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Chart from "./Chart";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import ioClient from "socket.io-client";
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

    const c02Data = [];
    const tvocData = [];
    //Get data from the last 24 hours
    for (let i = 0; i < 139; i++) {
      const dataPoint = {};
      if (data[i]) {
        dataPoint.name = data[i].date;
        data[i].co2 > 0
          ? (dataPoint.co2 = data[i].co2)
          : (dataPoint.empty = 100);
        c02Data.push(dataPoint);
      } else {
        //Push empty data if none exists
        dataPoint.empty = 100;
        c02Data.push(dataPoint);
      }
    }
    for (let i = 0; i < 139; i++) {
      const dataPoint = {};
      if (data[i]) {
        dataPoint.name = data[i].date;
        data[i].tvoc > 0
          ? (dataPoint.tvoc = data[i].tvoc)
          : (dataPoint.empty = 100);
        tvocData.push(dataPoint);
      } else {
        dataPoint.empty = 100;
        tvocData.push(dataPoint);
      }
    }

    ReactDOM.render(
      <div className="sidebarChart">
        <h1>Last 24 hours:</h1>
        <Chart data={c02Data} dataKey="co2" />
        <Chart data={tvocData} dataKey="tvoc" />
      </div>,
      document.getElementById("side")
    );
  });

  socket.on("alertCreated", (data) => {
    alert(data);
    return;
  });
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
