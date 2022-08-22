import React from 'react';
import { Fade } from '../../animations';
import privateClass from "./Arrow.module.css"

const Arrow = () => {
    return (
        <Fade delay={1000} effect={"fadeInUp"}>
        <div className={privateClass.things}>
            <div className={privateClass.arrow__body}>
            <div className={privateClass.content}>
                <div className={privateClass.arrow}>
                    <div className={privateClass.curve}></div>
                    <div className={privateClass.point}></div>
                </div>
            </div>
            </div>
            <div className={privateClass.content}>
                <h1>You don't have collections yet, let's create</h1>
            </div>
        </div>
        </Fade>
    );
};

export default Arrow;