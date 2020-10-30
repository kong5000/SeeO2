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
        height={150}
        data={this.props.data}
        margin={{
          top: 5, right: 0, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false} reversed={true}></XAxis>
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={this.props.dataKey} fill={this.props.fill} />
      </BarChart>
    );
  }
}