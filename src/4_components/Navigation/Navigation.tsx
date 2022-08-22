import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {PACKS, PATH} from "../../3_commons/Path";
import privateClass from "./Navigation.module.css"
import {useAppDispatch} from "../../2_BLL/store";
import {setAppError} from "../../2_BLL/app-reducer";

const Navigation = () => {
    const dispatch = useAppDispatch()
    const deleteError = () => {
        dispatch(setAppError(null))
    }
    const [active, setActive] = useState<boolean>(false)
    const changeClass = () => setActive(!active)
    const setClassBurger = active ? privateClass.burger__active : privateClass.burger
    const setClassHeader = active ? privateClass.navigation : privateClass.navigation__hidden
    return (
        <>
            <div onClick={deleteError}>
                <div onClick={changeClass} className={setClassHeader}>
                    <div className={setClassBurger}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className={privateClass.navigate}>
                        <NavLink to={PATH.profile} className={privateClass.link}>Profile</NavLink>
                        <NavLink to={PATH.signIn} className={privateClass.link}>Sign In</NavLink>
                        <NavLink to={PATH.signUp} className={privateClass.link}>Sign Up</NavLink>
                        <NavLink to={PACKS.packs} className={privateClass.link}>Packs</NavLink>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Navigation;
