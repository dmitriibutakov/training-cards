import React from 'react';
import privateClass from "./UniversalRow.module.css"
import {deleteImg, editImg, studyImg} from "../../common_images/commonImages";
import {NavLink} from "react-router-dom";

type UniversalRowPropsType = {
    name: string
    cardsCountTitle?: string
    cardsCount?: number
    updated: string
    buttonsClicks?: {
        deleteClick: () => void
        updateClick: () => void
        cards: () => void
    }
}
const UniversalRow: React.FC<UniversalRowPropsType> = ({name, cardsCount, updated, buttonsClicks}) => {
    return (
        <div className={privateClass.row}>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>{updated}</div>
            <div>
                <button className={privateClass.link}><img src={deleteImg} alt="icon"/></button>
                <button className={privateClass.link}><img src={editImg} alt="icon"/></button>
                <NavLink className={privateClass.link} to={"/cards"}><img src={studyImg} alt="icon"/></NavLink>
            </div>
        </div>
    );
};

export default UniversalRow;