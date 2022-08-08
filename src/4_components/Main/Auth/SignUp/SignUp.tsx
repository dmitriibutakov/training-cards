import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import UniversalNavLink from "../../../../3_commons/common_components/UniversalNavLink/UniversalNavLink";
import {PATH} from "../../../../3_commons/Path";
import {useSelector} from "react-redux";
import {useFormik} from 'formik';
import {AppStateType, useAppDispatch} from "../../../../2_BLL/store";
import Loader from "../../../../3_commons/Loader/Loader";
import {signUpTC} from "../../../../2_BLL/auth-reducer";
import {Navigate} from "react-router-dom";
import {ErrorFormikType, validatePassword} from "../../../../3_commons/validate";
import ErrorResponse from "../../../../3_commons/common_components/ErrorResponse";


const SignUp = () => {
    console.log("SignUp")
    const isFetching = useSelector<AppStateType, boolean>(state => state.auth.isFetching)
    const errorOfResponse = useSelector<AppStateType, string | null>(state => state.app.errorOfResponse)
    const isResponse = useSelector<AppStateType, boolean>(state => state.auth.isResponse)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: ''
        },
        validate: (values) => {
            const errors: ErrorFormikType = {}
            if (!values.email) {
                errors.email = 'email is required'
            } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            validatePassword(values, errors)
            return errors
        },
        onSubmit: values => {
            dispatch(signUpTC(values.email, values.password))
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
                                placeholder={"email"}
                                error={formik.touched.email && formik.errors.email}
                                textError={formik.errors.email}/>

                <UniversalInput {...formik.getFieldProps("password")}
                                placeholder={"password"}
                                type={"password"}
                                error={formik.touched.password && formik.errors.password}
                                textError={formik.errors.password}/>

                <UniversalInput {...formik.getFieldProps("repeatPassword")}
                                placeholder={"confirm password"}
                                type={"password"}
                                error={formik.touched.repeatPassword && formik.errors.repeatPassword}
                                textError={formik.errors.repeatPassword}/>
                <ErrorResponse errorOfResponse={errorOfResponse}/>
                <UniversalBtn disabled={Object.keys(formik.errors).length !== 0}
                              type={'submit'}
                              text={"Sign Up"}/>
            </form>
            <p>Already have an account?</p>
            <UniversalNavLink path={PATH.signIn} title={"Sign In"}/>
        </div>
    );
};

export default SignUp;