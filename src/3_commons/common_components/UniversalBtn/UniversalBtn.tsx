import React from 'react';
import privateClass from "./UniversalBtn.module.css"

type UniversalBtnType = {
    text: string
    type?: "button" | "submit" | "reset"
    disabled?:boolean
    onClicked?: () => void
}
const UniversalBtn:React.FC<UniversalBtnType> = ({text, type, disabled, onClicked}) => {
    return (
        <button type={type}
                onClick={onClicked}
                disabled={disabled}
                className={disabled ? privateClass.btn__disabled : privateClass.btn}>{text}</button>

    );
};

export default UniversalBtn;
