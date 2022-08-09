import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../2_BLL/store";
import {Navigate, useParams} from "react-router-dom";
import {setNewPasswordTC} from "../../../../2_BLL/auth-reducer";
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import {useFormik} from "formik";
import Loader from "../../../../3_commons/Loader/Loader";
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import UniversalBtn from "../../../../3_commons/common_components/UniversalBtn/UniversalBtn";
import {ErrorFormikType, validatePassword} from "../../../../3_commons/validate";

export const SetNewPassword = () => {
    console.log("SetNewPassword")
    const dispatch = useAppDispatch();
    const { token } = useParams();
    const isFetching = useAppSelector(state => state.auth.isFetching)
    const info = useAppSelector(state => state.auth.info)

    const formik = useFormik({
        initialValues: {
            password: "",
            repeatPassword: ""
        },
        validate: (values) => {
            const errors: ErrorFormikType = {}
            validatePassword(values, errors)
            return errors
        },
        onSubmit: ({password}: {password: string}) => {
            token && dispatch(setNewPasswordTC(password, token))
            formik.resetForm()
        },
    })
if (info) return <Navigate to={"sign-in"}/>
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
                <UniversalInput {...formik.getFieldProps("repeatPassword")}
                                placeholder={"repeat password"}
                                type={"password"}
                                error={formik.touched.repeatPassword && formik.errors.repeatPassword}
                                textError={formik.errors.repeatPassword}/>
                {info && <p>{info}</p>}
                <UniversalBtn disabled={Object.keys(formik.errors).length !== 0} text={"send"}/>
            </form>
        </div>
    );
};
