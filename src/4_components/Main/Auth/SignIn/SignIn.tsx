import React from 'react';
import commonClass from "../../../../3_commons/classes/commonContainer.module.css"
import Title from "../../../../3_commons/common_components/Title/Title";
import Input from "../../../../3_commons/common_components/Input/Input";
import Button from "../../../../3_commons/common_components/Button/Button";
import {PATH} from "../../../../3_commons/Path";
import {Navigate} from "react-router-dom";
import NavLinkLink from "../../../../3_commons/common_components/NavLink/NavLinkLink";
import Checkbox from "../../../../3_commons/common_components/Checkbox/Checkbox";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../../../2_BLL/store";
import {signInTC} from "../../../../2_BLL/auth-reducer";
import Loader from "../../../../3_commons/common_components/Loader/Loader";
import ErrorResponse from "../../../../3_commons/common_components/ErrorResponse";
import {ErrorFormikType} from "../../../../3_commons/validates/validates";


const SignIn = () => {
    const dispatch = useAppDispatch();
    const {isLoggedIn} = useAppSelector(state => state.auth)
    const {errorOfResponse} = useAppSelector(state => state.app)
    const {isFetching} = useAppSelector(state => state.app)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: ErrorFormikType = {};
            if (!values.email) {
                errors.email = 'email is required';
            } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            } else if (!values.password) {
                errors.password = "password is required"
            } else if (values.password.length < 8) {
                errors.password = "min length 8 symbols"
            }
            return errors
        },
        onSubmit: values => {
            dispatch(signInTC(values))
            formik.resetForm()
        },
    })
    if (isLoggedIn) return <Navigate to={"/packs"}/>
    return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <Title title={'Sign in'}/>
            <p>email: <b>test_projects@yahoo.com</b></p>
            <p>password: <b>test123456</b></p>
            <form onSubmit={formik.handleSubmit}>

                <Input placeholder={"email"}
                       error={formik.touched.email && formik.errors.email}
                       textError={formik.errors.email}
                       {...formik.getFieldProps("email")}/>

                <Input {...formik.getFieldProps("password")}
                       placeholder={"password"}
                       type={"password"}
                       error={formik.touched.password && formik.errors.password}
                       textError={formik.errors.password}/>

                <Checkbox children={"Remember me"}
                          {...formik.getFieldProps("rememberMe")}/>

                <div>
                    <NavLinkLink path={PATH.forgotPassword} title={"forgot password?"}/>
                </div>
                <Button text={"Login"}
                        type={"submit"}
                        disabled={Object.keys(formik.errors).length !== 0}/>
            </form>
            <ErrorResponse errorOfResponse={errorOfResponse}/>
            <p>Don't have an account?</p>
            <NavLinkLink path={PATH.signUp} title={"Sign Up"}/>
        </div>
    );
};

export default SignIn;