import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ResponseDataType } from "../../../1_DAL/Api";
import { logoutTC } from '../../../2_BLL/auth-reducer';
import { AppStateType, useAppDispatch } from "../../../2_BLL/store";
import privateClass from "../../../3_commons/common_classes/commonContainer.module.css";
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import { unknownAvatarImg } from '../../../3_commons/common_images/commonImages';
import s from './Profile.module.css'

const Profile = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const profile = useSelector<AppStateType, ResponseDataType>(state => state.app.profile)
    const avatar = useSelector<AppStateType, string>(state => state.app.profile.avatar || unknownAvatarImg);

    const editProfileHandler = () => {
        navigate("/edit")
    }

    const logoutUtil = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) return <Navigate to={"/sign-in"} />

    return (
        <div className={privateClass.container}>
            <div className={s.profileInfo}>
                <UniversalTitle title={'Personal Information'} />
                <img src={avatar} alt="avatar" />
                <div className={s.profileName}>{profile.name}</div>
                <div className={s.profileWork}>Front-end developer</div>
                <button onClick={editProfileHandler} >Edit profile</button>
                <button onClick={logoutUtil}>LogOUT</button>
            </div>
        </div>
    );
};

export default Profile;