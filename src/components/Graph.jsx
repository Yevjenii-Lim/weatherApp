import React from "react";
import Chart from "chart.js";

let myLineChart;
class Graph extends React.Component {
  chartRef = React.createRef();
  // weeklySunrise = this.props.state.weekly.map(i => new Date(i.sunrise * 1000).getHours() + ":" + new Date(i.sunrise * 1000).getMinutes())
  componentDidMount() {
    this.buildChart();
  }
  componentDidUpdate() {
    this.buildChart();
  }
  buildChart = () => {
    let time = this.props.time;
    let color;
    time === "sunrise" ? (color = "#ffff00") : (color = "#004d40");

    let weeklySunrise = this.props.state.weekly.map(
      (i) =>
        new Date(i[time] * 1000).getHours() +
        "." +
        new Date(i[time] * 1000).getMinutes()
    );
    let today = +new Date();
    let days = [];
    let getNameOfDay = (num) => {
      if (
        new Date().getDay() === num &&
        days.findIndex((i) => i === "today") === -1
      ) {
        return "today";
      }
      return this.props.state.days[num];
    };

    for (let i = 0; i < 8; i++) {
      let day = new Date(today).getDay();
      let getName = getNameOfDay(day);
      days.push(getName);
      today = today + 86400000;
    }

    const myChartRef = this.chartRef.current.getContext("2d");
    // if (typeof myLineChart !== "undefined") myLineChart.destroy();
    myLineChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: days,
        datasets: [
          {
            label: "Sunrise time",
            data: weeklySunrise,
            fill: false,
            borderColor: color,
          },
          // {
          //     label: "Sun schedule",
          //     data: weeklySunset,
          // }
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              return `Time: ${tooltipItem.value}`;
            },
          },
        },
      },
    });
  };
  render() {
    // if(this.props.state.weekly.length < 1) return <div>preloader</div>
    return (
      <div className={"graph"}>
        <h2>{this.props.time}</h2>
        <canvas id={this.props.time} ref={this.chartRef} />
      </div>
    );
  }
}

export default Graph;
