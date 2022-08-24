import React from 'react';
import {Fade} from '../../animations';
import "./Preloader.css"

const Preloader = () => {
    return (
        <Fade effect={"fadeInUp"}>
            <div id={"preloader-wrapper"}>
                <div id={"preloader"}></div>
            </div>
        </Fade>
    );
};

export default Preloader;