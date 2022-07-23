import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import UniversalNavLink from "../../../../3_commons/common_components/UniversalNavLink/UniversalNavLink";
import {PATH} from "../../../../3_commons/Path";


const SignUp = () => {
    return (
        <div className={commonClass.container}>
            <UniversalTitle title={'Sign Up'}/>
            <UniversalInput placeholder={"email"}/>
            <UniversalInput placeholder={"password"} type={"password"}/>
            <UniversalInput placeholder={"confirm password"} type={"password"}/>
            <UniversalBtn text={"Sign Up"}/>
            <p>Already have an account?</p>
            <UniversalNavLink path={PATH.signIn} title={"Sign In"}/>
        </div>
    );
};

export default SignUp;