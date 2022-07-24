import React, {useState} from 'react';
import privateClass from "./UniversalInput.module.css"
import {showImg} from "../../common_images/commonImages";

type UniversalInputType = {
    placeholder: string
    type?: string
    name?: string
    onChange?: (e: React.ChangeEvent<any>) => void;
    value?: string
}
const   UniversalInput: React.FC<UniversalInputType> = ({placeholder, type, name, onChange, value}) => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <div className={privateClass.input__body}>
            <input type={show ? "text" : type}
                   name={name}
                   placeholder={placeholder}
                   onChange={onChange}
                   className={privateClass.input}
                   value={value}/>
            {type === "password"
                ? <img className={privateClass.show} onClick={() => setShow(!show)} src={showImg} alt="show password"/>
                : null}
        </div>
    );
};

export default UniversalInput;