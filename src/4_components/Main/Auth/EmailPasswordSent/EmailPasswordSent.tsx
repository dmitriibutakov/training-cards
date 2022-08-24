import React from 'react';
import commonClass from "../../../../3_commons/classes/commonContainer.module.css"
import Button from "../../../../3_commons/common_components/Button/Button";
import {useNavigate} from "react-router-dom";
import {Fade} from '../../../../3_commons/animations';

const EmailPasswordSent = () => {
    const navigate = useNavigate()
    return (
        <Fade delay={100} effect={"fadeInUp"}>
            <div className={commonClass.container}>
                <p>We sent instructions on your email</p>
                <Button onClicked={() => navigate("/sign-in")} text={"login"}/>
            </div>
        </Fade>
    );
};

export default EmailPasswordSent;