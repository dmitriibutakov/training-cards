import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import privateClass from "./Input.module.css"
import {addImg, searchImg, showImg} from "../../common_images/commonImages";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    error?: string | false | null
    textError?: string | null
    onButtonClickHandler?: (title: string, error?: string) => void
    searchParams?: string
}
const Input: React.FC<InputPropsType> = ({
                                             error,
                                             textError,
                                             placeholder,
                                             type,
                                             searchParams,
                                             onButtonClickHandler,
                                             ...restProps
                                         }) => {
    const [show, setShow] = useState<boolean>(false)
    const [text, setText] = useState("")
    const isOnClickHandler = () => onButtonClickHandler && onButtonClickHandler(text)
    return (
        <div className={privateClass.input__body}>
            <input type={show ? "text" : type}
                   value={text}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)}
                   onKeyPress={(e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) =>
                       (e.key === "Enter" && isOnClickHandler())}
                   placeholder={placeholder}
                   className={(type === "password" && privateClass.input__password)
                       || (onButtonClickHandler && privateClass.input__add)
                       || (privateClass.input)}
                   {...restProps}/>

            {type === "password" && <img className={privateClass.show}
                                         onClick={() => setShow(!show)}
                                         src={showImg}
                                         alt="show-icon"/>}
            {onButtonClickHandler && <img className={privateClass.add}
                                          onClick={() => isOnClickHandler()}
                                          src={addImg}
                                          alt="add-icon"/>}
            {searchParams && <img className={privateClass.add}
                                  src={searchImg}
                                  alt="search-icon"/>}
            {error && <div className={privateClass.error}>{textError}</div>}
        </div>
    );
};

export default Input;