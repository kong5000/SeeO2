import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import googleMapsApi from '../.env'

const infoDisplay = {
  color: "olive",
  fontWeight: "700",
  backgroundColor: "beige",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid grey",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    let className = "info-display";
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        <Marker onClick={this.onMarkerClick} name={"Current Location"} />
        <Marker
          onClick={this.onMarkerClick}
          title="Click for more info."
          name={"Mark's Air Quality sensor"}
          position={{ lat: 48.635208, lng: -123.415739 }}
          CO2={3801}
          TVOC={4.559}
        />
        <Marker
          onClick={this.onMarkerClick}
          title="Click for more info."
          name={"Jayden's Air Quality sensor"}
          position={{ lat: 48.4491, lng: -123.39771 }}
          CO2={2138}
          TVOC={3.058}
        />
        <Marker
          onClick={this.onMarkerClick}
          title="Click for more info."
          name="Keith's Air Quality sensor"
          position={{ lat: 49.21008, lng: -123.1162653 }}
          CO2={400}
          TVOC={0.85}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          className={className}
        >
          <div style={infoDisplay}>
            <h3>{this.state.selectedPlace.name}</h3>
            <p>CO2: {this.state.selectedPlace.CO2} ppm</p>
            <p>TVOC: {this.state.selectedPlace.TVOC} mg/m3</p>
            <p>
              Local Air Quality is
              {this.state.selectedPlace.CO2 > 3000 ? " poor" : " all right"}
            </p>
            <form>
              <input defaultValue="Enter email for updates"></input>
            </form>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleMapsApi,
})(MapContainer);