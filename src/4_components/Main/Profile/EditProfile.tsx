import React from 'react';
import {ChangeEvent, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {editProfileTC} from "../../../2_BLL/app-reducer";
import {AppStateType, useAppDispatch} from "../../../2_BLL/store";
import privateClass from "../../../3_commons/common_classes/commonContainer.module.css";
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalInput from "../../../3_commons/common_components/UniversalInput/UniversalInput";
import UniversalBtn from "../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {incognitoImg} from "../../../3_commons/common_images/commonImages";
import UniversalAvatar from "../../../3_commons/common_components/UniversalAvatar/UniversalAvatar";
import {ResponseDataProfileType} from "../../../1_DAL/auth-api";

const EditProfile = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const profile = useSelector<AppStateType, ResponseDataProfileType>(state => state.app.profile)
    const avatar = useSelector<AppStateType, string>(state => state.app.profile.avatar || incognitoImg);

    const [name, setName] = useState(profile.name)
    const [email, setEmail] = useState(profile.email)

    const cancelEditProfileHandler = () => (navigate("/profile"))

    const saveChangesProfileHandler = () => {
        dispatch(editProfileTC(name))
        navigate("/profile")
    }

    if (!isLoggedIn) return <Navigate to={"/sign-in"}/>

    return (
        <div className={privateClass.container}>
            <UniversalTitle title={"Personal Information"}/>
            <UniversalAvatar avatarImg={avatar}/>
            <UniversalInput onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                            value={name}/>
            <UniversalInput onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                            value={email}/>
            <UniversalBtn text={"cancel"} onClicked={cancelEditProfileHandler}/>
            <UniversalBtn text={"save"} onClicked={saveChangesProfileHandler}/>
        </div>
    );
};

export default EditProfile;