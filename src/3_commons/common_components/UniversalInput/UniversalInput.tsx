import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import privateClass from "./UniversalInput.module.css"
import {showImg} from "../../common_images/commonImages";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type UniversalInputType = DefaultInputPropsType & {
  error?: string | false | undefined
    textError?: string
}
const UniversalInput: React.FC<UniversalInputType> = ({error, textError, placeholder, type, ...restProps}) => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <div className={privateClass.input__body}>
            <input type={show ? "text" : type} placeholder={placeholder} className={privateClass.input}
                   {...restProps}   />
            {type === "password"
                ? <img className={privateClass.show} onClick={() => setShow(!show)} src={showImg} alt="show password"/>
                : null}
            {error && <div className={privateClass.error}>{textError}</div>}
        </div>
    );
};

export default UniversalInput;