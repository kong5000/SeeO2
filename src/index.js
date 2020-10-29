import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chart from "./Chart";
import AverageChart from "./AverageChart";
import reportWebVitals from './reportWebVitals';
import App from './App';
import ioClient from 'socket.io-client'
const socket = ioClient('http://localhost:8002');

//Connect to the backend and render the frontend
socket.on('connect', ()=>{
  socket.on('SendSensors', (data)=>{
    ReactDOM.render(
      <React.StrictMode>
        <App 
          sensors={data}
          socket={socket}
        />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });

  socket.on('receiveHistoricalData', (data)=>{
    //Render historical data where the sidebar is

    const [c02Data, c02Avg] = getChartData(data, 'co2');
    const [tvocData, tvocAvg] = getChartData(data, 'tvoc');

    ReactDOM.render(
      <div className="sidebar">
        <h1>Last 24 hours:</h1>
        <Chart data={c02Data} dataKey="co2" fill="#8884d8"/>
        <Chart data={tvocData} dataKey="tvoc" fill='#448844'/>
        <AverageChart 
          data={[
            { name: 'Avg',
              c02: c02Avg,
              tvoc: tvocAvg}
            ]} 
          dataKey="average"/>
      </div>
      ,
    document.getElementById('side'));
  })

  socket.on('alertCreated', (data)=>{
    alert(data);
    return
  })
})

//Get data from last 24 hours for bar charts
const getChartData = (data, dataKey)=>{
  const chartData = [];
  let average = 0;

  for(let i = 0; i <= 139; i++){
    const dataPoint = {};
    if(data[i]) {
      dataPoint.name = data[i].date;

      // data[i][dataKey] > 0 ? dataPoint[dataKey] = data[i][dataKey] : dataPoint.empty = 100;
      if(data[i][dataKey] > 0){
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
  average /= 140

  return [chartData, average];
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
