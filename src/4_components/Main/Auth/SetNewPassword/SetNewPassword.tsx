import React from 'react';
import {AppStateType, useAppDispatch} from "../../../../2_BLL/store";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {setNewPasswordTC} from "../../../../2_BLL/auth-reducer";
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import {useFormik} from "formik";
import Loader from "../../../../3_commons/common_components/Loader/Loader";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";

export const SetNewPassword = () => {
    const dispatch = useAppDispatch();
    const { token } = useParams();
    const isFetching = useSelector<AppStateType, boolean>(state => state.auth.isFetching)

    type FormikErrorType = {
        password?: string
    }
    const formik = useFormik({
        initialValues: {
            password: ""
        },
        validate: (values) => {

            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = "password is required"
            } else if (values.password.length < 8) {
                errors.password = "min length 8 symbols"
            }
        },
        onSubmit: ({password}: {password: string}) => {
            token && dispatch(setNewPasswordTC(password, token))
            formik.resetForm()
        },
    })

    return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <h1>Create new password</h1>
            <form onSubmit={formik.handleSubmit}>
                <UniversalInput {...formik.getFieldProps("password")}
                                placeholder={"password"}
                                type={"password"}
                                error={formik.touched.password && formik.errors.password}
                                textError={formik.errors.password}/>
            </form>
        </div>
    );
};
