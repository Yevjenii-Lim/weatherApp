import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { addLocation, setTemperature, setTimeSunRice } from '../store';

let getLocation = "https://us1.locationiq.com/v1/reverse.php?key=pk.e6819ac87d4591abdc47a03cccc19aa8&lat="
let getWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKeyWeather = "&appid=f8705a4ac77ebcd799c4a23561fad49d"
let Header = (props) => {
    // console.log(props)
    // let [city, setCity] = useState('')
    let [time, setTime] = useState('')
    useEffect(async () => {
        timeReset()
        // let weather  = await axios.get("http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=f8705a4ac77ebcd799c4a23561fad49d")
        // console.log( weather)
    }, [])

    let success = async (pos) => {
        let geoCode = await axios.get(getLocation + pos.coords.latitude + "&lon=" + pos.coords.longitude + "&format=json")
        // console.log("https://api.openweathermap.org/data/2.5/weather?q=" + geoCode.data.address.city + apiKeyWeather)
        let weather = await axios.get(getWeather + geoCode.data.address.city + '&units=metric' + apiKeyWeather)
        console.log(weather)
        props.dispatch(addLocation(weather.data.name))
        props.dispatch(setTemperature(weather.data.main))
        props.dispatch(setTimeSunRice(weather.data.sys))
        // setCity(weather.data.name)
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
                <p>City: {props.state.location}</p>
                <button onClick={showLocation}>location </button>
            </div>
            <div>
                <p>Localtime: {time} </p>
            </div>
        </header>
    )
}


export default Header