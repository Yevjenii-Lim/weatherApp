import React from "react";
import { getIcon } from "./DAL/api";
import "materialize-css/dist/css/materialize.min.css";
import "./../preloader.css";
import Preloader from "./Preloader";

let WeatherCard = ({state, months, name, day}) => {
  // console.log(props);
  if (state === undefined) return <Preloader></Preloader>;

  let dayDate =
    new Date(state.dt * 1000).getDate() +
    " " +
    months[new Date(state.dt * 1000).getMonth()];
  let sunRice = state.sunrise;
  let sunSet = state.sunset;
  let description = state.weather[0].description;
  let icon = state.weather[0].icon;
  let temp = state.temp.day;

  let date = new Date(sunRice * 1000);
  let sunSetDate = new Date(sunSet * 1000);
  let sunRiceTime = date.getHours() + ":" + date.getMinutes();
  let sunSetTime = sunSetDate.getHours() + ":" + sunSetDate.getMinutes();
  let url = getIcon(icon);
  // console.log(props.state);
  let turn = (state.uvi * 100) / 12 / 160;
  let humidityEsteem 
  switch (true) {
    case state.humidity >  60:
      humidityEsteem = "too much"
      break;
    case state.humidity < 40: 
    humidityEsteem = 'too small'
    break;
    case state.humidity > 40 && state.humidity < 60: 
    humidityEsteem = "normal"
    default:
      break;
  }
  // console.log(url)
  return (
    <div className="weatherCart teal accent-3">
      <div className="wetherCard__sideBar">
        <h5>Weather at {state.name || name}</h5>
        {!!url && (
          <p className="weatherCard__img">
            <img src={url} alt="weather-image" />
          </p>
        )}
        <h5 className="center-align weatherCard__temp">{temp}&deg;</h5>
        <h6 className="weatherCard__meta">{dayDate}</h6>
        <p className="flow-text"> {description}</p>
      </div>
      <div>
        <h4>{day} higlights:</h4>
        <div className="highlights">
          <div className="uv__card">
            <p>UV index</p>

            <div className="gauge">
              <div className="gauge__body">
                <div className="gauge__cover">
                  <span>{state.uvi}</span>
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
              <span className="wind__speed">{state.wind_speed}</span>
              <span>m/sec</span>
            </div>
          </div>
          <div className="uv__card">
            <p>Humidity </p>

            <span className="wind__speed">{state.humidity} %</span>
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
