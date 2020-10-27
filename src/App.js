import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { GoogleApiWrapper, InfoWindow } from "google-maps-react";
import CurrentLocation from "./Map";
import SideBar from "./SideBar";
import "./App.css";
import Marker from './Marker';
import poor from "./images/stop.png";
import moderate from "./images/orange-blank.png";
import good from "./images/ltblu-blank.png"

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    email: ''
  };

  onMarkerClick = (props, marker, e) => {
    this.props.socket.emit('getHistoricalData', marker.id);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

    //Render the left panel to sign up for email alerts
    ReactDOM.render(
      <Fragment>
        <form onSubmit={this.newAlert}>
          <input 
          type="email"
          id={'email'} 
          name='email' 
          value={this.email}
          onChange={event => {
            this.setState({
              email: event.target.value
            });
          }} 
          placeholder="Enter email for updates"></input>
          <button type="submit">Submit</button>
        </form>
      </Fragment>
      , document.getElementById('popup')
    )
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
      ReactDOM.render(
        <Fragment>
        </Fragment>
        , document.getElementById('popup')
      )
    }
  };

  newAlert = (event) => {
    event.preventDefault();
    this.props.socket.emit('newAlert', {email: this.state.email, sensors_id: this.state.selectedPlace.id})
  }
  
  render() {
    return (
      <div className="main-container">
        <div id='popup'>

        </div>
        <CurrentLocation centerAroundCurrentLocation google={this.props.google} >
          <Marker onClick={this.onMarkerClick} name={"Current Location"} />
          
          {this.props.sensors.map((sensor)=>{
            return <Marker
            onClick={this.onMarkerClick}
            title="Click for more info."
            name={`${sensor.name}'s Air Quality sensor`}
            position={{ lat: sensor.latitude, lng: sensor.longitude }}
            CO2={sensor.co2}
            TVOC={sensor.tvoc}
            id={sensor.id}
            icon={sensor.co2 > 2000 ? poor : sensor.co2 > 400 ? moderate : good}
          />
          })}
          <InfoWindow 
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            newAlert={this.newAlert}
          >
            <div className="info-display">
              <h3>{this.state.selectedPlace.name}</h3>
              <p>CO2: {this.state.selectedPlace.CO2} ppm</p>
              <p>TVOC: {this.state.selectedPlace.TVOC} mg/m3</p>
              <p>
                Local Air Quality is
                {this.state.selectedPlace.CO2 > 3000 ? " poor" : " all right"}
              </p>
              <form>
                <input id={'email'} defaultValue="Enter email for updates"></input>
              </form>
            </div>
          </InfoWindow>
        </CurrentLocation>
        <SideBar />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
