import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PATH} from "../../3_commons/Path";
import {Error404} from "../Main/Error404/Error404";
import InputButtonCheckbox from "../Main/InputButtonCheckbox/InputButtonCheckbox";
import SignUp from "../Main/Auth/SignUp/SignUp";
import Profile from "../Main/Profile/Profile";
import SignIn from "../Main/Auth/SignIn/SignIn";
import ResetPassword from "../Main/Auth/ResetPassword/ResetPassword";

const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={PATH.profile} element={<Profile/>}></Route>
                <Route path={PATH.signIn} element={<SignIn/>}></Route>
                <Route path={'/*'} element={<SignIn/>}></Route>
                <Route path={PATH.signUp} element={<SignUp/>}></Route>
                <Route path={PATH.resetPassword} element={<ResetPassword/>}></Route>
                <Route path={PATH.error} element={<Error404/>}></Route>
                <Route path={PATH.testComponents} element={<InputButtonCheckbox/>}></Route>
            </Routes>
        </div>
    );
};

export default Pages;