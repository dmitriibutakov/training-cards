import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ResponseDataType } from "../../../1_DAL/Api";
import { editProfileTC } from "../../../2_BLL/app-reducer";
import { AppStateType, useAppDispatch } from "../../../2_BLL/store";
import privateClass from "../../../3_commons/common_classes/commonContainer.module.css";
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import { unknownAvatarImg } from '../../../3_commons/common_images/commonImages';
import s from './EditProfile.module.css'

const EditProfile = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const profile = useSelector<AppStateType, ResponseDataType>(state => state.app.profile)
    const avatar = useSelector<AppStateType, string>(state => state.app.profile.avatar || unknownAvatarImg);

    const [name, setName] = useState(profile.name)
    const [email, setEmail] = useState(profile.email)

    const cancelEditProfileHandler = () => {
        navigate("/profile")
    }

    const onChangeSetNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onChangeSetEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const saveChangesProfileHandler = () => {
        dispatch(editProfileTC(name))
        navigate("/profile")
    }

    if (!isLoggedIn) return <Navigate to={"/sign-in"} />

    return (
        <div className={privateClass.container}>
            <div className={s.profileEdit}>
                <UniversalTitle title={'Personal Information'} />
                <img src={avatar} alt="avatar" />
                <div>
                    <span>Nickname</span>
                    <input onChange={onChangeSetNameHandler} value={name}></input>
                </div>
                <div>
                    <span>Email</span>
                    <input onChange={onChangeSetEmailHandler} value={email}></input>
                </div>

                <button onClick={cancelEditProfileHandler}>Cancel</button>
                <button onClick={saveChangesProfileHandler}>Save</button>
            </div>
        </div>
    );
};

export default EditProfile;