import React from 'react';
import privateClass from "../../../3_commons/common_classes/commonContainer.module.css"
import UniversalBtn from '../../../3_commons/common_components/UniversalBtn/UniversalBtn';
import UniversalInput from '../../../3_commons/common_components/UniversalInput/UniversalInput';
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import { unknownAvatarImg } from '../../../3_commons/common_images/commonImages';

const Profile = () => {
    return (
        <div className={privateClass.container}>
            <UniversalTitle title={'Personal Information'}/>
            <img src={unknownAvatarImg} />
            <UniversalInput placeholder='Nickname'></UniversalInput>
            <UniversalInput placeholder='Email'></UniversalInput>
            <UniversalBtn text='Cancel'></UniversalBtn>
            <UniversalBtn text='Save'></UniversalBtn>
        </div>
    );
};

export default Profile;