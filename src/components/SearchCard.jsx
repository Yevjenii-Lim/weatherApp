import React from 'react';
import { getIcon } from './DAL/api';



let SearchCard = (props) => {
let icon = props.state.weather[0].icon
let url = getIcon(icon)
let time = new Date(props.state.dt * 1000).toLocaleString()
let sunSet = new Date(props.state.sys.sunset * 1000).toLocaleTimeString()
let sunRise = new Date(props.state.sys.sunrise * 1000).toLocaleTimeString()
    return <div className="search-card">
        <p className="location__title">
        {props.state.name}
        </p>
        <div className="search-card__icon">
            <img src={url} alt=""/>
            <p>{props.state.weather[0].description}</p>
            <p>Current time:</p>
            <p>{time}</p>
        </div>
        <div>
            <p className='search-card__temp'>{props.state.main.temp}&deg;</p>
            <p>Feels like: {props.state.main.feels_like}&deg;</p>

        </div>
        <div>
       
            <p>Humidity: {props.state.main.humidity}</p>
            <p>Presure: {props.state.main.pressure}</p>
            <p>Sunrise: {sunRise}</p>
            <p>Sunset: {sunSet}</p>
        </div>
    </div>
}


export default SearchCard