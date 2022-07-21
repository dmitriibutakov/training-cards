import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {PATH} from "../../3_commons/Path";
import privateClass from "./Header.module.css"

const Header = () => {
    const [active, setActive] = useState<boolean>(false)
    const changeClass = () => setActive(!active)
    const setClassBurger =  active ? privateClass.burger__active : privateClass.burger
    const setClassHeader = active ? privateClass.navigation : privateClass.navigation__hidden
    return (
        <div className={setClassHeader}>
            <div onClick={changeClass} className={setClassBurger}>
                <span></span>
                <span></span>
                <span></span>
            </div>
                <nav className={privateClass.navigate}>
                    <NavLink to={PATH.login} className={privateClass.link}>Login</NavLink>
                    <NavLink to={PATH.signUp} className={privateClass.link}>Sign Up</NavLink>
                    <NavLink to={PATH.passwordReset} className={privateClass.link}>Password Reset</NavLink>
                    <NavLink to={PATH.testComponents} className={privateClass.link}>Test Components</NavLink>
                    <NavLink to={PATH.error} className={privateClass.link}>404</NavLink>
                </nav>
        </div>
    );
};

export default Header;
