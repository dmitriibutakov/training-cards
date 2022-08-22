import React from 'react';
import {NavLink} from "react-router-dom";
import privateClass from "./Link.module.css"

type NavLinkLinkPropsType = {
    path: string
    title: string
}
const Link: React.FC<NavLinkLinkPropsType> = ({path, title}) => {
    return (
        <NavLink className={privateClass.navlink} to={path}>{title}</NavLink>
    );
};
export default Link