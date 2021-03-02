import React, { useEffect } from 'react';
import store, { weeklyData } from '../store';
import Graph from './Graph';
import Preloader from './Preloader';
import Search from './Search';
import SwiperComponent from './Swiper';
import Week from './Weekly';


let Routes = ({isWeatherLoaded, setShowHide}) => {

    if(isWeatherLoaded) {
        return (
            <div className='container'>
             <SwiperComponent state={store.getState()} dispatch={store.dispatch.bind(store)}></SwiperComponent>
            <Week setShowHide={setShowHide} state={store.getState()} dispatch={store.dispatch.bind(store)}></Week>
           <Graph state={store.getState()} time="sunrise"></Graph>
           <Graph state={store.getState()} time="sunset"></Graph>
            <Search  state={store.getState()} dispatch={store.dispatch.bind(store)}></Search>
            </div>
        )
    }else {
        return <Preloader></Preloader>
    }
}

export default Routes