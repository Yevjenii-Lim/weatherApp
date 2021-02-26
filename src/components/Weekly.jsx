import React, { useEffect } from "react";
import { weeklyData } from "../store";
import { getWeeklyForecast } from "./DAL/api";
import WeekItem from "./WeekItem";

let Week = (props) => {
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

  let today = new Date().getDay();
  let oneTime;
  let days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
  let checkDay = (today, target) => {
    target = new Date(target * 1000).getDay();
    if (today == target && oneTime === undefined) {
      oneTime = "today";
      return "today";
    } else {
      return days[target];
    }
  };
  // console.log(props.state)
  // console.log(props.state.weekly)
  let items = props.state.weekly.map((i, index) => {
    return (
      <WeekItem
        key={index}
        temp={i.temp.day}
        date={checkDay(today, i.dt)}
        icon={i.weather[0].icon}
        sunRise={i.sunrise}
        sunSet={i.sunset}
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
