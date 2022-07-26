import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import style from "./Signln.module.css"
import React from 'react';
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {PATH} from "../../../../3_commons/Path";
import {Navigate, NavLink} from "react-router-dom";
import UniversalNavLink from "../../../../3_commons/common_components/UniversalNavLink/UniversalNavLink";
import {useSelector} from "react-redux";
import UniversalCheckbox from "../../../../3_commons/common_components/UniversalCheckbox/UniversalCheckbox";
import {useFormik} from "formik";
import {AppStateType, useAppDispatch} from "../../../../2_BLL/store";
import {loginTC} from "../../../../2_BLL/auth-reducer";


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
                errors.email = 'email is required';
            } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'password is required'
            } else if (values.password.length < 8) {
                errors.password = 'must be more than 8 symbols'
            }
            return errors;
        },
        onSubmit: values => {
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
            <p>email: <b>test_projects@yahoo.com</b></p>
            <p>password: <b>test123456</b></p>
            <form onSubmit={formik.handleSubmit}>
                <UniversalInput placeholder={"email"} {...formik.getFieldProps("email")}/>
                {formik.touched.email && formik.errors.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
                <UniversalInput {...formik.getFieldProps("password")}
                                placeholder={"password"}
                                type={"password"}/>
                {formik.touched.password && formik.errors.password &&
                    <div style={{color: "red"}}>{formik.errors.password}</div>}
                    <UniversalCheckbox children={"Remember me"} {...formik.getFieldProps("rememberMe")}/>
                    <NavLink to={PATH.passwordReset}>Forgot Password</NavLink>
                <UniversalBtn text={"Login"} type={"submit"} disabled={disabled}/>
            </form>
            <p>Don't have an account?</p>
            <UniversalNavLink path={PATH.signUp} title={"Sign Up"}/>
        </div>
    );
};

export default SignIn;