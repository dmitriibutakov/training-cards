import React from 'react';
import privateClass from "./Modal.module.css"
import {images} from "../../../images/commonImages";
import Input from "../../Input/Input";
import {useFormik} from "formik";
import Button from "../../Button/Button";
import {
    CallbacksTypes,
    ErrorFormikType,
    ModalStatusesTypes,
    validateCallbacks,
    validateTitle
} from "../../../validates/validates";
import {Fade} from '../../../animations';

type ModalPropsType = {
    setShowModal: (modal: ModalStatusesTypes) => void
    showModal: ModalStatusesTypes
    isCards?: boolean
    valueId: string
}
const Modal: React.FC<ModalPropsType & CallbacksTypes> = ({
                                                              setShowModal,
                                                              isCards,
                                                              addCallback,
                                                              deleteCallback,
                                                              editCallback,
                                                              showModal,
                                                              valueId
                                                          }) => {
    const hideModal = (event: any) => {
        event.currentTarget === event.target && setShowModal("hidden")
    }
    const formik = useFormik({
        initialValues: {
            value: "",
            description: ""
        },
        validate: (values) => {
            const errors: ErrorFormikType = {}
            if (showModal === "delete") {
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
                deleteCallback,
                editCallback,
                isCards || false,
                showModal)
            formik.resetForm()

        },
    })
    return (
        <Fade effect={"fadeInUp"}>
            <div onClick={hideModal} className={privateClass.modal__block}>
                <div className={privateClass.modal__block_container}>
                    <h2 className={privateClass.modal__title}>{validateTitle(isCards || false, showModal)}</h2>
                    <button className={privateClass.modal__btn_close}
                            onClick={() => setShowModal("hidden")}>
                        <img src={images.closeImg} alt="close"/>
                    </button>

                    <form onSubmit={formik.handleSubmit} className={privateClass.modal__form}>

                        {showModal === "delete" ?
                            <p className={privateClass.modal__description}>Are you sure that you want to delete?</p>
                            : <Input {...formik.getFieldProps("value")}
                                     placeholder={isCards ? "new question" : "name pack"}
                                     error={formik.touched.value && formik.errors.value}
                                     textError={formik.errors.value}/>}

                        {isCards && showModal !== "delete" && <Input {...formik.getFieldProps("description")}
                                                                   placeholder={"new answer"}
                                                                   error={formik.touched.description && formik.errors.description}
                                                                   textError={formik.errors.description}/>}

                        <Button disabled={Object.keys(formik.errors).length !== 0}
                                text={showModal === "delete" ? "delete" : "add"}/>
                    </form>

                </div>
            </div>
        </Fade>
    );
};

export default Modal;