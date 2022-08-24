import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import privateClass from "./Input.module.css"
import {images} from "../../images/commonImages";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    error?: string | false | null
    textError?: string | null
    onButtonClickCallback?: (title: string) => void
    searchParams?: true
    setSearchParams?: (param: string) => void
    value: string
}
const Input: React.FC<InputPropsType> = ({
                                             error,
                                             textError, placeholder,
                                             type, searchParams,
                                             onButtonClickCallback, value,
                                             setSearchParams,
                                             ...restProps
                                         }) => {
    const [show, setShow] = useState<boolean>(false)
    const isOnClickHandler = () => onButtonClickCallback && onButtonClickCallback(value)
    return (
        <div className={privateClass.input__body}>
            <input type={show ? "text" : type}
                   value={value}
                   onKeyPress={(e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) =>
                       (e.key === "Enter" && isOnClickHandler())}
                   placeholder={placeholder}
                   className={(type === "password" && privateClass.input__password)
                       || (privateClass.input)}
                   {...restProps}/>

            {type === "password" && <img className={privateClass.show}
                                         onClick={() => setShow(!show)}
                                         src={images.showImg}
                                         alt="show-icon"/>}
            {searchParams && <img className={privateClass.add}
                                  src={images.searchImg}
                                  alt="search-icon"/>}
            {error && <div className={privateClass.error}>{textError}</div>}
        </div>
    );
};

export default Input;