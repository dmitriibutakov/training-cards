import React from 'react';
import {NavLink} from "react-router-dom";
import privateClass from "./UniversalNavLink.module.css"
type UniversalNavLinkType = {
    path: string
    title: string
}
const UniversalNavLink:React.FC<UniversalNavLinkType> = ({path, title}) => {
    return (
        <NavLink className={privateClass.navlink} to={path}>{title}</NavLink>
    );
};

export default UniversalNavLink;