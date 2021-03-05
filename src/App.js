import './App.css';
import Header from './components/Header';
import store from './store';
import {  useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import Routes from './components/Routes';
import AppContext from './components/context';




function App() {
  let [showHideModal, setShowHide] = useState(false)
  let [weatherModal, setData] = useState({temp:{'hello': 1}})
  let hideHandler = (id) => {
 
    setShowHide(!showHideModal)
    let itemId = store.getState().weekly.findIndex(i => i.id === id)
    setData(store.getState().weekly[itemId])
  } 
  let state = store.getState()
  return (
   <AppContext.Provider value={{ hideHandler, showHideModal, weatherModal,setShowHide, state}}>

    <div className={"header"}>

      <Header state={store.getState()} dispatch={store.dispatch.bind(store)}></Header>
    
        <Routes isWeatherLoaded={store.getState().isWeatherLoaded} setShowHide={setShowHide}></Routes>

        {/* <Week state={store.getState()} dispatch={store.dispatch.bind(store)}></Week>
        {store.getState().weekly.length > 1 ? <Graph state={store.getState()} time="sunrise"></Graph> : <Preloader></Preloader>}
        {store.getState().weekly.length > 1 ? <Graph state={store.getState()} time="sunset"></Graph> : <Preloader></Preloader>}
      <Search  state={store.getState()} dispatch={store.dispatch.bind(store)}></Search> */}
       {/* <Modal state={weatherModal} showHideModal={showHideModal} setShowHide={setShowHide}></Modal> */}
    </div>
      </AppContext.Provider>
    
  );
}

export default App;
