import React, { Component } from "react";
import ReactDOM from "react-dom"
import SideBar from "./SideBar"
import "./SideBar.css";
import logo from "./images/SeeO2_logo.png";

export class SensorForm extends Component {
  newSensor = (event) => {
    event.preventDefault();
    this.props.socket.emit("newSensor", {
      email: this.state.email,
      name: this.state.name,
      url: this.state.url,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });
  };
  
  render() {
    return (
      <div className="sidebar">
        <img src={logo} alt="SeeO3 logo" width="250vw" />
         <h1>Register Sensor</h1>
         <form id="sensorForm" onSubmit={this.newSensor}>
           <input
            type="email"
            name="email"
            value={this.email}
            onChange={(event) => {
              this.setState({
                email: event.target.value,
              });
            }}
            placeholder="Email"
          ></input>

          <input
            name="name"
            value={this.name}
            onChange={(event) => {
              this.setState({
                name: event.target.value,
              });
            }}
            placeholder="Name"
          ></input>

          <input
            name="url"
            value={this.url}
            onChange={(event) => {
              this.setState({
                url: event.target.value,
              });
            }}
            placeholder="Server Url"
          ></input>

          <input
            type="number"
            name="latitude"
            value={this.latitude}
            onChange={(event) => {
              this.setState({
                latitude: event.target.value,
              });
            }}
            placeholder="Latitude"
          ></input>

          <input
            type="number"
            name="longitude"
            value={this.longitude}
            onChange={(event) => {
              this.setState({
                longitude: event.target.value,
              });
            }}
            placeholder="Longitude"
          ></input>

          <button type="submit">Submit</button>
        </form>
        <button onClick={()=>{
          ReactDOM.render(
            <SideBar />,
            document.getElementById('side'));
        }}>Back</button>
      </div>
    );
  }
}

export default SensorForm;
