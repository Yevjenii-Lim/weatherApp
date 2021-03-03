import Modal  from './Modal';
import React, { useContext, useEffect } from 'react';
import store, { weeklyData } from '../store';
import Graph from './Graph';
import Preloader from './Preloader';
import Search from './Search';
import SwiperComponent from './Swiper';
import Week from './Weekly';
import AppContext from './context';


let Routes = ({isWeatherLoaded, setShowHide}) => {
    let {showHideModal} = useContext(AppContext)

    if(isWeatherLoaded) {
        return (
            <div className='container'>
             <SwiperComponent state={store.getState()} dispatch={store.dispatch.bind(store)}></SwiperComponent>
            <Week setShowHide={setShowHide} state={store.getState()} dispatch={store.dispatch.bind(store)}></Week>
           <Graph state={store.getState()} time="sunrise"></Graph>
           <Graph state={store.getState()} time="sunset"></Graph>
            <Search  state={store.getState()} dispatch={store.dispatch.bind(store)}></Search>
           {showHideModal ? <Modal ></Modal> : null} 
            </div>
        )
    }else {
        return <Preloader></Preloader>
    }
}

export default Routes