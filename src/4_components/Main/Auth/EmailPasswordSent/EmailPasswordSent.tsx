import React from 'react';
import commonClass from "../../../../3_commons/classes/commonContainer.module.css"
import Button from "../../../../3_commons/common_components/Button/Button";
import {useNavigate} from "react-router-dom";

const EmailPasswordSent = () => {
    const navigate = useNavigate()
    return (
        <div className={commonClass.container}>
            <p>We sent instructions on your email</p>
            <Button onClicked={() => navigate("/sign-in")} text={"login"}/>
        </div>
    );
};

export default EmailPasswordSent;