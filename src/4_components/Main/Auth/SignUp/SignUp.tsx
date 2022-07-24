import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import UniversalNavLink from "../../../../3_commons/common_components/UniversalNavLink/UniversalNavLink";
import {PATH} from "../../../../3_commons/Path";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../2_BLL/store";
import { useFormik } from 'formik';
import {signUp} from "./signUp-reducer";


const SignUp = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.auth.isLoggedIn)
    type FormikErrorType = {
        email?: string
        password?: string
        repeatPassword?: string
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = "password is required"
            } else if (!values.repeatPassword) {
                errors.repeatPassword = "password is required"
            } else if (values.password.length < 8) {
                errors.password = "min length 8 symbols"
            }
            return errors
        },
        onSubmit: values => {
            // dispatch(signUp(values.email, values.password, values.repeatPassword))
            formik.resetForm()
        },
    })

    return (
        <div className={commonClass.container}>
            <UniversalTitle title={'Sign Up'}/>
            <form>
                <UniversalInput placeholder={"email"}/>
                <UniversalInput placeholder={"password"} type={"password"}/>
                <UniversalInput placeholder={"confirm password"} type={"password"}/>
                <UniversalBtn text={"Sign Up"}/>
            </form>
            <p>Already have an account?</p>
            <UniversalNavLink path={PATH.signIn} title={"Sign In"}/>
        </div>
    );
};

export default SignUp;