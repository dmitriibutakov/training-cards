import React from 'react';
import privateClass from "./Modals.module.css"
import commonClass from "../../../classes/commonContainer.module.css"
import {images} from "../../../images/commonImages";
import {CallbacksTypes, ModalStatusesTypes, validateTitle} from "../../../validates/validates";
import {Fade} from '../../../animations';
import ModalWithoutForm from "./ModalWithoutForm/ModalWithoutForm";
import ModalWithForm from "./ModalWithForm/ModalWithForm";

type ModalPropsType = {
    setModalStatus: (modal: ModalStatusesTypes) => void
    modalStatus: ModalStatusesTypes
    isCards?: boolean
    valueId: string
}
const Modals: React.FC<ModalPropsType & CallbacksTypes> = ({
                                                               setModalStatus,
                                                               isCards,
                                                               addCallback,
                                                               deleteCallback,
                                                               editCallback,
                                                               modalStatus,
                                                               valueId,
                                                           }) => {
    const ModalWithFormProps = {
        setModalStatus, isCards,
        addCallback, editCallback,
        modalStatus, valueId
    }
    const modalWithoutFormProps = {
        deleteCallback, modalStatus,
        valueId
    }
    const hideModal = (event: any) => {
        event.currentTarget === event.target && setModalStatus("hidden")
    }

    return (
        <Fade effect={"fadeInUp"}>
            <div onClick={hideModal} className={privateClass.modal__block}>
                <div className={commonClass.container}>
                    <h1 className={privateClass.modal__title}>{validateTitle(isCards || false, modalStatus)}</h1>
                    <button className={privateClass.modal__btn_close}
                            onClick={() => setModalStatus("hidden")}>
                        <img src={images.closeImg} alt="close"/>
                    </button>
                    {(modalStatus === "learn" || modalStatus === "delete") ?
                        <ModalWithoutForm {...modalWithoutFormProps}/>
                        : <ModalWithForm {...ModalWithFormProps}/>}
                </div>
            </div>
        </Fade>
    );
};

export default Modals;