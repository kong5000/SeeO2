import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Rectangle
} from 'recharts';

export default class MonthChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  CustomBar = (props) => {
    let {fill} = props;
    if(typeof(props.average) !== 'number' || props.average === NaN) {
        fill='transparent';
    }
  
    return (<Rectangle {...props} fill={fill} />)
  };

  render() {
    return (
      <div>
      <u>{this.props.name}</u>
      <BarChart width={320} height={35} data={this.props.data.week1} margin={{
          top: 0, right: 0, left: 0, bottom: -25,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis domain={[0, 'dataMax + 600']} tick={false}/>
        <Tooltip position={{x: 0, y: -80}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill={this.props.fill} />
      </BarChart>

      <BarChart width={320} height={35} data={this.props.data.week2} margin={{
          top: 0, right: 0, left: 0, bottom: -25,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis tick={false}/>
        <Tooltip position={{x: 0, y: -115}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill={this.props.fill} />
      </BarChart>

      <BarChart width={320} height={35} data={this.props.data.week3} margin={{
          top: 0, right: 0, left: 0, bottom: -25,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis tick={false}/>
        <Tooltip position={{x: 0, y: -150}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill={this.props.fill} />
      </BarChart>
      
      <BarChart width={320} height={35} data={this.props.data.week4} margin={{
          top: 0, right: 0, left: 0, bottom: -25,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis tick={false}/>
        <Tooltip position={{x: 0, y: -185}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill={this.props.fill} />
      </BarChart>

      <BarChart width={320} height={60} data={this.props.data.week5} margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis tick={false}/>
        <Tooltip position={{x: 0, y: -220}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill={this.props.fill} />
      </BarChart>
      </div>
    );
  }
}