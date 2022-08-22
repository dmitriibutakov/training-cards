import React from 'react';
import commonClass from "../../../../3_commons/classes/commonContainer.module.css"
import Title from "../../../../3_commons/common_components/Title/Title";
import Button from "../../../../3_commons/common_components/Button/Button";
import {useFormik} from "formik";
import {resetPasswordTC} from "../../../../2_BLL/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../../../2_BLL/store";
import Loader from "../../../../3_commons/common_components/Loader/Loader";
import Input from "../../../../3_commons/common_components/Input/Input";
import {Navigate} from "react-router-dom";
import ErrorResponse from "../../../../3_commons/common_components/ErrorResponse";
import {ErrorFormikType} from "../../../../3_commons/validates/validates";
import { Fade } from '../../../../3_commons/animations';
import {PATH} from "../../../../3_commons/Path";

const ForgotPassword = React.memo(() => {
    const dispatch = useAppDispatch();
    const {isFetching} = useAppSelector(state => state.app)
    const {errorOfResponse} = useAppSelector(state => state.app)
    const {isResponse} = useAppSelector(state => state.app)

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validate: (values) => {
            const errors: ErrorFormikType = {}
            if (!values.email) {
                errors.email = 'email is required';
            } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(resetPasswordTC(values.email))
            formik.resetForm()
        },
    })
    if (isResponse) return <Navigate to={PATH.emailPasswordSent}/>
    return (
        <Fade delay={100} effect={"fadeInUp"}>
        <div className={commonClass.container}>
            {isFetching &&<Loader/>}
            <Title title={'Reset Password'}/>
            <p>we'll send instructions on email</p>
            <form onSubmit={formik.handleSubmit}>
                <Input placeholder={"email"}
                       error={formik.touched.email && formik.errors.email}
                       textError={formik.errors.email}
                       {...formik.getFieldProps("email")}/>
                <Button disabled={Object.keys(formik.errors).length !== 0} text={"send"}/>
                <ErrorResponse errorOfResponse={errorOfResponse}/>
            </form>
        </div>
        </Fade>
    );
});

export default ForgotPassword;