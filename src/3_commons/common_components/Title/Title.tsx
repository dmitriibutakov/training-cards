import React from 'react';
import privateClass from "./Title.module.css"

type TitlePropsType = {
    title: string
}
const Title: React.FC<TitlePropsType> = ({title}) => {
    return (
        <h2 className={privateClass.title}>{title}</h2>
    );
};

export default Title;