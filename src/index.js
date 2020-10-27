import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
    alert(data);
    console.log(data)
  })
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
