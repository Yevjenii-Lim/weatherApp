import React, { useEffect } from "react";
import Chart from "chart.js";


let setWeeklySunrise = (arr, time) => {
  let minutes = (time) => {

    let minutes = new Date(time * 1000).getMinutes()
   if(minutes < 10) {
     minutes = "0" + minutes
   }
    return minutes
  }
  let weeklySunrise = arr.map(i => {
    return  new Date(i[time] * 1000).getHours() +"." + minutes(i[time])
  })
  return weeklySunrise
}

let getNameOfDay = (arr) => {
  let today = new Date().getDay();
  let timeStamp = +new Date()
  let days = []; 
  let chek = true
  for (let i = 0; i < 8; i++) {
    let day = new Date().getDay();
    if(day === today && chek) {
      days.push('Today')
      chek = false
    }else {
      days.push(arr[today])
    }
    timeStamp += 86400000
    today = new Date(timeStamp).getDay();
  }
  return days;
};

let useGraph = (props) => {
  
  useEffect(() => {
    let time = props.time;
    let color;
    time === "sunrise" ? (color = "#ffff00") : (color = "#004d40");
    let weeklySunrise = setWeeklySunrise(props.state.weekly, time)
 
    let days = getNameOfDay(props.state.days)
    const myChartRef = document.getElementById(`${props.time}`).getContext("2d");
    new Chart(myChartRef, {
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
  });
}

let Graph = (props) => {
  useGraph(props)

  return (
    <div className={"graph"}>
      <h2>{props.time}</h2>
      <canvas id={props.time}  />
    </div>
  );
}


export default Graph;
