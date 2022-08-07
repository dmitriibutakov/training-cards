import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {useNavigate} from "react-router-dom";

const EmailPasswordSent = () => {
    console.log("EmailPasswordSent")
    const navigate =useNavigate()
    return (
        <div className={commonClass.container}>
            <p>We sent instructions on your email</p>
            <UniversalBtn onClicked={()=>navigate("/sign-in")} text={"login"}/>
        </div>
    );
};

export default EmailPasswordSent;