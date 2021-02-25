import React from 'react';
import { getIcon } from './DAL/api';


let WeekItem = (props) => {
    let date = new Date(props.date * 1000).getDay()
    let today = new Date().getDay()
    let checkDay = date === today
    let days = ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'];
    let icon = getIcon(props.icon)
    let sunRice = new Date(props.sunRise * 1000).getHours() + ':' + new Date(props.sunRise * 1000).getMinutes()
    let sunSet = new Date(props.sunSet * 1000).getHours() + ':' + new Date(props.sunSet * 1000).getMinutes()
    return (
        <div className="weekItem">
            <h3>{checkDay ? "today" : days[date]}</h3>
            <img src={icon} alt=""/>
            <p>day temp: <span>{props.temp} C&deg;</span></p>  
            <p>sun rise: {sunRice}</p>
            <p>sun set: {sunSet}</p>
        </div>
    )
}


export default WeekItem