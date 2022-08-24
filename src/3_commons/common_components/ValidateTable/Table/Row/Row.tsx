import React from 'react';
import privateClass from "./Row.module.css"
import {useNavigate} from "react-router-dom";
import {images} from "../../../../images/commonImages";
import {ModalStatusesTypes} from "../../../../validates/validates";
import {useAppDispatch} from "../../../../../2_BLL/store";
import {getRandomCardTC, setPackUserId} from "../../../../../2_BLL/cards-reducer";
import StarRating from "../../../StarRating/StarRating";

type RowPropsType = {
    isCards?: boolean
    valueId: string
    value?: string
    value2?: string | number
    value3: string | number
    setModalStatus: (modal: ModalStatusesTypes) => void
    setValueId: (id: string) => void
    grade?: number
}
const Row: React.FC<RowPropsType> = ({
                                         value3,
                                         valueId,
                                         isCards,
                                         value, value2,
                                         setModalStatus,
                                         setValueId, grade
                                     }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const validateStyles = isCards ? privateClass.row__cards : privateClass.row__packs
    return (
        <div className={validateStyles}>
            <div onClick={!isCards ? () => navigate(`/packs/${valueId}`) : () => setModalStatus("edit")}>{value}</div>
            <div>{value2}</div>
            <div>{value3}</div>
            {isCards && <div>
                <StarRating value={grade || 0}/></div>}
            {<div>
                <button onClick={() => {
                    setValueId(valueId)
                    setModalStatus("delete")
                }} className={privateClass.link}>
                    <img src={images.deleteImg} alt="icon"/>
                </button>

                <button onClick={() => {
                    setValueId(valueId)
                    setModalStatus("edit")
                }} className={privateClass.link}>
                    <img src={images.editImg} alt="icon"/>
                </button>


                {!isCards && <button disabled={!value2} className={!value2 ?
                    privateClass.disabled__link :
                    privateClass.link}
                                     onClick={async () => {
                                         dispatch(setPackUserId(valueId))
                                         await dispatch(getRandomCardTC())
                                         setModalStatus("learn")
                                     }}>
                    <img src={images.studyImg} alt="icon"/>
                </button>}
            </div>}
        </div>
    );
};

export default Row;