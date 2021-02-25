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

function App() {
  let [showWeekly, setShowWeekly] = useState(false);
  let setHideShow = () => {
    setShowWeekly(!showWeekly)
  }
  return (
    <div className={"header"}>
      <Header state={store.getState()} dispatch={store.dispatch.bind(store)}></Header>
      {/* <WeatherCard state={store.getState()} dispatch={store.dispatch.bind(store)}></WeatherCard> */}
      <SwiperComponent state={store.getState()} dispatch={store.dispatch.bind(store)}></SwiperComponent>
      <div className='container'>
        <Week state={store.getState()} dispatch={store.dispatch.bind(store)}></Week>
        {/* <Graph state={store.getState()}></Graph> */}
        {store.getState().weekly.length > 1 ? <Graph state={store.getState()}></Graph> : <Preloader></Preloader>}
        {/* {showWeekly ? <Week state={store.getState()} dispatch={store.dispatch.bind(store)}></Week> : <button onClick={setHideShow} className="waves-effect waves-light btn waves-light red">Show Weekly</button>} */}

      </div>
    </div>
  );
}

export default App;
