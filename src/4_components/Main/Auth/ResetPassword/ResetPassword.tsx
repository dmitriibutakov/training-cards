import React from 'react';
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import UniversalTitle from "../../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {useFormik} from "formik";
import {resetPasswordTC} from "../../../../2_BLL/auth-reducer";
import {AppStateType, useAppDispatch} from "../../../../2_BLL/store";
import {useSelector} from "react-redux";
import Loader from "../../../../3_commons/common_components/Loader/Loader";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";

const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const disabled = useSelector<AppStateType, boolean>(state => state.auth.buttonDisable)
    const isFetching = useSelector<AppStateType, boolean>(state => state.auth.isFetching)

    type FormikErrorType = {
        email?: string
    }
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'email is required'
            } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(resetPasswordTC(values.email, ""))
            formik.resetForm()
        },
    })
    return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <UniversalTitle title={'Reset Password'}/>
            <form onSubmit={formik.handleSubmit}>
                <UniversalInput placeholder={"email"}
                                error={formik.touched.email && formik.errors.email}
                                textError={formik.errors.email}
                                {...formik.getFieldProps("email")}/>
            <UniversalBtn text={"send"}/>
            </form>
        </div>
    );
};

export default ResetPassword;