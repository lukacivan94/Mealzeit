import React from 'react'
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';



export default function SliderArrow(props) {
    const { children, side, onClick } = props;
    const style : Object[] = [];
    if (side == 'left') {
        style.push({opacity: 0.8, position: 'absolute', top: '50%', transform: 'translate(-150%, -50%)', left: '3%'})
    } else {
        style.push({opacity: 0.8, position: 'absolute', top: '50%', transform: 'translate(150%, -50%)', right: '3%'})
    }
    

    return (
        <Fab style={style[0]} size="small" onClick={onClick}>
            {children}
        </Fab>
    )
};

export const SliderArrowPrev = <SliderArrow side='left'><ChevronLeftIcon /></SliderArrow>
export const SliderArrowNext = <SliderArrow side='right'><ChevronRightIcon /></SliderArrow>
