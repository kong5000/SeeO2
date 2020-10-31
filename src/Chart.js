import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Rectangle
} from 'recharts';

export default class Chart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  CustomBar = (props) => {
    let {fill} = props;
    if(typeof(props[this.props.dataKey]) !== 'number') {
        fill='transparent';
    }
  
    return (<Rectangle {...props} fill={fill} />)
  };

  render() {
    return (
      <BarChart
        width={320}
        height={300}
        data={this.props.data}
        margin={{
          top: 5, right: 0, left: 0, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false} reversed={true}></XAxis>
        <YAxis/>
        <Tooltip />
        <Legend />
        <Bar shape={this.CustomBar} minPointSize={3} dataKey={this.props.dataKey} stackId='x' fill={this.props.fill} />
      </BarChart>
    );
  }
}