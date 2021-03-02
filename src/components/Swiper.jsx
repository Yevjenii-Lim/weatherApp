import React from "react";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "materialize-css/dist/css/materialize.min.css";
import WeatherCard from "./WeatherCard";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

let SwiperComponent = (props) => {
  let threeDaysForecast = [...props.state.weekly]
  let daysOrder = ['Today`s', "Tomorrow", "After tomorrow"]
  threeDaysForecast.length = 3;

  let sliders = threeDaysForecast.map( (i, index) => {
    return <SwiperSlide key={index} ><WeatherCard day={daysOrder[index]} state={i} months={props.state.months} name={props.state.name}></WeatherCard></SwiperSlide>
  })


  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="teal accent-3 container"
    >
      {sliders}
    </Swiper>
  );
};

export default SwiperComponent;
