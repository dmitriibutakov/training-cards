import React from 'react';
import UniversalCheckbox from "../../../3_commons/common_components/UniversalCheckbox/UniversalCheckbox";
import commonClass from "../../../3_commons/common_classes/commonContainer.module.css"
import UniversalBtn from "../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import UniversalInput from "../../../3_commons/common_components/UniversalInput/UniversalInput";
import privateClass from "./InputButtonCheckbox.module.css"

const InputButtonCheckbox = () => {
    return (
        <div className={commonClass.container}>
            <div className={privateClass.block}>
            <UniversalCheckbox>super checkbox</UniversalCheckbox>
            <UniversalBtn text={"heeey"}/>
            <UniversalInput placeholder={"heeey"}/>
            </div>
        </div>
    );
};

export default InputButtonCheckbox;