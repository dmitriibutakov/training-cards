import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import style from "./Signln.module.css"
import React from 'react';
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {PATH} from "../../../../3_commons/Path";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import UniversalNavLink from "../../../../3_commons/common_components/UniversalNavLink/UniversalNavLink";
import {useDispatch, useSelector} from "react-redux";
import UniversalCheckbox from "../../../../3_commons/common_components/UniversalCheckbox/UniversalCheckbox";
import {useFormik} from "formik";
import {loginTC} from "./singIn-reducer";
import {AppStateType, useAppDispatch} from "../../../../2_BLL/store";


const SignIn = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppStateType,boolean>(state => state.auth.isLoggedIn)
    const disabled = useSelector<AppStateType,boolean>(state => state.auth.buttonDisable)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Пароль обязателен'
            } else if (values.password.length < 3) {
                errors.password = 'Пароль должен быть больше трех символов'
            }
            return errors;
        },
        onSubmit: values => {
           //  dispatch(signUp(values.email, values.password, values.repeatPassword))
           // alert(JSON.stringify(values));
            dispatch(loginTC(values))
            formik.resetForm()

        },
    })


    if (isLoggedIn) {
         return <Navigate to={"/profile"}/>
    }

    return (
        <div className={commonClass.container}>
            <UniversalTitle title={'Sign in'}/>
            <form onSubmit={formik.handleSubmit}>
                <UniversalInput placeholder={"email"} name={"email"} onChange={formik.handleChange}
                                value={formik.values.email} onBlur={formik.handleBlur}/>
                {formik.touched.email && formik.errors.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
                <UniversalInput
                    placeholder={"password"} type={"password"} name={"password"} onChange={formik.handleChange}
                    value={formik.values.password} onBlur={formik.handleBlur}/>
                {formik.touched.password && formik.errors.password &&
                    <div style={{color: "red"}}>{formik.errors.password}</div>}
                <div className={style.checkboxContainer}>
                    <UniversalCheckbox children={"Remember me"} name={"rememberMe"} onChange={formik.handleChange}
                                       checked={formik.values.rememberMe} onBlur={formik.handleBlur}/>
                </div>
                <div className={style.forgotPasswordContainer}>
                    <NavLink className={style.forgotPassword} to={PATH.passwordReset}>Forgot Password</NavLink>
                </div>
                <UniversalBtn text={"Login"} type={"submit"} disabled={disabled}/>
            </form>
            <p>Don't have an account?</p>
            <UniversalNavLink path={PATH.signUp} title={"Sign Up"}/>
        </div>
    );
};

export default SignIn;