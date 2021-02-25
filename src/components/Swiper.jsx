import React from 'react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'materialize-css/dist/css/materialize.min.css'
import WeatherCard from './WeatherCard';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

let SwiperComponent = (props) => {

    let tommorow = props.state.weekly[1];
    let afterTomorow = props.state.weekly[2];
    // console.log(tommorow)
    // tommorow.name = props.state.name
    // afterTomorow.name = props.state.name
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
            <SwiperSlide>
                <WeatherCard state={props.state} months={props.state.months}></WeatherCard>
            </SwiperSlide>
            <SwiperSlide>
                <WeatherCard state={tommorow} name={props.state.name} months={props.state.months}></WeatherCard>
            </SwiperSlide>
            <SwiperSlide>
                <WeatherCard state={afterTomorow} name={props.state.name} months={props.state.months}></WeatherCard>
            </SwiperSlide>
            {/* <SwiperSlide>Slide 4</SwiperSlide> */}

        </Swiper>
    );
};


export default SwiperComponent