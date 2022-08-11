import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../2_BLL/store";
import {Navigate, useParams} from "react-router-dom";
import {setNewPasswordTC} from "../../../../2_BLL/auth-reducer";
import commonClass from "../../../../3_commons/common_classes/commonContainer.module.css"
import {useFormik} from "formik";
import Loader from "../../../../3_commons/Loader/Loader";
import Input from "../../../../3_commons/common_components/Input/Input";
import Button from "../../../../3_commons/common_components/Button/Button";
import {ErrorFormikType, validatePassword} from "../../../../3_commons/validate";

export const SetNewPassword = () => {
    const dispatch = useAppDispatch();
    const {token} = useParams();
    const isFetching = useAppSelector(state => state.app.isFetching)
    const isResponse = useAppSelector(state => state.app.isResponse)

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
        onSubmit: ({password}: { password: string }) => {
            token && dispatch(setNewPasswordTC(password, token))
            formik.resetForm()
        },
    })
    if (isResponse) return <Navigate to={"sign-in"}/>
    return (
        <div className={commonClass.container}>
            {isFetching && <Loader/>}
            <h1>Create new password</h1>
            <form onSubmit={formik.handleSubmit}>
                <Input {...formik.getFieldProps("password")}
                       placeholder={"password"}
                       type={"password"}
                       error={formik.touched.password && formik.errors.password}
                       textError={formik.errors.password}/>
                <Input {...formik.getFieldProps("repeatPassword")}
                       placeholder={"repeat password"}
                       type={"password"}
                       error={formik.touched.repeatPassword && formik.errors.repeatPassword}
                       textError={formik.errors.repeatPassword}/>
                <Button disabled={Object.keys(formik.errors).length !== 0} text={"send"}/>
            </form>
        </div>
    );
};
