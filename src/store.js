const ADD_LOCATION = "ADD_LOCATION"
const SET_TEMP = "SET_TEMP"
const SET_SUNRICE = "SET_SUNRICE"

let store = {
    _state: {
        location: ' ',
        temperature: { },
        timeSunRise: { }
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
            default: return state
        }
}

export let addLocation = (location) => ({type: ADD_LOCATION, location})
export let setTemperature = (temp) => ({type: SET_TEMP, temp})
export let setTimeSunRice = (sun) => ({type: SET_SUNRICE, sun})


export default store;