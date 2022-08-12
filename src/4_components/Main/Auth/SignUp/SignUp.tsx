import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import Title from "../../../../3_commons/common_components/Title/Title";
import Input from "../../../../3_commons/common_components/Input/Input";
import Button from "../../../../3_commons/common_components/Button/Button";
import NavLinkLink from "../../../../3_commons/common_components/NavLink/NavLinkLink";
import {PATH} from "../../../../3_commons/Path";
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from "../../../../2_BLL/store";
import Loader from "../../../../3_commons/Loader/Loader";
import {signUpTC} from "../../../../2_BLL/auth-reducer";
import {useNavigate} from "react-router-dom";
import {ErrorFormikType} from "../../../../3_commons/validate";
import ErrorResponse from "../../../../3_commons/common_components/ErrorResponse";

const SignUp = () => {
    const navigate = useNavigate()
    const isFetching = useAppSelector(state => state.app.isFetching)
    const errorOfResponse = useAppSelector(state => state.app.errorOfResponse)
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
                errors.email = 'email is required';
            } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "password is required"
            } else if (!values.repeatPassword) {
                errors.repeatPassword = "password is required"
            } else if (values.password.length < 8) {
                errors.password = "min length 8 symbols"
            } else if (values.repeatPassword.length < 8) {
                errors.repeatPassword = "min length 8 symbols"
            } else if (values.repeatPassword !== values.password) {
                errors.repeatPassword = "confirm your password currently"
            }
            return errors
        },
        onSubmit: values => {
            dispatch(signUpTC(values.email, values.password))
            formik.resetForm()
            setTimeout(() => {
                navigate("/sign-in")
            }, 500)
        },
    })
    return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <Title title={'Sign Up'}/>
            <form onSubmit={formik.handleSubmit}>

                <Input {...formik.getFieldProps("email")}
                       placeholder={"email"}
                       error={formik.touched.email && formik.errors.email}
                       textError={formik.errors.email}/>

                <Input {...formik.getFieldProps("password")}
                       placeholder={"password"}
                       type={"password"}
                       error={formik.touched.password && formik.errors.password}
                       textError={formik.errors.password}/>

                <Input {...formik.getFieldProps("repeatPassword")}
                       placeholder={"confirm password"}
                       type={"password"}
                       error={formik.touched.repeatPassword && formik.errors.repeatPassword}
                       textError={formik.errors.repeatPassword}/>
                <ErrorResponse errorOfResponse={errorOfResponse}/>
                <Button disabled={Object.keys(formik.errors).length !== 0}
                        type={'submit'}
                        text={"Sign Up"}/>
            </form>
            <p>Already have an account?</p>
            <NavLinkLink path={PATH.signIn} title={"Sign In"}/>
        </div>
    );
};

export default SignUp;