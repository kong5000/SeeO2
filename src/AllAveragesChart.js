import React, { PureComponent } from 'react';
import {
  RadialBarChart, RadialBar, Legend, Tooltip
} from 'recharts';

const style = {
	top: 0,
	left: 200,
	lineHeight: '24px',
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    return (
      <RadialBarChart width={200} height={200} cx={100} cy={100} innerRadius={5} outerRadius={80} barSize={10} data={this.props.data}>
        {/* <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number"/> */}
        {/* <YAxis dataKey="name" type="category"/> */}
        <Tooltip />
        <RadialBar minAngle={15} background clockWise dataKey="average" />
        <Legend iconSize={10} width={120} height={70} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
      </RadialBarChart>
    );
  }
}