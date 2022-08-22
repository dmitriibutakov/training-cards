import React from 'react';
import commonClass from "../../../../3_commons/classes/commonContainer.module.css"
import Title from "../../../../3_commons/common_components/Title/Title";
import Input from "../../../../3_commons/common_components/Input/Input";
import Button from "../../../../3_commons/common_components/Button/Button";
import Link from "../../../../3_commons/common_components/Link/Link";
import {PATH} from "../../../../3_commons/Path";
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from "../../../../2_BLL/store";
import Loader from "../../../../3_commons/common_components/Loader/Loader";
import {signUpTC} from "../../../../2_BLL/auth-reducer";
import {useNavigate} from "react-router-dom";
import ErrorResponse from "../../../../3_commons/common_components/ErrorResponse";
import {ErrorFormikType} from "../../../../3_commons/validates/validates";
import {Fade} from '../../../../3_commons/animations';

const SignUp = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {isFetching} = useAppSelector(state => state.app)
    const {errorOfResponse} = useAppSelector(state => state.app)

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
            }, 1300)
        },
    })
    return (
        <Fade delay={100} effect={"fadeInUp"}>
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
                    <Button disabled={Object.keys(formik.errors).length !== 0}
                            type={'submit'}
                            text={"Sign Up"}/>
                </form>
                <p>Already have an account?</p>
                <Link path={PATH.signIn} title={"Sign In"}/>
                <ErrorResponse errorOfResponse={errorOfResponse}/>
            </div>
        </Fade>
    );
};

export default SignUp;