import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Chart from "./Chart";
import AverageChart from "./AverageChart";
import AllAveragesChart from "./AllAveragesChart";
import App from "./App";
import ioClient from "socket.io-client";
import loading from "./images/load.gif";
// import { render } from "@testing-library/react";

const pm25Colour = [
  "#884444",
  "#773B3B",
  "#683434",
  "#552A2A",
  "#472323",
  "#3E1F1F",
  "#341A1A"
]
const pm10Colour = [
  "#888888",
  "#777777",
  "#666666",
  "#555555",
  "#444444",
  "#333333",
  "#222222"
]
let socket = null;

require("dotenv").config();
if (process.env.REACT_APP_USE_REMOTE_BACKEND === "true") {
  console.log("Using remote backend");
  socket = ioClient("https://see-o2-backend.herokuapp.com");
} else {
  socket = ioClient("http://localhost:8002");
}

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
    const views = ['Hours', 'Days', 'Months'];
    
    //Render historical data where the sidebar is
    // const [c02Data, c02Avg] = getChartData(data.data, "co2", data.offset);
    // const [tvocData, tvocAvg] = getChartData(data.data, "tvoc", data.offset);
    const [pm25Data, pm25Avg] = getChartData(data.data, "pm25", data.offset);
    const [pm10Data, pm10Avg] = getChartData(data.data, "pm10", data.offset);
    const [pm25WeeklyAverages, pm25AvgWeek] = getWeeklyAverages(data.data, data.offset*7, "pm25", pm25Colour);
    const [pm10WeeklyAverages, pm10AvgWeek] = getWeeklyAverages(data.data, data.offset*7, "pm10", pm10Colour);
    ReactDOM.render(
      <div className="sidebarChart">
        {/*Arrow buttons to switch pages in the data view*/}
        <div className="controlls-container">
          <button onClick={() => {nextPage({
                data: data.data,
                offset: 0,
                timezone: data.timezone,
                timezoneOffset: data.timezoneOffset,
                dataView: data.dataView > 0 ? data.dataView - 1 : data.dataView
              });}}>
            {"<"}
          </button>
          <span>{views[data.dataView]}</span>
          <button onClick={() => {nextPage({
                data: data.data,
                offset: 0,
                timezone: data.timezone,
                timezoneOffset: data.timezoneOffset,
                dataView: data.dataView < 3 ? data.dataView + 1 : data.dataView
              });}}>
            {">"}
          </button>
        </div>
        <div className="controlls-container">
          <button
            onClick={() => {nextPage({
                data: data.data,
                offset: data.offset + 1,
                timezone: data.timezone,
                timezoneOffset: data.timezoneOffset,
                dataView: data.dataView
              });}}>
            {"<"}
          </button>
          {data.dataView === 0 ?
            (<span>{data.offset * 24 + 24} - {data.offset * 24}</span>)
              : 
            (<span>{data.offset * 7 + 7} - {data.offset * 7}</span>)}
          <button
            onClick={() => {
              if (data.offset > -0) {
                nextPage({
                  data: data.data,
                  offset: data.offset - 1,
                  timezone: data.timezone,
                  timezoneOffset: data.timezoneOffset,
                  dataView: data.dataView
                });
              }
            }}
          >
            {">"}
          </button>
        </div> 
        <div className="controlls-container">
          {data.dataView === 0 ?
            (<h3 className="hoursAgo">Hours Ago</h3>)
            :
            (<h3 className="hoursAgo">Days Ago</h3>)
          }
        </div>
        <div className="controlls-container">
          <h3 className="hoursAgo">Time Zone: {data.timezone}</h3>
        </div>
        {/* <Chart data={c02Data} dataKey="co2" fill="#8884d8" />
        <Chart data={tvocData} dataKey="tvoc" fill="#448844" /> */}
        {data.dataView === 0 ?
          (<div>
          <Chart data={pm25Data} dataKey="pm25" fill="#884444" />
          <Chart data={pm10Data} dataKey="pm10" fill="#888888" />
          <AverageChart
            data={[{name: "Avg", pm25: pm25Avg, pm10: pm10Avg,},]}
            dataKey="average"
          /></div>)
        :
        (<div>
          <AllAveragesChart data={pm25WeeklyAverages} dataKey="pm25"/>
          <AllAveragesChart data={pm10WeeklyAverages} dataKey="pm10"/>
          <AverageChart
            data={[{name: "Avg", pm25: pm25AvgWeek, pm10: pm10AvgWeek,},]}
            dataKey="average"
          />
          </div>)
        }
      </div>,
      document.getElementById("side")
    );
  });

  socket.on("alertCreated", (data) => {
    alert(data);
    return;
  });
});

const nextPage = (data) => {
  socket.emit("getHistoricalData", {
    id: data.data[0].sensors_id,
    offset: data.offset,
    timezone: data.timezone,
    timezoneOffset: data.timezoneOffset,
    dataView: data.dataView
  });
  ReactDOM.render(
    <div className="sidebarChart" id="loading">
      <img src={loading} alt="loading" />
    </div>,
    document.getElementById("side")
  );
}

//Get data from last 24 hours for bar charts
const getChartData = (data, dataKey, offset) => {
  const chartData = [];
  let average = 0;
  let maximum = 0;

  for (let i = 0 + offset * 144; i <= 143 + offset * 144; i++) {
    const dataPoint = {};
    if (data[i]) {
      dataPoint.name = data[i].date;

      if (data[i][dataKey] !== -99) {
        dataPoint[dataKey] = data[i][dataKey];
        data[i][dataKey] > maximum
          ? (maximum = data[i][dataKey])
          : (maximum = 0);
        average += data[i][dataKey];
      } else {
        dataPoint.empty = 0;
      }

      chartData.push(dataPoint);
    } else {
      //Push empty data if none exists
      dataPoint.empty = 100;
      chartData.push(dataPoint);
    }
  }
  average /= 144;

  chartData.forEach((element) => {
    if (element.empty) {
      element.null = maximum - element[dataKey];
    }
  });
  return [chartData, average];
};

//get average data for the last 7 days
const getWeeklyAverages = (data, offset, dataKey, colour) => {
  const dailyAverage = [];
  let weeklyAverage = 0;
  const days = {};
  const averages = {};

  data.forEach((element) => {
    const date = element.date.split(", ");

    if(element[dataKey] !== -99){
      days[date[0 + offset] + date[1 + offset]]
        ? (days[date[0 + offset] + date[1 + offset]] += element[dataKey])
        : (days[date[0 + offset] + date[1 + offset]] = element[dataKey]);
      averages[date[0 + offset] + date[1 + offset]]
        ? (averages[date[0 + offset] + date[1 + offset]] += 1)
        : (averages[date[0 + offset] + date[1 + offset]] = 1);
    }
  });
  let i = 1;
  for (const day in days) {
    if(i < 8){
      const average = days[day] / averages[day];
      dailyAverage.push({
        date: day,
        average,
        fill: colour[i - 1],
      });
      average !== -99 ? weeklyAverage += average : weeklyAverage += 0
      i++;
    }
  }
  weeklyAverage /= 7;

  return [dailyAverage.reverse(), weeklyAverage];
};
