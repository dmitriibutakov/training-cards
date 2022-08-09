import React from 'react';
import privateClass from "./UniversalTitle.module.css"

type UniversalTitlePropsType = {
    title: string
}
const UniversalTitle:React.FC<UniversalTitlePropsType> = ({title}) => {
    return (
        <h2 className={privateClass.title}>{title}</h2>
    );
};

export default UniversalTitle;