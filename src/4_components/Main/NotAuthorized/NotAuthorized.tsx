import React from 'react';
import commonClass from "../../../3_commons/common_classes/commonContainer.module.css";
import Button from "../../../3_commons/common_components/Button/Button";
import {useNavigate} from "react-router-dom";
import Title from "../../../3_commons/common_components/Title/Title";

const NotAuthorized = () => {
    const navigate = useNavigate()
    return (
        <div className={commonClass.container}>
            <Title title={`you are not authorized :(`}/>
            <p>To continue, you need to log-in or register</p>
            <Button text={"login"} onClicked={() => navigate("/sign-in")}/>
            <Button text={"register"} onClicked={() => navigate("/sign-up")}/>
        </div>
    );
};

export default NotAuthorized;