import React from 'react';
import privateClass from "./UniversalBtn.module.css"

type UniversalBtnType = {
    text: string
}
const UniversalBtn = (props: UniversalBtnType) => {
    return (
        <button className={privateClass.btn}>{props.text}</button>
    );
};

export default UniversalBtn;
