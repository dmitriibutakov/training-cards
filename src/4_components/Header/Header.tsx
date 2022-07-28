import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../3_commons/Path";
import privateClass from "./Header.module.css"
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../2_BLL/store";
import {setIsLogin} from "../../2_BLL/auth-reducer";

const Header = () => {

    const [active, setActive] = useState<boolean>(false)
    const changeClass = () => setActive(!active)
    const setClassBurger = active ? privateClass.burger__active : privateClass.burger
    const setClassHeader = active ? privateClass.navigation : privateClass.navigation__hidden
    return (
        <div className={setClassHeader}>
            <div onClick={changeClass} className={setClassBurger}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className={privateClass.navigate}>
                <NavLink to={PATH.profile} className={privateClass.link}>Profile</NavLink>
                <NavLink to={PATH.signIn} className={privateClass.link}>Sign In</NavLink>
                <NavLink to={PATH.signUp} className={privateClass.link}>Sign Up</NavLink>
                <NavLink to={PATH.resetPassword} className={privateClass.link}>Reset Password</NavLink>
                <NavLink to={PATH.testComponents} className={privateClass.link}>Test Components</NavLink>
                <NavLink to={PATH.error} className={privateClass.link}>404</NavLink>
            </nav>
        </div>
    );
};

export default Header;
