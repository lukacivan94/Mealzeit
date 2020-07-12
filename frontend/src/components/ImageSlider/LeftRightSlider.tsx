import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {SliderArrowPrev, SliderArrowNext} from './Arrow';


const useStyles = makeStyles((theme) => ({
    container: {
      boxSizing: 'border-box',
      backgroundColor: '#ededed',
      boxShadow: '5px 5px 5px rgba(68, 68, 68, 0.6)',
    },
    inner: {
      padding: '2px',
    },
    box: {
      width: '85px',
      height: '85px',
      margin: '10px',
      border: '1px solid grey',
    },
  }));




export default function LeftRightSlider(props) {
    const { children } = props;
    const classes = useStyles();

    var settings = {
      dots: false,
      draggable: false,
      infinite: false,
      nextArrow: SliderArrowNext,
      pauseOnHover: true,
      prevArrow: SliderArrowPrev,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      variableWidth: true,
    };

    return (
      <div className={classes.container}>
          <Slider {...settings} className={classes.inner}>
              { children }
          </Slider>
      </div>
    )
};
