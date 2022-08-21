import React from 'react';
import privateClass from "./Row.module.css"
import {NavLink} from "react-router-dom";
import {images} from "../../../../images/commonImages";
import {ModalStatusesTypes} from "../../../../validates/validates";

type RowPropsType = {
    cards?: boolean
    id: string
    value?: string
    value2?: string | number
    updated: string
    setShowModal: (modal: ModalStatusesTypes) => void
    setValueId: (id: string) => void
}
const Row: React.FC<RowPropsType> = ({
                                         updated,
                                         id,
                                         cards,
                                         value, value2,
                                         setShowModal,
                                         setValueId
                                     }) => {
    return (
        <div className={privateClass.row}>
            <div>{value}</div>
            <div>{value2}</div>
            <div>{updated}</div>
            <div>
                <button onClick={() => {
                    setValueId(id)
                    setShowModal("delete")
                }}
                        className={privateClass.link}>
                    <img src={images.deleteImg} alt="icon"/>
                </button>
                <button onClick={() => {
                    setValueId(id)
                    setShowModal("edit")
                }}
                        className={privateClass.link}>
                    <img src={images.editImg} alt="icon"/>
                </button>
                {!cards &&
                    <NavLink className={privateClass.link}
                             to={`/packs/${id}`}>
                        <img src={images.studyImg} alt="icon"/>
                    </NavLink>}
            </div>
        </div>
    );
};

export default Row;