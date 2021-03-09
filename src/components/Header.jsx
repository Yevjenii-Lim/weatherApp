
import React, { useEffect, useState } from "react";
import { setAllData, weeklyData } from "../store";
import {getLocation, getWeather, getWeeklyForecast } from "./DAL/api";
import "materialize-css/dist/css/materialize.min.css";



let success = async (pos, props) => {
  let geoCode = await getLocation(pos.coords.latitude, pos.coords.longitude);
  let weather = await getWeather(geoCode.data.address.city, "&units=metric");
  props.dispatch(setAllData(weather.data));
  let week = await getWeeklyForecast(
    weather.data.coord.lon,
    weather.data.coord.lat,
  );
  week.data.daily.forEach((i,index) => i.id = index)
  props.dispatch(weeklyData(week.data.daily)); 
};

let error = async (e, props) => {
  console.log(e.message)
  let weather = await getWeather("Kiev", "&units=metric");
  props.dispatch(setAllData(weather.data));
  let week = await getWeeklyForecast(
    weather.data.coord.lon,
    weather.data.coord.lat,
  );
  week.data.daily.forEach((i,index) => i.id = index)
  props.dispatch(weeklyData(week.data.daily)); 
};


let Header = (props) => {
  let timeStamp = props.state.dt * 1000
  let mounthNumber = new Date(timeStamp).getMonth()
  let date = new Date(timeStamp).getDate() + " " + props.state.months[mounthNumber];

  useEffect(async () => {
    showLocation();
  }, []);


  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  let showLocation = () => {
    navigator.geolocation.getCurrentPosition((pos)=> success(pos,props),(e) => error(e,props), options);
  };
  // console.log(time.getHours())


  return (
    <header className="teal accent-3 container row center-align">
      <div className="col s3 ">
        <p>City: {props.state.name}</p>
  
      </div>
      <h1 className="col s6 flow-text">Weather forecast</h1>
      <div className="col s3">
        <p>Localtime:  </p>
        <p>Date :{date} </p>
      </div>
    </header>
  );
};

export default Header;
