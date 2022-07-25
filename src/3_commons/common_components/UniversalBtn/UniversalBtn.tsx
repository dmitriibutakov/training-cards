import React from 'react';
import privateClass from "./UniversalBtn.module.css"

type UniversalBtnType = {
    text: string
    type?: any
    disabled?:boolean
}
const UniversalBtn = (props: UniversalBtnType) => {
    return (
        <button className={privateClass.btn} type={props.type} disabled={props.disabled}>{props.text}</button>
    );
};

export default UniversalBtn;
