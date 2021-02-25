import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addLocation, setAllData, setIcon, setTemperature, setTimeSunRice } from '../store';
import { getIcon, getLocation, getWeather } from './DAL/api';
import 'materialize-css/dist/css/materialize.min.css'

let Header = (props) => {

    let date = new Date(props.state.dt * 1000).getDate() + " " + props.state.months[new Date(props.state.dt * 1000).getMonth()] 
    let [time, setTime] = useState('')
    useEffect(async () => {
        timeReset()
        showLocation()
    }, [])

    let success = async (pos) => {
        let geoCode = await getLocation(pos.coords.latitude, pos.coords.longitude)

        let weather = await getWeather(geoCode.data.address.city, '&units=metric')
        // console.log(weather)
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
        <header className='teal accent-3 container row center-align'>
            <div className="col s3 ">
                <p>City: {props.state.name}</p>
                <button onClick={showLocation} className='waves-effect waves-light btn waves-light red'>location </button>
            </div>
                <h1 className="col s6 flow-text">Weather forecast</h1>
            <div className="col s3">
                <p>Localtime: {time} </p>
                <p>Date :{date} </p>
            </div>
        </header>
    )
}


export default Header