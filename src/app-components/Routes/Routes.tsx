import React from 'react';
import SuperButton from "../../commons/common_components/SuperButton/SuperButton";
import SuperCheckbox from "../../commons/common_components/SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../commons/common_components/SuperInputText/SuperInputText";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Error404 from "../Error404/Error404";
import PasswordReset from "../PasswordReset/PasswordReset";
import {Route, Routes} from "react-router-dom";
import {PATH} from "../../commons/Path";

const Pages = () => {
    return (
        <div>
        <Routes>
            <Route path={PATH.login} element={<Login/>}></Route>
            <Route path={'/*'} element={<Login/>}></Route>
            <Route path={PATH.signUp} element={<SignUp/>}></Route>
            <Route path={PATH.error} element={<Error404/>}></Route>
            <Route path={PATH.passwordReset} element={<PasswordReset/>}></Route>
            <Route path={PATH.commonComponents} element={<>
                <SuperButton/>
                <SuperCheckbox/>
                <SuperInputText/>
            </>}></Route>
        </Routes>
        </div>
    );
};

export default Pages;