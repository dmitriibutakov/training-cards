import React from 'react';
import privateClass from "./Row.module.css"
import {deleteImg, editImg, studyImg} from "../../../common_images/commonImages";
import {NavLink} from "react-router-dom";

type RowPropsType = {
    cards?: boolean
    id: string
    name: string
    cardsCount?: number
    updated: string
    deleteCallback: (id: string) => void
    editCallback: (id: string, name: string) => void
}
const Row: React.FC<RowPropsType> = ({
                                                           name,
                                                           cardsCount,
                                                           updated,
                                                           id,
                                                           editCallback,
                                                           deleteCallback,
                                                           cards
                                                       }) => {
    return (
        <div className={privateClass.row}>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>{updated}</div>
            <div>
                <button onClick={() => deleteCallback(id)}
                        className={privateClass.link}>
                    <img src={deleteImg} alt="icon"/>
                </button>
                <button onClick={() => editCallback(id, "updated title")}
                        className={privateClass.link}>
                    <img src={editImg} alt="icon"/>
                </button>
                {!cards &&
                    <NavLink className={privateClass.link} to={"/cards"}><img src={studyImg} alt="icon"/></NavLink>}
            </div>
        </div>
    );
};

export default Row;