import React, { useContext } from "react";
import AppContext from "./context";
import { getIcon } from "./DAL/api";


let sunTime = (time) => {
  return `${new Date(time * 1000).getHours()} : ${new Date(time * 1000).getMinutes()}`
}

let setBackgroundColor = (weatherId) => {
  switch (true) {
    case weatherId > 499 && weatherId < 531: {
      return "blue darken-3"
    }
    case 800 === weatherId: {
      return "orange lighten-1";
    }
    case weatherId > 800: {
      return "grey darken-1";
    }
    case 801: {
      return "grey lighten-1";
    }
    case weatherId === 600: {
      return "blue lighten-1";
    }
    default: {
      return null;
    }
  }
}

let WeekItem = (props) => {

  let time = new Date(props.timeCode * 1000).toLocaleDateString()
  let icon = getIcon(props.icon);
  let sunRice = sunTime(props.sunRise)
  let sunSet = sunTime(props.sunSet)

  let backgroundColor = setBackgroundColor(props.weatherId)
  
   let {hideHandler} = useContext(AppContext)

  return (
    <div className={"weekItem" + " " + backgroundColor} onClick={() => hideHandler(props.id)}>
      <h3 className="weekItem__title">
        <p>{time} </p> <p className="weekItem__date">{props.date}</p>{" "}
      </h3>
      <img src={icon} alt="imgage weather" />
      <p>
        <span className="weekItem__dayTemp">{props.temp.day}&deg;</span>
      </p>
      <p className="weekItem__weather">Mostly {props.weather}.<br/> Max: {props.temp.max}&deg;<br/> Min: {props.temp.min}&deg;</p>
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
