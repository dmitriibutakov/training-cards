import React from 'react';
import {useFormik} from "formik";
import {ErrorFormikType, ModalStatusesTypes, validateCallbacks} from "../../../../validates/validates";
import privateClass from "../Modals.module.css";
import Input from "../../../Input/Input";
import Button from "../../../Button/Button";

type ModalWithFormPropsType = {
    modalStatus: ModalStatusesTypes
    isCards?: boolean
    valueId: string
    addCallback: (value: string, description?: string) => void
    editCallback: (id: string, value: string, comments?: string) => void
}
const ModalWithForm: React.FC<ModalWithFormPropsType> = ({
                                                                              modalStatus, isCards,
                                                                              addCallback,
                                                                              editCallback,
                                                                              valueId
                                                                          }) => {
    const formik = useFormik({
        initialValues: {
            value: "",
            description: ""
        },
        validate: (values) => {
            const errors: ErrorFormikType = {}
            if (modalStatus === "delete") {
                return
            } else if (!values.value) {
                if (isCards) {
                    errors.value = "question is required"
                } else errors.value = "name pack is required"
            } else if (!values.description) {
                if (isCards) {
                    errors.description = "answer is required"
                }
            } else if (values.value.length < 5) {
                errors.value = "min length 5 symbols"
            }
            return errors
        },
        onSubmit: (values) => {
            validateCallbacks(
                values.value,
                valueId,
                values.description,
                addCallback,
                editCallback,
                isCards || false,
                modalStatus)
            formik.resetForm()

        },
    })
    return (
        <form onSubmit={formik.handleSubmit} className={privateClass.modal__form}>

            <Input {...formik.getFieldProps("value")}
                   placeholder={isCards ? "new question" : "name pack"}
                   error={formik.touched.value && formik.errors.value}
                   textError={formik.errors.value}/>
            {isCards &&
                <Input {...formik.getFieldProps("description")}
                       placeholder={"new answer"}
                       error={formik.touched.description && formik.errors.description}
                       textError={formik.errors.description}/>}

            <Button disabled={Object.keys(formik.errors).length !== 0}
                    text={"add"}/>
        </form>
    );
};

export default ModalWithForm;