import React from 'react';
import {ChangeEvent, useState} from "react";
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {editProfileTC} from "../../../2_BLL/app-reducer";
import {AppStateType, useAppDispatch} from "../../../2_BLL/store";
import privateClass from "../../../3_commons/classes/commonContainer.module.css";
import Title from "../../../3_commons/common_components/Title/Title";
import Input from "../../../3_commons/common_components/Input/Input";
import Button from "../../../3_commons/common_components/Button/Button";
import Avatar from "../../../3_commons/common_components/Avatar/Avatar";
import {ResponseDataProfileType} from "../../../1_DAL/auth-api";
import {images} from "../../../3_commons/images/commonImages";
import {Fade} from '../../../3_commons/animations';

const EditProfile = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const profile = useSelector<AppStateType, ResponseDataProfileType>(state => state.app.profile)
    const avatar = useSelector<AppStateType, string>(state => state.app.profile.avatar || images.incognitoImg);

    const [name, setName] = useState(profile.name)
    const [email, setEmail] = useState(profile.email)

    const cancelEditProfileHandler = () => (navigate("/profile"))

    const saveChangesProfileHandler = () => {
        dispatch(editProfileTC(name))
        navigate("/profile")
    }

    if (!isLoggedIn) return <Navigate to={"/sign-in"}/>

    return (
        <Fade delay={100} effect={"fadeInUp"}>
            <div className={privateClass.container}>
                <Title title={"Personal Information"}/>
                <Avatar avatarImg={avatar}/>
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                       value={name}/>
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                       value={email}/>
                <Button text={"cancel"} onClicked={cancelEditProfileHandler}/>
                <Button text={"save"} onClicked={saveChangesProfileHandler}/>
            </div>
        </Fade>
    );
};

export default EditProfile;