import React, { PureComponent } from 'react';
import {
  RadialBarChart, RadialBar, Tooltip
} from 'recharts';

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <div>
      <u>{this.props.dataKey}</u>
      <RadialBarChart width={400} height={200} cx={200} cy={100} innerRadius={5} outerRadius={80} barSize={10} data={this.props.data}>
        {/* <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number"/> */}
        {/* <YAxis dataKey="name" type="category"/> */}
        <Tooltip />
        <RadialBar minAngle={15} background clockWise stackId="x" dataKey="date" />
        <RadialBar minAngle={15} background clockWise stackId="x" dataKey="average" />
      </RadialBarChart>
      </div>
    );
  }
}