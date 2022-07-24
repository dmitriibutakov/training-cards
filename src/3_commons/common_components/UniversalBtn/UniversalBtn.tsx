import React from 'react';
import privateClass from "./UniversalBtn.module.css"

type UniversalBtnType = {
    text: string
    type?: "button" | "submit" | "reset"
}
const UniversalBtn:React.FC<UniversalBtnType> = ({text, type}) => {
    return (
        <button type={type} className={privateClass.btn}>{text}</button>
    );
};

export default UniversalBtn;
