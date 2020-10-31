import React, { Component, Fragment, SyntheticEvent } from "react";
import ReactDOM from "react-dom";
import { GoogleApiWrapper } from "google-maps-react";
import CurrentLocation from "./Map";
import SideBar from "./SideBar";
import SensorForm from "./SensorForm";
import "./App.css";
import Marker from "./Marker";
import InfoWindowX from "./infoWindowX";
import poor from "./images/stop.png";
import moderate from "./images/orange-blank.png";
import good from "./images/ltblu-blank.png";
import loading from './images/load.gif';
import axios from "axios";

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
    timezone: 'UTC'
  };

  onMarkerClick = (props, marker, e) => {
    console.log(process.env.REACT_APP_googleTimezoneApi)
    axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${e.latLng.lat()},${e.latLng.lng()}&timestamp=1331161200&key=${process.env.REACT_APP_googleTimezoneApi}`)
    .then((res)=>{
      const timezoneName = res.data.timeZoneName.split(" ")
      let timezone = '';
      timezoneName.forEach(element => {
        timezone += element[0]
      });
      this.state.timezone = timezone;

      this.props.socket.emit("getHistoricalData", {id:marker.id, offset: -1, timezone});
    })
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

    console.log(this.props.google.maps.LatLng)
    //Render the loading image
    ReactDOM.render(
      <div className='sidebarChart' id='loading'>
        <img src={loading} alt="loading"/>
      </div>
      ,
      document.getElementById('side'));
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
    if(this.emailInput.current.value.includes('@')){
      this.props.socket.emit("newAlert", {
        email: this.emailInput.current.value,
        sensors_id: this.state.selectedPlace.id,
      });
      this.emailInput.current.value = "";
    } else {
      alert('Email is missing @')
    }
  };
  emailInput = React.createRef();

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
                PM25={sensor.pm25}
                PM10={sensor.pm10}
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
              <span>CO2: {this.state.selectedPlace.CO2 !== -99 ? this.state.selectedPlace.CO2 : 'null'} ppm</span>
              <span>TVOC: {this.state.selectedPlace.TVOC !== -99 ? this.state.selectedPlace.TVOC : 'null'} mg/m3</span>
              <span>PM25: {this.state.selectedPlace.PM25 !== -99 ? this.state.selectedPlace.PM25 : 'null'}</span>
              <span>PM10: {this.state.selectedPlace.PM10 !== -99 ? this.state.selectedPlace.PM10 : 'null'}</span>
              <p>
                Local Air Quality is
                {this.state.selectedPlace.pm25 > 35 ? " poor" : " all right"}
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
          <SideBar socket={this.props.socket}/>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
