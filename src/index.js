import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Chart from "./Chart";
import AverageChart from "./AverageChart";
import AllAveragesChart from "./AllAveragesChart";
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
    const [pm25Data, pm25Avg] = getChartData(data.data, "pm25", data.offset);
    const [pm10Data, pm10Avg] = getChartData(data.data, "pm10", data.offset);
    // const allAverages = getDailyAverages(data.data)

    ReactDOM.render(
      <div className="sidebarChart">
        {/*Arrow buttons to switch pages in the data view*/}
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
        <div className="controlls-container">
          <h3 className="hoursAgo">Hours Ago</h3>
        </div>
        <Chart data={c02Data} dataKey="co2" fill="#8884d8" />
        <Chart data={tvocData} dataKey="tvoc" fill="#448844" />
        <Chart data={pm25Data} dataKey="pm25" fill="#884444" />
        <Chart data={pm10Data} dataKey="pm10" fill="#888888" />
        <AverageChart
          data={[
            {
              name: "Avg",
              c02: c02Avg,
              tvoc: tvocAvg,
              pm25: pm25Avg,
              pm10: pm10Avg,
            },
          ]}
          dataKey="average"
        />

        {/* <AllAveragesChart data={allAverages} dataKey="co2"/> */}
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
  let maximum = 0;

  for (let i = 0 + offset * 140; i <= 139 + offset * 140; i++) {
    const dataPoint = {};
    if (data[i]) {
      dataPoint.name = data[i].date;

      if (data[i][dataKey] !== -99) {
        dataPoint[dataKey] = data[i][dataKey];
        data[i][dataKey] > maximum ? maximum = data[i][dataKey] : maximum = maximum;
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

  chartData.forEach((element)=>{
    if(element.empty){
      element.null = maximum - element[dataKey];
    }
  })
  console.log(chartData)
  return [chartData, average];
};

const getDailyAverages = (data) => {
  const dailyAverage = [];
  const days = {};
  const averages = {};

  data.forEach((element) => {
    const date = element.date.split(", ");

    days[date[0] + date[1]]
      ? (days[date[0] + date[1]] += element.co2)
      : (days[date[0] + date[1]] = element.co2);
    averages[date[0] + date[1]]
      ? (averages[date[0] + date[1]] += 1)
      : (averages[date[0] + date[1]] = 1);
  });
  let i = 1;
  for (const day in days) {
    dailyAverage.push({
      name: day,
      average: days[day] / averages[day],
      fill: `#${i * 13 + 10}${i * 5 + 10}${i * 5 + 10}`,
    });
    i++;
  }

  return dailyAverage;
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
