import React from 'react';
import {logoutTC} from "../../../2_BLL/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import privateClass from "./Logout.module.css"
import {images} from "../../../3_commons/images/commonImages";
import { Fade } from '../../../3_commons/animations';

const Logout = () => {
    const dispatch = useAppDispatch()
    const {isLoggedIn} = useAppSelector(state => state.auth)
    return (
        <>
            {isLoggedIn &&
                <Fade delay={100} effect={"fadeInUp"}>
            <button className={privateClass.logout} onClick={()=>dispatch(logoutTC())}>
                <img src={images.logoutImg} alt=""/>
            </button>
                </Fade>}
        </>
    );
};

export default Logout;