import React from 'react';
import privateClass from "./UniversalBtn.module.css"

type UniversalBtnType = {
    text: string
    type?: "button" | "submit" | "reset"
    disabled?:boolean
}
const UniversalBtn:React.FC<UniversalBtnType> = ({text, type, disabled}) => {
    return (
        <button type={type}
                disabled={disabled}
                className={disabled ? privateClass.btn__disabled : privateClass.btn}>{text}</button>

    );
};

export default UniversalBtn;
