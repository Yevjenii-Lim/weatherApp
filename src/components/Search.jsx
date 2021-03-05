import React, { useState } from "react";
import { setSearchData } from "../store";
import { getWeather } from "./DAL/api";
import SearchCard from "./SearchCard";


let Search = (props) => {
  let objectIsEmpty = (obj) => {
    if (Object.keys(obj).length == 0) {
      return false;
    } else {
      return true;
    }
  };

  let [searchBar, setSearchBar] = useState("");
  let startSearch = async () => {
    let weatherByCity = await getWeather(searchBar, "&units=metric");
    props.dispatch(setSearchData(weatherByCity));
    console.log(weatherByCity);
  };

  return (
    <div>
      <h2 className="center-align">Search weather by location</h2>
      <div className="row">
        <div className="input-field col s6 offset-s3">
          <input
            id="last_name"
            type="text"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            className="validate col s8"
          ></input>
          <label htmlFor="last_name">Location</label>
          <a onClick={startSearch} className="waves-effect waves-light btn">
            search
          </a>
        </div>
      </div>
      {objectIsEmpty(props.state.search) ? (
        <SearchCard
          state={props.state.search}
          months={props.state.months}
        ></SearchCard>
      ) : (
        <h4 className="center-align">Start your search</h4>
      )}
    </div>
  );
};

export default Search;
