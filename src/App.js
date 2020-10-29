import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { GoogleApiWrapper } from "google-maps-react";
import CurrentLocation from "./Map";
import SideBar from "./SideBar";
import "./App.css";
import Marker from "./Marker";
import InfoWindowX from "./infoWindowX";
import poor from "./images/stop.png";
import moderate from "./images/orange-blank.png";
import good from "./images/ltblu-blank.png";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    email: "",
    sensorEmail: "",
    name: "",
    url: "",
    latitude: 0,
    longitude: 0,
  };

  onMarkerClick = (props, marker, e) => {
    this.props.socket.emit("getHistoricalData", marker.id);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

    //Render the left panel to sign up for email alerts
    // ReactDOM.render(
    //   <Fragment>
    //     <h1>New Sensor</h1>
    //     <form onSubmit={this.newSensor}>
    //       <input
    //         type="email"
    //         name="email"
    //         value={this.sensorEmail}
    //         onChange={(event) => {
    //           this.setState({
    //             sensorEmail: event.target.value,
    //           });
    //         }}
    //         placeholder="Email"
    //       ></input>

    //       <input
    //         name="name"
    //         value={this.name}
    //         onChange={(event) => {
    //           this.setState({
    //             name: event.target.value,
    //           });
    //         }}
    //         placeholder="Name"
    //       ></input>

    //       <input
    //         name="url"
    //         value={this.url}
    //         onChange={(event) => {
    //           this.setState({
    //             url: event.target.value,
    //           });
    //         }}
    //         placeholder="Server Url"
    //       ></input>

    //       <input
    //         type="number"
    //         name="latitude"
    //         value={this.latitude}
    //         onChange={(event) => {
    //           this.setState({
    //             latitude: event.target.value,
    //           });
    //         }}
    //         placeholder="Latitude"
    //       ></input>

    //       <input
    //         type="number"
    //         name="longitude"
    //         value={this.longitude}
    //         onChange={(event) => {
    //           this.setState({
    //             longitude: event.target.value,
    //           });
    //         }}
    //         placeholder="Longitude"
    //       ></input>

    //       <button type="submit">Submit</button>
    //     </form>
    //   </Fragment>,
    //   document.getElementById("popup")
    // );
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
      ReactDOM.render(
        <SideBar />,
        document.getElementById('side'));
    }
  };

  newAlert = (event) => {
    console.log(this.emailInput.current.value);
    event.preventDefault();
    this.props.socket.emit("newAlert", {
      email: this.emailInput.current.value,
      sensors_id: this.state.selectedPlace.id,
    });
    this.emailInput.current.value = "";
  };

  emailInput = React.createRef();

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
      <div className="main-container">
        <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
          <Marker onClick={this.onMarkerClick} name={"Current Location"} />

          {this.props.sensors.map((sensor) => {
            return (
              <Marker
                onClick={this.onMarkerClick}
                title="Click for more info."
                name={`${sensor.name}'s air quality sensor`}
                position={{ lat: sensor.latitude, lng: sensor.longitude }}
                CO2={sensor.co2}
                TVOC={sensor.tvoc}
                id={sensor.id}
                icon={
                  sensor.co2 > 2000 ? poor : sensor.co2 > 400 ? moderate : good
                }
              />
            );
          })}

          <InfoWindowX
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div className="info-display">
              <h3>{this.state.selectedPlace.name}</h3>
              <p>CO2: {this.state.selectedPlace.CO2} ppm</p>
              <p>TVOC: {this.state.selectedPlace.TVOC} mg/m3</p>
              <p>
                Local Air Quality is
                {this.state.selectedPlace.CO2 > 3000 ? " poor" : " all right"}
              </p>
              <div className="email-alert">
                <input
                  type="email"
                  id={"email"}
                  name="email"
                  value={this.email}
                  ref={this.emailInput}
                  placeholder="Enter email for updates"
                ></input>
                <br />
                <button
                  className="button"
                  type="button"
                  onClick={this.newAlert}
                >
                  Submit
                </button>
              </div>
            </div>
          </InfoWindowX>
        </CurrentLocation>
        <div id="side">
          <SideBar />
        </div>
        {/* <div className="addSensor" id="popup"></div> */}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
