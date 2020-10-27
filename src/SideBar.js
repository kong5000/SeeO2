import React, { Component } from "react";
import "./SideBar.css";
import logo from "./images/SeeO2_logo.png";

export class SideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <img src={logo} alt="SeeO3 logo" width="250vw" />
        <p>
          <span className="logo">See O2</span> is an app to help you find the
          current air quality more locally, exactly where you live or where you
          want to go. Just click on a marker to see the air quality at that
          location.
        </p>
        <p>
          Users can enter their email at a particular info pop-up and get alerts
          when that location's air quality gets worse.
        </p>
        <p>
          <span className="logo">See O2</span> is user powered. Users can
          purchase an air quality sensor and hook it into our network, widening
          and deepening our coverage.
        </p>
      </div>
    );
  }
}

export default SideBar;
