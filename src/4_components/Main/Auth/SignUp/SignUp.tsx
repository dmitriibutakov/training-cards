import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import UniversalNavLink from "../../../../3_commons/common_components/UniversalNavLink/UniversalNavLink";
import {PATH} from "../../../../3_commons/Path";
import {useDispatch} from "react-redux";
import { useFormik } from 'formik';
import {signUpTC} from "./signUp-reducer";
import {AppReducersTypes} from "../../../../2_BLL/store";


const SignUp = () => {
    const dispatch = useDispatch()
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
            } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            } else if (!values.password) {
                errors.password = "password is required"
            } else if (!values.repeatPassword) {
                errors.repeatPassword = "password is required"
            } else if (values.password.length < 8) {
                errors.password = "min length 8 symbols"
            } else if (values.password !== values.repeatPassword) {
                alert('password is not accepted')
            }
            return errors
        },
        onSubmit: values => {
            dispatch<AppReducersTypes>(signUpTC(values.email, values.password, values.repeatPassword))
            formik.resetForm()
        },
    })

    return (
        <div className={commonClass.container}>
            <UniversalTitle title={'Sign Up'}/>
            <form onSubmit={formik.handleSubmit}>
                <UniversalInput {...formik.getFieldProps("email")}
                    placeholder={"email"}/>
                {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                <UniversalInput {...formik.getFieldProps("password")} placeholder={"password"} type={"password"}/>
                <UniversalInput {...formik.getFieldProps("repeatPassword")} placeholder={"confirm password"} type={"password"}/>
                <UniversalBtn type={'submit'} text={"Sign Up"}/>
            </form>
            <p>Already have an account?</p>
            <UniversalNavLink path={PATH.signIn} title={"Sign In"}/>
        </div>
    );
};

export default SignUp;