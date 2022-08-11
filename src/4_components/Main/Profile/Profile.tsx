import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";
import {logoutTC} from '../../../2_BLL/auth-reducer';
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import privateClass from "../../../3_commons/common_classes/commonContainer.module.css";
import Title from "../../../3_commons/common_components/Title/Title";
import Button from "../../../3_commons/common_components/Button/Button";
import {incognitoImg} from "../../../3_commons/common_images/commonImages";
import Avatar from "../../../3_commons/common_components/Avatar/Avatar";
import Preloader from "../../../3_commons/Preloader/Preloader";

const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profile = useAppSelector(state => state.app.profile)
    const avatar = useAppSelector(state => state.app.profile.avatar || incognitoImg);
    const isFetching = useAppSelector(state => state.app.isFetching)

    if (isFetching) return <Preloader/>
    if (!isLoggedIn) return <Navigate to={"/sign-in"}/>
    return (
        <div className={privateClass.container}>
            <Title title={'Personal Information'}/>
            <Avatar avatarImg={avatar}/>
            <h1>{profile.name}</h1>
            <Button onClicked={() => navigate("/edit")} text={"Edit profile"}/>
            <Button onClicked={() => dispatch(logoutTC())} text={"Logout"}/>
        </div>
    );
};

export default Profile;