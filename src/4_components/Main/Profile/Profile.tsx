import React from 'react';
import privateClass from "../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../2_BLL/store";

const Profile = () => {
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    if (!isLoggedIn) return <Navigate to={"/sign-in"}/>
    return (
        <div className={privateClass.container}>
            <UniversalTitle title={'Profile'}/>
        </div>
    );
};

export default Profile;