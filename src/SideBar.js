import React, { Component } from "react";
import "./SideBar.css";

export class SideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <h1>See O2</h1>
        <h4>Your Local Air Quality Source</h4>
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
          See O2 is user powered. Users can purchase an air quality sensor and
          hook it into our network, widening and deepening our coverage.
        </p>
      </div>
    );
  }
}

export default SideBar;
