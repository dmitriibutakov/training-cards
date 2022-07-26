import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";

const ResetPassword = () => {
    return (
        <div className={commonClass.container}>
            <UniversalTitle title={'Reset Password'}/>
            <UniversalInput placeholder={"password"}/>
            <UniversalInput placeholder={"confirm password"}/>
            <UniversalBtn text={"send"}/>
        </div>
    );
};

export default ResetPassword;