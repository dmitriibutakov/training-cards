import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PATH} from "../../3_commons/Path";
import Login from "../Main/Auth/Login/Login";
import SignUp from "../Main/Auth/SignUp/SignUp";
import {Error404} from "../Main/Error404/Error404";
import PasswordReset from "../Main/Auth/PasswordReset/PasswordReset";
import InputButtonCheckbox from "../Main/InputButtonCheckbox/InputButtonCheckbox";

const Pages = () => {
    return (
        <div>
        <Routes>
            <Route path={PATH.login} element={<Login/>}></Route>
            <Route path={'/*'} element={<Login/>}></Route>
            <Route path={PATH.signUp} element={<SignUp/>}></Route>
            <Route path={PATH.error} element={<Error404/>}></Route>
            <Route path={PATH.passwordReset} element={<PasswordReset/>}></Route>
            <Route path={PATH.testComponents} element={<InputButtonCheckbox/>}></Route>
        </Routes>
        </div>
    );
};

export default Pages;