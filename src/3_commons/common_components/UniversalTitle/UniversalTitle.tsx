import React from 'react';
import privateClass from "./UniversalTitle.module.css"

type UniversalTitleType = {
    title: string
}
const UniversalTitle:React.FC<UniversalTitleType> = ({title}) => {
    return (
        <h2 className={privateClass.title}>{title}</h2>
    );
};

export default UniversalTitle;