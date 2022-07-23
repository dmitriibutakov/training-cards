import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";

const SignUp = () => {
    return (
        <div className={commonClass.container}>
            <UniversalTitle title={'Sign Up'}/>
            <UniversalInput placeholder={"email"}/>
            <UniversalInput placeholder={"password"} type={"password"}/>
            <UniversalInput placeholder={"confirm password"} type={"password"}/>
        </div>
    );
};

export default SignUp;