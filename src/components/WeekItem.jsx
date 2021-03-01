import React from "react";
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

  switch (props.weatherId) {
    case 800: {
      backgroundColor = "orange lighten-1";
      break;
    }
    case 803: {
      backgroundColor = "grey darken-1";
      break;
    }
    case 802: {
      backgroundColor = "grey lighten-1";
      break;
    }
    case 600: {
      backgroundColor = "blue lighten-1";
      break;
    }
    default: {
      backgroundColor = null;
    }
  }
  // (props.weatherId === 800) ? backgroundColor = "orange lighten-1" :backgroundColor = null
  return (
    <div className={"weekItem" + " " + backgroundColor}>
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
