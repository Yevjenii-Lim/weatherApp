import React, { useContext, useEffect, useState } from "react";
import Chart from "chart.js";
import AppContext from "./context";
import { getHoliday } from "./DAL/api";

let Modal = (props) => {
  let { showHideModal, weatherModal, setShowHide, state } = useContext(
    AppContext
  );
  let date = new Date(weatherModal.dt * 1000);

  useGraph(weatherModal);

  let handler = (e) => {
    if (e.target.id !== "content" && e.target.nodeName !== "CANVAS") {
      setShowHide(false);
    }
  };
  let show = showHideModal ? "show" : null;
  let grow = showHideModal ? "growWindow" : null;
  let shirink = showHideModal ? null : "shirink";
  let arrHolidays = [{date: date, country: state.sys.country},].map(i => {
      return <HolidaysComponent
        date={i.date}
        country={i.country}
        key={i.country}
      >

      </HolidaysComponent>
  })

  return (
    <div className={"modal-wrap" + " " + show} onClick={(e) => handler(e)}>
      <div
        id="content"
        className={"modal-content" + " " + grow + " " + shirink}
      >
        <p>Dayily highlights</p>
        <div>
          <canvas id={`tempChart`}></canvas>
        </div>
        {arrHolidays}
      </div>
    </div>
  );

  // console.log(props.state)
};


let HolidaysComponent = (props) => {
    return <div>
        <p>Holidays in {props.country}</p>
        <ol>{useHolidays(props.date, props.country)}</ol>
    </div>
}


function useGraph(obj) {
  useEffect(() => {
    let chartTemp = document.getElementById(`tempChart`).getContext("2d");
    let resultObject = sliceFromObject(obj.temp);

    new Chart(chartTemp, {
      type: "line",
      data: {
        //Bring in data
        labels: resultObject.key,
        datasets: [
          {
            label: "Temperature during day",
            data: resultObject.val,
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
              return `Temp: ${tooltipItem.value}`;
            },
          },
        },
      },
    });
  });
}

 function useHolidays(date, country) {
    let [holidays, setHolidays] = useState([{ name: "No holidays for today" }]);
  
    useEffect(async () => {
      let year = date.getFullYear();
      let mounth = date.getMonth() + 1;
      let day = date.getDate();
  
      let holy = await getHoliday(country, year, mounth, day);
  
      if (holy.data.holidays.length > 0) {
        setHolidays(holy.data.holidays);
      }
    }, []);
    let itemsHolidays = holidays.map((i, index) => {
      return <li key={index}>{i.name}</li>;
    });
    return itemsHolidays;
  }

let sliceFromObject = (obj) => {
  let arrKey = Object.keys(obj);
  let arrVal = Object.values(obj);
  arrKey = orderArr(arrKey);
  arrVal = orderArr(arrVal);
  return {
    key: arrKey,
    val: arrVal,
  };
};
let orderArr = (arr) => {
  let copy = [];
  copy[0] = arr[5];
  copy[1] = arr[0];
  copy[2] = arr[4];
  copy[3] = arr[3];
  return copy;
};
export default Modal;
