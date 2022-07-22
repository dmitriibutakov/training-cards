import React from 'react';
import privateClass from "../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";

const Profile = () => {
    return (
        <div className={privateClass.container}>
            <UniversalTitle title={'Profile'}/>
        </div>
    );
};

export default Profile;