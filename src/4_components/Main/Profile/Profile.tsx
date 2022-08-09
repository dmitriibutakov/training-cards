import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {logoutTC} from '../../../2_BLL/auth-reducer';
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import privateClass from "../../../3_commons/common_classes/commonContainer.module.css";
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalBtn from "../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {incognitoImg} from "../../../3_commons/common_images/commonImages";
import UniversalAvatar from "../../../3_commons/common_components/UniversalAvatar/UniversalAvatar";
import Preloader from "../../../3_commons/Preloader/Preloader";

const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.app.profile)
    const avatar = useAppSelector(state => state.app.profile.avatar || incognitoImg);
    const isFetching = useAppSelector(state => state.auth.isFetching)

    if (isFetching) return <Preloader/>
    if (!isLoggedIn) return <Navigate to={"/sign-in"}/>
    return (
        <div className={privateClass.container}>
            <UniversalTitle title={'Personal Information'}/>
            <UniversalAvatar avatarImg={avatar}/>
            <h1>{profile.name}</h1>
            <UniversalBtn onClicked={()=>navigate("/edit")} text={"Edit profile"}/>
            <UniversalBtn onClicked={()=>dispatch(logoutTC())} text={"Logout"}/>
        </div>
    );
};

export default Profile;