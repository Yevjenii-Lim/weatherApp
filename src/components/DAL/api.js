import axios from "axios";


let daylyForecast = 'https://api.openweathermap.org/data/2.5/onecall?';
let weather = "https://api.openweathermap.org/data/2.5/weather?q="
let API_KEY = "&appid=f8705a4ac77ebcd799c4a23561fad49d";

let instance = axios.create({
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    }
})

export let getWeather = (city, units) => {
    // console.log(weather + city + units + API_KEY)
    return axios.get(weather  + city + units  + API_KEY)
}

export let getWeeklyForecast = (lat, long) => {
    return axios.get(daylyForecast + `lat=${long}&lon=${lat}&exclude=hourly,minutely&` + '&units=metric' + API_KEY)
}
export let getLocation = (lat, long) => {
    return axios.get("https://us1.locationiq.com/v1/reverse.php?key=pk.e6819ac87d4591abdc47a03cccc19aa8&lat=" + lat + "&lon=" + long + "&format=json")
}
export let getIcon = (id) => {
    // console.log(!!id)
    if(!!id) {
        return `http://openweathermap.org/img/wn/${id}@2x.png`
    }else  {
        return false
    }
    // !!id ? return `http://openweathermap.org/img/wn/${id}@2x.png` : return false
    // return `http://openweathermap.org/img/wn/${id}@2x.png`
}