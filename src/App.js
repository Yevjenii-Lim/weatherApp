import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import store from './store';
import WeatherCard from './components/WeatherCard';
import Week from './components/Weekly';
import { useState } from 'react';
import SwiperComponent from './components/Swiper';
import 'materialize-css/dist/css/materialize.min.css'
import Graph from './components/Graph';
import Preloader from './components/Preloader';
import Search from './components/Search';

function App() {
  let [showWeekly, setShowWeekly] = useState(false);

  return (
    <div className={"header"}>
      <Header state={store.getState()} dispatch={store.dispatch.bind(store)}></Header>
      {store.getState().weekly.length > 1 ?<SwiperComponent state={store.getState()} dispatch={store.dispatch.bind(store)}></SwiperComponent> : <Preloader></Preloader> } 
      <div className='container'>
        <Week state={store.getState()} dispatch={store.dispatch.bind(store)}></Week>
        {store.getState().weekly.length > 1 ? <Graph state={store.getState()} time="sunrise"></Graph> : <Preloader></Preloader>}
        {store.getState().weekly.length > 1 ? <Graph state={store.getState()} time="sunset"></Graph> : <Preloader></Preloader>}
        <Search  state={store.getState()} dispatch={store.dispatch.bind(store)}></Search>
      </div>
    </div>
  );
}

export default App;
