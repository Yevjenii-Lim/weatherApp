import React from 'react';
import Chart from 'chart.js';

let myLineChart;
class Graph extends React.Component {

    chartRef = React.createRef()
    // weeklySunrise = this.props.state.weekly.map(i => new Date(i.sunrise * 1000).getHours() + ":" + new Date(i.sunrise * 1000).getMinutes())
    componentDidMount() {
        this.buildChart()

    }
    componentDidUpdate() {
        this.buildChart()
    }
    buildChart = () => {
        let weeklySunrise = this.props.state.weekly.map(i => new Date(i.sunrise * 1000).getHours() + "." + new Date(i.sunrise * 1000).getMinutes())
        let today = +new Date()
        let days = [today]
        for(let i = 0; i < 7; i++) {
            // console.log(days[days.length - 1] )
            let day = (days[days.length - 1] + 86400000);
            days.push(day)
        }
        let numberOfday = days.map(i =>  new Date(i).getDay())
        console.log(numberOfday)
        console.log(this.props.state.days)
        for(let i = 0; i < numberOfday.length; i++) {
            if(new Date().getDay() === numberOfday[i]) {
                numberOfday[i] = 'today'
            }else {
                numberOfday[i] = this.props.state.days[numberOfday[i]]
            }
        }
        const myChartRef = this.chartRef.current.getContext("2d");
        if (typeof myLineChart !== "undefined") myLineChart.destroy();
        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: numberOfday,
                datasets: [
                    {
                        label: "Sunrise time",
                        data: weeklySunrise,
                        fill: false,
                        borderColor: "#ffff00 "
                    },
                    // {
                    //     label: "Sun schedule",
                    //     data: weeklySunset,
                    // }
                ]
            },
            options: {
                tooltips: {
                    callbacks: {
                        label: (tooltipItem, data) => {
                            return `Time: ${tooltipItem.value}`
                        }
                    }
                }
            }
        });

    }
    render() {
        console.log(this.props.state.weekly)

        // if(this.props.state.weekly.length < 1) return <div>preloader</div>
        return (

            <div className={'graph'}>
                <h2>Sunrice</h2>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}

export default Graph;