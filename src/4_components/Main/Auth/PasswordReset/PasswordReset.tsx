import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";

const PasswordReset = () => {
    return (
        <div className={commonClass.container}>
            <UniversalTitle title={'Password Reset'}/>
        </div>
    );
};

export default PasswordReset;