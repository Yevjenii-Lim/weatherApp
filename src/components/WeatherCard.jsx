import React from 'react';
import { getIcon } from './DAL/api';



let WeatherCard = (props) => {
    console.log(props.state)

    if(props.state === undefined) return <div>helo</div>
    let months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ]
    let day = new Date(props.state.dt * 1000).getDate() + " " + props.months[new Date(props.state.dt * 1000).getMonth()] 
    let sunRice;
    let sunSet;
    let description;
    let icon;
    let temp;
    if(props.state.sys === undefined) { 
        sunRice = props.state.sunrise
        sunSet = props.state.sunset
        description = props.state.weather[0].description
        icon = props.state.weather[0].icon
        temp = props.state.temp.day
    }else {
        sunRice = props.state.sys.sunrise;
        sunSet = props.state.sys.sunset;
        description = props.state.weather[0].description
        icon = props.state.weather[0].icon
        temp = props.state.main.temp
    }
    let date = new Date(sunRice * 1000) ;
    let sunSetDate = new Date(sunSet * 1000)
    let sunRiceTime = date.getHours() + ':' + date.getMinutes();
    let sunSetTime = sunSetDate.getHours() + ':' + sunSetDate.getMinutes();
    let url = getIcon(icon)
    // console.log(url)
    return (
        <div className="weatherCart">
            {day} weather at {props.state.name || props.name}
            <p>temp: {temp} C&deg;</p>
            <p>sun rise: {sunRiceTime}</p>
            <p>sun set: {sunSetTime}</p>
            <p>description: {description}</p>
        {!!url && <p>
                <img src={url} alt=""/>
            </p>} 
        </div>
    )
}

export default WeatherCard