import axios from "axios";



let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "f8705a4ac77ebcd799c4a23561fad49d"
    }
})