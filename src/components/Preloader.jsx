import React from "react";

let Preloader = () => {
  return (
    <div className="weatherCart">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>waiting for request</p>
    </div>
  );
};

export default Preloader;
