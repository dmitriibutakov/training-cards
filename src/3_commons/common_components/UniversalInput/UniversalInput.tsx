import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import privateClass from "./UniversalInput.module.css"
import {addImg, showImg} from "../../common_images/commonImages";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type UniversalInputPropsType = DefaultInputPropsType & {
    error?: string | false | null
    textError?: string | null
    onButtonClickHandler?: (title: string, error?: string) => void
}
const UniversalInput: React.FC<UniversalInputPropsType> = ({
                                                               error,
                                                               textError,
                                                               placeholder,
                                                               type,
                                                               onButtonClickHandler,
                                                               ...restProps
                                                           }) => {
    const [show, setShow] = useState<boolean>(false)
    const [text, setText] = useState("")
    return (
        <div className={privateClass.input__body}>
            <input type={show ? "text" : type}
                   value={text}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)}
                   placeholder={placeholder}
                   className={(type === "password" && privateClass.input__password)
                       || (onButtonClickHandler && privateClass.input__add)
                       || (privateClass.input)}
                   {...restProps}/>

            {type === "password" && <img className={privateClass.show}
                                         onClick={() => setShow(!show)}
                                         src={showImg}
                                         alt="show password"/>}
            {onButtonClickHandler && <img className={privateClass.add}
                                          onClick={() => onButtonClickHandler && onButtonClickHandler(text)}
                                          src={addImg}
                                          alt="show password"/>}

            {error && <div className={privateClass.error}>{textError}</div>}
        </div>
    );
};

export default UniversalInput;