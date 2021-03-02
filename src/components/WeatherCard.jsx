import React from "react";
import { getIcon } from "./DAL/api";
import "materialize-css/dist/css/materialize.min.css";
import "./../preloader.css";
import Preloader from "./Preloader";

let WeatherCard = (props) => {
  // console.log(props);
  if (props.state === undefined) return <Preloader></Preloader>;

  let day =
    new Date(props.state.dt * 1000).getDate() +
    " " +
    props.months[new Date(props.state.dt * 1000).getMonth()];
  let sunRice;
  let sunSet;
  let description;
  let icon;
  let temp;
  if (props.state.sys === undefined) {
    sunRice = props.state.sunrise;
    sunSet = props.state.sunset;
    description = props.state.weather[0].description;
    icon = props.state.weather[0].icon;
    temp = props.state.temp.day;
  } else {
    sunRice = props.state.sys.sunrise;
    sunSet = props.state.sys.sunset;
    description = props.state.weather[0].description;
    icon = props.state.weather[0].icon;
    temp = props.state.main.temp;
  }
  let date = new Date(sunRice * 1000);
  let sunSetDate = new Date(sunSet * 1000);
  let sunRiceTime = date.getHours() + ":" + date.getMinutes();
  let sunSetTime = sunSetDate.getHours() + ":" + sunSetDate.getMinutes();
  let url = getIcon(icon);
  // console.log(props.state);
  let turn = (props.state.uvi * 100) / 12 / 160;
  let humidityEsteem 
  switch (true) {
    case props.state.humidity >  60:
      humidityEsteem = "too much"
      break;
    case props.state.humidity < 40: 
    humidityEsteem = 'too small'
    break;
    case props.state.humidity > 40 && props.state.humidity < 60: 
    humidityEsteem = "normal"
    default:
      break;
  }
  // console.log(url)
  return (
    <div className="weatherCart teal accent-3">
      <div className="wetherCard__sideBar">
        <h5>Weather at {props.state.name || props.name}</h5>
        {!!url && (
          <p className="weatherCard__img">
            <img src={url} alt="weather-image" />
          </p>
        )}
        <h5 className="center-align weatherCard__temp">{temp}&deg;</h5>
        <h6 className="weatherCard__meta">{day}</h6>
        <p className="flow-text"> {description}</p>
      </div>
      <div>
        <h4>{props.day} higlights:</h4>
        <div className="highlights">
          <div className="uv__card">
            <p>UV index</p>

            <div className="gauge">
              <div className="gauge__body">
                <div className="gauge__cover">
                  <span>{props.state.uvi}</span>
                </div>
                <div
                  className="gauge__fill"
                  style={{ transform: `rotate(${turn}turn)` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="uv__card">
            <p>Wind speed</p>
            <div>
              <span className="wind__speed">{props.state.wind_speed}</span>
              <span>m/sec</span>
            </div>
          </div>
          <div className="uv__card">
            <p>Humidity </p>

            <span className="wind__speed">{props.state.humidity} %</span>
            <p>{humidityEsteem}</p>
          </div>
          <div className="uv__card sunset">
            <p>Sunrise & sunset </p>
            <p>&#8593;: {sunRiceTime}</p>
            <p>&#8595;: {sunSetTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
