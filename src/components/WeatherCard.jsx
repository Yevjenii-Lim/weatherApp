import React from 'react';



let WeatherCard = (props) => {
    let date = new Date(props.state.timeSunRise.sunrise * 1000) ;
    let sunSetDate = new Date(props.state.timeSunRise.sunset * 1000)
    let sunRiceTime = date.getHours() + ':' + date.getMinutes();
    let sunSetTime = sunSetDate.getHours() + ':' + sunSetDate.getMinutes();
    console.log(date.toString())
    return (
        <div>
            Today`s weather at {props.state.location}
            <p>temp: {props.state.temperature.temp} C&deg;</p>
            <p>sun rise: {sunRiceTime}</p>
            <p>sun set: {sunSetTime}</p>
        </div>
    )
}

export default WeatherCard