import React, { useContext, useEffect } from 'react';
import Chart from "chart.js";
import AppContext from './context';

let Modal = (props) => {
    let {showHideModal, weatherModal,setShowHide} = useContext(AppContext)
    useEffect(()=> {
        console.log('mount')
        // let chartTemp = React.createRef()
        let chartTemp = document.getElementById(`tempChart`).getContext("2d");
        let time = Object.keys(weatherModal.temp)
        time.splice(1,2)
        // console.log(time)
        // console.log(Object.keys(weatherModal.temp))
        let temp = Object.values(weatherModal.temp)
        temp.splice(1,2)
        // console.log(chartTemp)
        const myChartRef = chartTemp
        new Chart(myChartRef, {
            type: "line",
            data: {
              //Bring in data
              labels: time,
              datasets: [
                {
                  label: "Temperature during day",
                  data: temp,
                  fill: false,
                //   borderColor: color,
                },
              ],
            },
            options: {
                tooltips: {
                  callbacks: {
                    label: (tooltipItem, data) => {
                        // console.log(tooltipItem)
                      return `Time: ${tooltipItem.value}`;
                    },
                  },
                },
              },
        })

    }, [weatherModal])

    let handler = (e) => {
        e.stopPropagation()
        if(e.target.nodeName !== 'CANVAS') {
            setShowHide(false)

        }
    }
    let show = showHideModal ? 'show' : null
    let grow = showHideModal ? "growWindow" : null

        return <div className={'modal-wrap'+ " "  + show} onClick={(e) => handler(e)}>
        <div className={'modal-content' + " " + grow}>
            <p>Dayily highlights</p>
            <div  >
                <canvas id={`tempChart`} ></canvas>
            </div>
        </div>
    </div>

    // console.log(props.state)
    
}

export default Modal