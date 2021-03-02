import React, { useContext } from "react";
import AppContext from "./context";
import { getIcon } from "./DAL/api";


let WeekItem = (props) => {
  let time =
    new Date(props.timeCode * 1000).getHours() +
    ":" +
    new Date(props.timeCode * 1000).getMinutes() +
    "0";

  let icon = getIcon(props.icon);
  let sunRice =
    new Date(props.sunRise * 1000).getHours() +
    ":" +
    new Date(props.sunRise * 1000).getMinutes();
  let sunSet =
    new Date(props.sunSet * 1000).getHours() +
    ":" +
    new Date(props.sunSet * 1000).getMinutes();
  let backgroundColor;

  switch (true) {
    case props.weatherId > 500 && props.weatherId < 531: {
      backgroundColor = "blue darken-3"
    }
    case 800 === props.weatherId: {
      backgroundColor = "orange lighten-1";
      break;
    }
    case props.weatherId > 800: {
      backgroundColor = "grey darken-1";
      break;
    }
    case 801: {
      backgroundColor = "grey lighten-1";
      break;
    }
    case props.weatherId === 600: {
      backgroundColor = "blue lighten-1";
      break;
    }
    default: {
      backgroundColor = null;
    }
  }
   let {hideHandler} = useContext(AppContext)
// console.log(props.id)
  // (props.weatherId === 800) ? backgroundColor = "orange lighten-1" :backgroundColor = null
  return (
    <div className={"weekItem" + " " + backgroundColor} onClick={() => hideHandler(props.id)}>
      <h3 className="weekItem__title">
        <p>{time} </p> <p className="weekItem__date">{props.date}</p>{" "}
      </h3>
      <img src={icon} alt="" />
      <p>
        <span className="weekItem__dayTemp">{props.temp}&deg;</span>
      </p>
      <p className="weekItem__weather">{props.weather}</p>
      <hr className="horizontal-line" />
      <div className="weekItem__sun-data">
        <p>{sunRice}</p>
        <div>
          {" "}
          <div className="sunrise">
            <div className="horizont">
              {" "}
              <p className="sun"></p>
            </div>
          </div>
        </div>
        <p className="sunsetTime__title">{sunSet}</p>
      </div>
 
    </div>
  );
};

export default WeekItem;
