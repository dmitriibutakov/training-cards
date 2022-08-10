import React from 'react';
import commonClass from "../../../3_commons/common_classes/commonContainer.module.css";
import UniversalBtn from "../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {useNavigate} from "react-router-dom";
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";

const NotAuthorized = () => {
    const navigate = useNavigate()
    return (
        <div className={commonClass.container}>
            <UniversalTitle title={`you are not authorized :(`}/>
            <p>To continue, you need to log-in or register</p>
            <UniversalBtn text={"login"} onClicked={() => navigate("/sign-in")}/>
            <UniversalBtn text={"register"} onClicked={() => navigate("/sign-up")}/>
        </div>
    );
};

export default NotAuthorized;