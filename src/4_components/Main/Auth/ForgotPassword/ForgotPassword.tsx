import React from 'react';
import commonClass from "../../../../3_commons/classes/commonContainer.module.css"
import Title from "../../../../3_commons/common_components/Title/Title";
import Button from "../../../../3_commons/common_components/Button/Button";
import {useFormik} from "formik";
import {resetPasswordTC} from "../../../../2_BLL/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../../../2_BLL/store";
import Loader from "../../../../3_commons/Loader/Loader";
import Input from "../../../../3_commons/common_components/Input/Input";
import {Navigate} from "react-router-dom";
import {ErrorFormikType} from "../../../../3_commons/validate";
import ErrorResponse from "../../../../3_commons/common_components/ErrorResponse";

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
    if (isResponse) return <Navigate to={"/email-password-sent"}/>
    return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <Title title={'Reset Password'}/>
            <form onSubmit={formik.handleSubmit}>
                <Input placeholder={"email"}
                       error={formik.touched.email && formik.errors.email}
                       textError={formik.errors.email}
                       {...formik.getFieldProps("email")}/>
                <ErrorResponse errorOfResponse={errorOfResponse}/>
                <Button disabled={Object.keys(formik.errors).length !== 0} text={"send"}/>
            </form>

        </div>
    );
});

export default ForgotPassword;