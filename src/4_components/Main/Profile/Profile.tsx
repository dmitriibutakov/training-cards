import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {logoutTC} from '../../../2_BLL/auth-reducer';
import {AppStateType, useAppDispatch} from "../../../2_BLL/store";
import privateClass from "../../../3_commons/common_classes/commonContainer.module.css";
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalBtn from "../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {incognitoImg} from "../../../3_commons/common_images/commonImages";
import UniversalAvatar from "../../../3_commons/common_components/UniversalAvatar/UniversalAvatar";
import {ResponseDataProfileType} from "../../../1_DAL/Api";

const Profile = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const profile = useSelector<AppStateType, ResponseDataProfileType>(state => state.app.profile)
    const avatar = useSelector<AppStateType, string>(state => state.app.profile.avatar || incognitoImg);

    const editProfileHandler = () => {
        navigate("/edit")
    }

    const logoutHandler = () => (dispatch(logoutTC()))

    if (!isLoggedIn) return <Navigate to={"/sign-in"}/>

    return (
        <div className={privateClass.container}>
            <UniversalTitle title={'Personal Information'}/>
            <UniversalAvatar avatarImg={avatar}/>
            <h1>{profile.name}</h1>
            <UniversalBtn onClicked={editProfileHandler} text={"Edit profile"}/>
            <UniversalBtn onClicked={logoutHandler} text={"Logout"}/>
        </div>
    );
};

export default Profile;