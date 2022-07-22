import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PATH} from "../../3_commons/Path";
import {Error404} from "../Main/Error404/Error404";
import InputButtonCheckbox from "../Main/InputButtonCheckbox/InputButtonCheckbox";
import SignUpContainer from "../Main/Auth/SignUp/SignUpContainer";
import ProfileContainer from "../Main/Profile/ProfileContainer";
import SignInContainer from "../Main/Auth/SignIn/SignInContainer";
import PasswordResetContainer from "../Main/Auth/PasswordReset/PasswordResetContainer";

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={PATH.profile} element={<ProfileContainer/>}></Route>
                <Route path={PATH.signIn} element={<SignInContainer/>}></Route>
                <Route path={'/*'} element={<SignInContainer/>}></Route>
                <Route path={PATH.signUp} element={<SignUpContainer/>}></Route>
                <Route path={PATH.passwordReset} element={<PasswordResetContainer/>}></Route>
                <Route path={PATH.error} element={<Error404/>}></Route>
                <Route path={PATH.testComponents} element={<InputButtonCheckbox/>}></Route>
            </Routes>
        </div>
    );
};

export default Pages;