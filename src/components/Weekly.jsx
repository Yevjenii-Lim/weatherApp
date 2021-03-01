import React, { useEffect } from "react";
import { weeklyData } from "../store";
import { getWeeklyForecast } from "./DAL/api";
import WeekItem from "./WeekItem";

let Week = (props) => {
  console.log(props)
  useEffect(async () => {
    // console.log(props.state.coord === undefined)
    if (props.state.coord === undefined) {
      return null;
    } else {
      let week = await getWeeklyForecast(
        props.state.coord.lon,
        props.state.coord.lat
      );
      // console.log(week)
      props.dispatch(weeklyData(week.data.daily));
    }
  }, [props.state.coord]);

  let oneTime;
  let checkDay = (target) => {
    let today = new Date().getDay();
    target = new Date(target * 1000).getDay()
    if (today === target && oneTime === undefined) {
      oneTime = "Today";
      return "Today";
    } else {
      return props.state.days[target];
    }
  };
  window.week = props.state.weekly
  // console.log(props.state)
  console.log(props.state)
  let items = props.state.weekly.map((i, index) => {
    return (
      <WeekItem
        key={index}
        temp={i.temp.day}
        timeCode={i.dt}
        date={checkDay(i.dt)}
        icon={i.weather[0].icon}
        sunRise={i.sunrise}
        sunSet={i.sunset}
        weather={i.weather[0].description}
        weatherId={i.weather[0].id}
      ></WeekItem>
    );
  });
  // console.log(items )
  return (
    <div className="">
      <h2>Weather Forecast for the next week</h2>
      {/* <WeekItem temp='12312'></WeekItem> */}
      <div className="weekRow">{items}</div>
    </div>
  );
};

export default Week;
