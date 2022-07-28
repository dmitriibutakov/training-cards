import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import React, {useEffect} from 'react';
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
import Loader from "../../../../3_commons/common_components/Loader/Loader";


const SignIn = () => {

    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)
    const errorOfResponse = useSelector<AppStateType, string | null>(state => state.app.errorOfResponse)
    const isFetching = useSelector<AppStateType, boolean>(state => state.auth.isFetching)

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

    if (isLoggedIn) return <Navigate to={"/profile"}/>
    return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <UniversalTitle title={'Sign in'}/>
            <p>email: <b>test_projects@yahoo.com</b></p>
            <p>password: <b>test123456</b></p>
            <form onSubmit={formik.handleSubmit}>

                <UniversalInput placeholder={"email"}
                                error={formik.touched.email && formik.errors.email}
                                textError={formik.errors.email}
                                {...formik.getFieldProps("email")}/>

                <UniversalInput {...formik.getFieldProps("password")}
                                placeholder={"password"}
                                type={"password"}
                                error={formik.touched.password && formik.errors.password}
                                textError={formik.errors.password}/>

                <UniversalCheckbox children={"Remember me"}
                                   {...formik.getFieldProps("rememberMe")}/>

                <NavLink to={PATH.resetPassword}>Forgot Password</NavLink>
                <UniversalBtn text={"Login"}
                              type={"submit"}
                              disabled={Object.keys(formik.errors).length !== 0}/>
            </form>
            {errorOfResponse && <div className={commonClass.error}>{errorOfResponse}</div>}
            <p>Don't have an account?</p>
            <UniversalNavLink path={PATH.signUp} title={"Sign Up"}/>
        </div>
    );
};

export default SignIn;