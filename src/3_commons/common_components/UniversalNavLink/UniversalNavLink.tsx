import React from 'react';
import {NavLink} from "react-router-dom";
import privateClass from "./UniversalNavLink.module.css"

type UniversalNavLinkPropsType = {
    path: string
    title: string
}
const UniversalNavLink: React.FC<UniversalNavLinkPropsType> = ({path, title}) => {
    return (
        <NavLink className={privateClass.navlink} to={path}>{title}</NavLink>
    );
};

export default UniversalNavLink;