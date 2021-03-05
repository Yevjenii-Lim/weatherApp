import axios from "axios";
import React, { useEffect, useState } from "react";
import { setAllData, weeklyData } from "../store";
import { getIcon, getLocation, getWeather, getWeeklyForecast } from "./DAL/api";
import "materialize-css/dist/css/materialize.min.css";

let Header = (props) => {
  let date =
    new Date(props.state.dt * 1000).getDate() +
    " " +
    props.state.months[new Date(props.state.dt * 1000).getMonth()];
  let [time, setTime] = useState("");
  useEffect(async () => {

    showLocation();
  
  }, []);

  let success = async (pos) => {
    console.log(pos.coords.latitude, pos.coords.longitude)
    let geoCode = await getLocation(pos.coords.latitude, pos.coords.longitude);

    let weather = await getWeather(geoCode.data.address.city, "&units=metric");
    console.log(weather.data)
    props.dispatch(setAllData(weather.data));
    // console.log(props.state)
    let week = await getWeeklyForecast(
      weather.data.coord.lon,
      weather.data.coord.lat,
    );
    week.data.daily.forEach((i,index) => i.id = index)
  
    
    props.dispatch(weeklyData(week.data.daily)); 
  };
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  let error = async (e) => {
    
    console.log(e.message)
//     let geoCode = await getLocation(50.431759, 30.517023);
// console.log(geoCode)
    let weather = await getWeather("Kiev", "&units=metric");
    console.log(weather.data)
    props.dispatch(setAllData(weather.data));
    // console.log(props.state)
    let week = await getWeeklyForecast(
      weather.data.coord.lon,
      weather.data.coord.lat,
    );
    week.data.daily.forEach((i,index) => i.id = index)
  
    
    props.dispatch(weeklyData(week.data.daily)); 
  
  };
  let showLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
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
