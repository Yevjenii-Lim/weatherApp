import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import store from './store';
import WeatherCard from './components/WeatherCard';
import Week from './components/Weekly';
import { useState } from 'react';
import SwiperComponent from './components/Swiper';

function App() {
  let [showWeekly, setShowWeekly] = useState(false);
  let setHideShow = () => {
    setShowWeekly(!showWeekly)
  }
  return (
    <div className={"header"}>
      <Header state={store.getState()} dispatch={store.dispatch.bind(store)}></Header>
      {/* <WeatherCard state={store.getState()} dispatch={store.dispatch.bind(store)}></WeatherCard> */}
      <SwiperComponent  state={store.getState()} dispatch={store.dispatch.bind(store)}></SwiperComponent>
      {showWeekly ? <Week state={store.getState()} dispatch={store.dispatch.bind(store)}></Week> : <button onClick={setHideShow}>Show Weekly</button>}
    </div>
  );
}

export default App;
