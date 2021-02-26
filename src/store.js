const ADD_LOCATION = "ADD_LOCATION"
const SET_TEMP = "SET_TEMP"
const SET_SUNRICE = "SET_SUNRICE"
const SET_ICON = "SET_ICON"
const SET_ALL_DATA = "SET_ALL_DATA"
const SET_WEEKLY_DATA = "SET_WEEKLY_DATA"
const SET_SEARCH_DATA = "SET_SEARCH_DATA"

let store = {
    _state: {
        location: ' ',
        temperature: { },
        timeSunRise: { },
        sys: {},
        main: {temp: 0},
        weather: [{icon: ""}],
        showWeekly: false,
        weekly: [],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", 
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        days: ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'],
        search: {}
       
    },
    getState() {
        return this._state
    },
    render() {

    },
    subscriber(f) {
        this.render = f
    },
    dispatch(action) {
        this._state = headerReducer(this._state, action)
        this.render()
    }
}

let headerReducer = (state, action) => {
        switch(action.type) {
            case ADD_LOCATION: {
                return {
                    ...state,
                    location: action.location
                }
            }
            case SET_TEMP : {
                return {
                    ...state,
                    temperature: action.temp
                }
            }
            case SET_SUNRICE: {
                return {
                    ...state,
                    timeSunRise: action.sun
                }
            }
            case SET_ICON: {
                return {
                    ...state,
                    weather: action.weather
                }
            }
            case SET_ALL_DATA : {
                return {
                    ...state,
                    ...action.data,
                   
                }
            }
            case SET_WEEKLY_DATA : {
                return {
                    ...state,
                    weekly: action.data
                }
            }
            case SET_SEARCH_DATA: {
                console.log(action.data.data)
                return {
                    ...state,
                    search: action.data.data
                }
            }
            default: return state
        }
}

export let addLocation = (location) => ({type: ADD_LOCATION, location})
export let setTemperature = (temp) => ({type: SET_TEMP, temp})
export let setTimeSunRice = (sun) => ({type: SET_SUNRICE, sun})
export let setIcon = (weather) => ({type: SET_ICON, weather});
export let setAllData = (data) => ({type: SET_ALL_DATA, data});
export let weeklyData = (data) => ({type: SET_WEEKLY_DATA, data})
export let setSearchData = (data) => ({type: SET_SEARCH_DATA, data})

export default store;