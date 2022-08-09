import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {useFormik} from "formik";
import {resetPasswordTC} from "../../../../2_BLL/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../../../2_BLL/store";
import Loader from "../../../../3_commons/Loader/Loader";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import {Navigate} from "react-router-dom";
import {ErrorFormikType} from "../../../../3_commons/validate";
import ErrorResponse from "../../../../3_commons/common_components/ErrorResponse";

const ForgotPassword = React.memo(() => {
    console.log("resetPassword")
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector(state => state.auth.isFetching)
    const errorOfResponse = useAppSelector(state => state.app.errorOfResponse)
    const isEmailSent = useAppSelector(state => state.auth.isEmailSent)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: ErrorFormikType = {}
            if (!values.email) {
                errors.email = 'email is required'
            } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(resetPasswordTC(values.email))
            formik.resetForm()
        },
    })
    if (isEmailSent) return <Navigate to={"/email-password-sent"}/>
        return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <UniversalTitle title={'Reset Password'}/>
            <form onSubmit={formik.handleSubmit}>
                <UniversalInput placeholder={"email"}
                                error={formik.touched.email && formik.errors.email}
                                textError={formik.errors.email}
                                {...formik.getFieldProps("email")}/>
                <ErrorResponse errorOfResponse={errorOfResponse}/>
            <UniversalBtn disabled={Object.keys(formik.errors).length !== 0} text={"send"}/>
            </form>

        </div>
    );
});

export default ForgotPassword;