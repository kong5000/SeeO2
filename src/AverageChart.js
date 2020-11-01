import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, La
} from 'recharts';

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <BarChart
        width={320}
        height={100}
        data={this.props.data}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number"/>
        <YAxis dataKey="name" type="category"/>
        <Tooltip /> 
        {/* <Bar dataKey='c02' fill="#8884d8" />
        <Bar dataKey='tvoc' fill="#448844" /> */}
        <Bar name="pm2.5" dataKey='pm25' fill="#884444" />
        <Bar dataKey='pm10' fill="#888888" />
      </BarChart>
    );
  }
}