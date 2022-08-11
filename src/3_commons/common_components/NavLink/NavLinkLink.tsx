import React from 'react';
import {NavLink} from "react-router-dom";
import privateClass from "./NavLinkLink.module.css"

type NavLinkLinkPropsType = {
    path: string
    title: string
}
const NavLinkLink: React.FC<NavLinkLinkPropsType> = ({path, title}) => {
    return (
        <NavLink className={privateClass.navlink} to={path}>{title}</NavLink>
    );
};
export default NavLinkLink