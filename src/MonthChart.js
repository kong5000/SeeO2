import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Rectangle
} from 'recharts';

const data = {
  week1: [
    {name: "Sunday October 1",average: 12},
    {name: "Monday October 2",average: 12},
    {name: "Tuesday October 3",average: 12},
    {name: "Wednesday October 4",average: 12},
    {name: "Thursday October 5",average: 12},
    {name: "Friday October 6",average: 12},
    {name: "Saturday October 7",average: 12},
  ],
  week2: [
    {name: "Sunday October 1",average: 12},
    {name: "Monday October 2",average: 12},
    {name: "Tuesday October 3",average: 12},
    {name: "Wednesday October 4",average: 12},
    {name: "Thursday October 5",average: 12},
    {name: "Friday October 6",average: 12},
    {name: "Saturday October 7",average: 12},
  ],
  week3: [
    {name: "Sunday October 1",average: 12},
    {name: "Monday October 2",average: 12},
    {name: "Tuesday October 3",average: 12},
    {name: "Wednesday October 4",average: 12},
    {name: "Thursday October 5",average: 12},
    {name: "Friday October 6",average: 12},
    {name: "Saturday October 7",average: 12},
  ],
  week4: [
    {name: "Sunday October 1",average: 12},
    {name: "Monday October 2",average: 12},
    {name: "Tuesday October 3",average: 12},
    {name: "Wednesday October 4",average: 12},
    {name: "Thursday October 5",average: 12},
    {name: "Friday October 6",average: 12},
    {name: "Saturday October 7",average: 12},
  ],
  week5: [
    {name: "Sunday October 1",average: 12},
    {name: "Monday October 2",average: 12},
    {name: "Tuesday October 3",average: null},
    {name: "Wednesday October 4",average: null},
    {name: "Thursday October 5",average: null},
    {name: "Friday October 6",average: null},
    {name: "Saturday October 7",average: null},
  ]
}

export default class MonthChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  CustomBar = (props) => {
    let {fill} = props;
    console.log(props)
    if(typeof(props.average) !== 'number') {
        fill='transparent';
    }
  
    return (<Rectangle {...props} fill={fill} />)
  };

  render() {
    return (
      <div>
      <BarChart width={320} height={35} data={this.props.data.week1} margin={{
          top: 0, right: 0, left: 0, bottom: -25,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis domain={[0, 'dataMax + 600']} tick={false}/>
        <Tooltip position={{x: 0, y: -80}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill='#444488' />
      </BarChart>

      <BarChart width={320} height={35} data={this.props.data.week2} margin={{
          top: 0, right: 0, left: 0, bottom: -25,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis tick={false}/>
        <Tooltip position={{x: 0, y: -115}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill='#448844' />
      </BarChart>

      <BarChart width={320} height={35} data={this.props.data.week3} margin={{
          top: 0, right: 0, left: 0, bottom: -25,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis tick={false}/>
        <Tooltip position={{x: 0, y: -150}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill='#884444' />
      </BarChart>
      
      <BarChart width={320} height={35} data={this.props.data.week4} margin={{
          top: 0, right: 0, left: 0, bottom: -25,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis tick={false}/>
        <Tooltip position={{x: 0, y: -185}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill='#884444' />
      </BarChart>

      <BarChart width={320} height={60} data={this.props.data.week5} margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}></XAxis>
        <YAxis tick={false}/>
        <Tooltip position={{x: 0, y: -220}} />
        <Bar shape={this.CustomBar} minPointSize={10} maxBarSize={20} dataKey="average" stackId='x' fill='#888888' />
      </BarChart>
      </div>
    );
  }
}