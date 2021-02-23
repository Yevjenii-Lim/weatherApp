import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addLocation, setAllData, setIcon, setTemperature, setTimeSunRice } from '../store';
import { getIcon, getLocation, getWeather } from './DAL/api';


let Header = (props) => {
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    let date = new Date(props.state.dt * 1000).getDate() + " " + props.state.months[new Date(props.state.dt * 1000).getMonth()] 
    let [time, setTime] = useState('')
    useEffect(async () => {
        timeReset()

    }, [])

    let success = async (pos) => {
        let geoCode = await getLocation(pos.coords.latitude, pos.coords.longitude)

        let weather = await getWeather(geoCode.data.address.city, '&units=metric')
        console.log(weather)
        props.dispatch(setAllData(weather.data))
        // props.dispatch(addLocation(weather.data.name))
        // props.dispatch(setTemperature(weather.data.main))
        // props.dispatch(setTimeSunRice(weather.data.sys))

        // props.dispatch(setIcon(weather.data.weather[0]))
    }
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    let error = (e) => console.log(e.message)
    let showLocation = () => {
        navigator.geolocation.getCurrentPosition(success, error, options)
    }
    // console.log(time.getHours())
    let timeReset = () => {
        let timeStamp = new Date()

        setTime(timeStamp.getHours() + ':' + timeStamp.getMinutes() )
    }
    
    setInterval(timeReset, 60000)
    return (
        <header>
            <div>
                <p>City: {props.state.name}</p>
                <button onClick={showLocation}>location </button>
            </div>
                <h1>Weather forecast</h1>
            <div>
                <p>Localtime: {time} </p>
                <p>Date :{date} </p>
            </div>
        </header>
    )
}


export default Header