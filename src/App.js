import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import store from './store';
import WeatherCard from './components/WeatherCard';
import Week from './components/Weekly';
import { useContext, useState } from 'react';
import SwiperComponent from './components/Swiper';
import 'materialize-css/dist/css/materialize.min.css'
import Graph from './components/Graph';
import Preloader from './components/Preloader';
import Search from './components/Search';
import Routes from './components/Routes';
import Modal from "./components/Modal";
import AppContext from './components/context';




function App() {
  let [showHideModal, setShowHide] = useState(false)
  let [weatherModal, setData] = useState({})
  let hideHandler = (id) => {
 
    setShowHide(!showHideModal)
    let itemId = store.getState().weekly.findIndex(i => i.id === id)
    // console.log(store.getState().weekly[itemId])
    setData(store.getState().weekly[itemId])
  } 
  return (
   <AppContext.Provider value={{ hideHandler}}>

    <div className={"header"}>

      <Header state={store.getState()} dispatch={store.dispatch.bind(store)}></Header>
    
        <Routes isWeatherLoaded={store.getState().isWeatherLoaded} setShowHide={setShowHide}></Routes>

        {/* <Week state={store.getState()} dispatch={store.dispatch.bind(store)}></Week>
        {store.getState().weekly.length > 1 ? <Graph state={store.getState()} time="sunrise"></Graph> : <Preloader></Preloader>}
        {store.getState().weekly.length > 1 ? <Graph state={store.getState()} time="sunset"></Graph> : <Preloader></Preloader>}
      <Search  state={store.getState()} dispatch={store.dispatch.bind(store)}></Search> */}
       <Modal state={weatherModal} showHideModal={showHideModal} setShowHide={setShowHide}></Modal>
    </div>
      </AppContext.Provider>
    
  );
}

export default App;
