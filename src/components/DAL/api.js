import axios from "axios";


let daylyForecast = 'https://api.openweathermap.org/data/2.5/onecall?';
let weather = "https://api.openweathermap.org/data/2.5/weather?q="
let API_KEY = "&appid=f8705a4ac77ebcd799c4a23561fad49d";
let holiDay = "https://getfestivo.com/v2/holidays?api_key=d01d972024e5c3a62805568ab29bc87e"

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
}

export const getHoliday = (country, year, mounth, day) => {
    let options = "&country=us&year=2020&month=06&day=01"
    // console.log(`${holiDay}&country=${country}&year=${2020}&month=${mounth}&day=${day}`)
    return axios.get(`${holiDay}&country=${country}&year=${2020}&month=${mounth}&day=${day}`)
}