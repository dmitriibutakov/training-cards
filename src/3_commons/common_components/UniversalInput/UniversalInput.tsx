import React from 'react';
import privateClass from "./UniversalInput.module.css"

type UniversalInputType = {
    placeholder: string
}
const UniversalInput:React.FC<UniversalInputType> = ({placeholder}) => {
    return (
        <input type="text" placeholder={placeholder} className={privateClass.input}/>
    );
};

export default UniversalInput;