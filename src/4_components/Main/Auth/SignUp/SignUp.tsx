import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import UniversalNavLink from "../../../../3_commons/common_components/UniversalNavLink/UniversalNavLink";
import {PATH} from "../../../../3_commons/Path";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from 'formik';
import {AppStateType} from "../../../../2_BLL/store";
import Loader from "../../../../3_commons/common_components/Loader/Loader";
import {signUpTC} from "../../../../2_BLL/auth-reducer";
import {Navigate} from "react-router-dom";


const SignUp = () => {
    const isFetching = useSelector<AppStateType, boolean>(state => state.auth.isFetching)
    const err = useSelector<AppStateType, string | null>(state => state.app.error)
    const isResponse = useSelector<AppStateType, boolean>(state => state.auth.isResponse)
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
            } else if (values.repeatPassword.length < 8) {
                errors.repeatPassword = "min length 8 symbols"
            } else if (values.repeatPassword !== values.password) {
                errors.repeatPassword = "confirm your password currectly"
            }
            return errors
        },
        onSubmit: values => {
            dispatch<any>(signUpTC(values.email, values.password))
            formik.resetForm()
        },
    })
    if (isResponse) return <Navigate to={"/sign-in"}/>
    return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <UniversalTitle title={'Sign Up'}/>
            <form onSubmit={formik.handleSubmit}>
                <UniversalInput {...formik.getFieldProps("email")}
                                placeholder={"email"}/>
                {formik.touched.email && formik.errors.email &&
                    <div style={{color: "red"}}>{formik.errors.email}</div>}
                <UniversalInput {...formik.getFieldProps("password")}
                                placeholder={"password"}
                                type={"password"}/>
                {formik.touched.password && formik.errors.password &&
                    <div style={{color: "red"}}>{formik.errors.password}</div>}
                <UniversalInput {...formik.getFieldProps("repeatPassword")}
                                placeholder={"confirm password"}
                                type={"password"}/>
                {formik.touched.repeatPassword && formik.errors.repeatPassword &&
                    <div style={{color: "red"}}>{formik.errors.repeatPassword}</div>}
                {err && <div className={commonClass.error}>{err}</div>}
                <UniversalBtn disabled={Object.keys(formik.errors).length !== 0} type={'submit'} text={"Sign Up"}/>
            </form>
            <p>Already have an account?</p>
            <UniversalNavLink path={PATH.signIn} title={"Sign In"}/>
        </div>
    );
};

export default SignUp;