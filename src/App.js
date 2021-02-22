import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import store from './store';
import WeatherCard from './components/WeatherCard';

function App() {
  return (
    <div className={"header"}>
      <Header state={store.getState()} dispatch={store.dispatch.bind(store)}></Header>
      <WeatherCard state={store.getState()} dispatch={store.dispatch.bind(store)}></WeatherCard>
    </div>
  );
}

export default App;
