import React, { Component } from "react";
// import ReactDom from "react-dom";

const sidebar = {
  color: "blue",
  fontWeight: "700",
  paddingRight: "30px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  flexDirection: "column",
};

export class SideBar extends Component {
  render() {
    return (
      <div style={sidebar}>
        <h3>See O2</h3>
        <h4>Your Local Air Quality Source</h4>
      </div>
    );
  }
}

export default SideBar;
