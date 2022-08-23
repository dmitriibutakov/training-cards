import React from 'react';
import privateClass from "./Row.module.css"
import {useNavigate} from "react-router-dom";
import {images} from "../../../../images/commonImages";
import {ModalStatusesTypes} from "../../../../validates/validates";
import {Rating} from "react-simple-star-rating";
import {useAppDispatch} from "../../../../../2_BLL/store";
import {setPackName} from "../../../../../2_BLL/cards-reducer";

type RowPropsType = {
    isCards?: boolean
    id: string
    value?: string
    value2?: string | number
    value3: string | number
    setShowModal: (modal: ModalStatusesTypes) => void
    setValueId: (id: string) => void
    rating?: number
}
const Row: React.FC<RowPropsType> = ({
                                         value3,
                                         id,
                                         isCards,
                                         value, value2,
                                         setShowModal,
                                         setValueId, rating
                                     }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
const validateStyles = isCards ? privateClass.row__cards : privateClass.row__packs
    return (
        <div className={validateStyles}>
            <div onClick={!isCards ? () => navigate(`/packs/${id}`) : ()=> setShowModal("edit")}>{value}</div>
            <div>{value2}</div>
            <div>{value3}</div>

            {isCards && <div><Rating
                ratingValue={rating || 0}
                allowHalfIcon={true}
                readonly={true}
                size={20}
                className={privateClass.rating}
            /></div>}
            {<div>
                    <button onClick={() => {
                        setValueId(id)
                        setShowModal("delete")}} className={privateClass.link}>
                        <img src={images.deleteImg} alt="icon"/>
                    </button>

                    <button onClick={() => {
                        setValueId(id)
                        setShowModal("edit")}} className={privateClass.link}>
                        <img src={images.editImg} alt="icon"/>
                    </button>


                {!isCards && <button className={privateClass.link}
                             onClick={()=>setShowModal("learn")}>
                        <img src={images.studyImg} alt="icon"/>
                    </button>}
                </div>}
        </div>
    );
};

export default Row;