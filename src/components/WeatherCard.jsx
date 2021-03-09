import React from "react";
import { getIcon } from "./DAL/api";
import "materialize-css/dist/css/materialize.min.css";
import "./../preloader.css";
import Preloader from "./Preloader";




let getHumidityEsteem = (humidity) => {
  switch (true) {
    case humidity >  60:
      return <span>Too much &#128552;</span> 
 
    case humidity < 40: 
    return <span>Not enough &#128533;</span>

    case humidity > 40 && humidity < 60: 
    return <span>Fine &#128512;</span> 
    default:
      return undefined
  }
}


export let sunTime = (time) => {
  let timeStamp = time * 1000
  return new Date(timeStamp).getHours() + ":" + new Date(timeStamp).getMinutes()
}

let setTime = (today, state, months) => {
    return {
      today: new Date(today * 1000).toLocaleDateString(),
      sunrise: sunTime(state.sunrise),
      sunset: sunTime(state.sunset)
    } 
}

let WeatherCard = ({state, months, name, day}) => {
  // console.log(props);
  if (state === undefined) return <Preloader></Preloader>;

  let dayDate = setTime(state.dt, state)

  let description = state.weather[0].description;
  let icon = state.weather[0].icon;
  let temp = state.temp.day;
  let url = getIcon(icon);
  // console.log(props.state);
  let turn = (state.uvi * 100) / 12 / 160;
  let humidityEsteem = getHumidityEsteem(state.humidity)


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
        <h6 className="weatherCard__meta">{dayDate.today}</h6>
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
            <p>&#8593;: {dayDate.sunrise}</p>
            <p>&#8595;: {dayDate.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
