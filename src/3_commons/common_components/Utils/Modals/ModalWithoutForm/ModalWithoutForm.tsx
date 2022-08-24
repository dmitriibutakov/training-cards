import React from 'react';
import {ModalStatusesTypes} from "../../../../validates/validates";
import LearnModal from "./LearnModal/LearnModal";
import DeleteModal from "./DeleteModal/DeleteModal";

type ModalWithoutFormPropsType = {
    modalStatus: ModalStatusesTypes
    isCards?: boolean
    valueId: string
    deleteCallback: (valueId: string) => void
}
const ModalWithoutForm: React.FC<ModalWithoutFormPropsType> = ({
                                                                   modalStatus,
                                                                   valueId,
                                                                   deleteCallback,
                                                               }) => {
    return (
        <>
            {modalStatus === "delete" &&
                <DeleteModal deleteCallback={deleteCallback}
                             valueId={valueId}/>}

            {modalStatus === "learn" &&
                <LearnModal/>}
        </>
    );
};

export default ModalWithoutForm;