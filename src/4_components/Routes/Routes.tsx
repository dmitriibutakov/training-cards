import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PATH} from "../../3_commons/Path";
import {Error404} from "../Main/Error404/Error404";
import InputButtonCheckbox from "../Main/InputButtonCheckbox/InputButtonCheckbox";
import SignUp from "../Main/Auth/SignUp/SignUp";
import Profile from "../Main/Profile/Profile";
import SignIn from "../Main/Auth/SignIn/SignIn";
import ForgotPassword from "../Main/Auth/ForgotPassword/ForgotPassword";
import EditProfile from '../Main/Profile/EditProfile';
import EmailPasswordSent from "../Main/Auth/EmailPasswordSent/EmailPasswordSent";
import {SetNewPassword} from "../Main/Auth/SetNewPassword/SetNewPassword";

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path="/*" element={<SignIn/>}/>
                <Route path={PATH.profile} element={<Profile/>}></Route>
                <Route path={PATH.emailPasswordSent} element={<EmailPasswordSent/>}></Route>
                <Route path={PATH.editProfile} element={<EditProfile/>}></Route>
                <Route path={PATH.signIn} element={<SignIn/>}></Route>
                <Route path={PATH.signUp} element={<SignUp/>}></Route>
                <Route path={PATH.forgotPassword} element={<ForgotPassword/>}></Route>
                <Route path={PATH.error} element={<Error404/>}></Route>
                <Route path={PATH.testComponents} element={<InputButtonCheckbox/>}></Route>
                <Route path={PATH.setNewPassword} element={<SetNewPassword/>}/>
            </Routes>
        </div>
    );
};

export default Pages;