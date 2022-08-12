import React from 'react';
import privateClass from "./Row.module.css"
import {deleteImg, editImg, studyImg} from "../../../common_images/commonImages";
import {NavLink} from "react-router-dom";

type RowPropsType = {
    cards?: boolean
    id: string
    name?: string
    question?: string
    answer?: string
    cardsCount?: number
    updated: string
    deleteCallback: (id: string) => void
    editCallback: (id: string, newTitle: string) => void
    getCallback?: (id: string) => void
}
const Row: React.FC<RowPropsType> = ({
                                         name,
                                         cardsCount,
                                         updated,
                                         id,
                                         editCallback,
                                         deleteCallback,
                                         cards,
                                         question,
                                         answer
                                     }) => {
    return (
        <div className={privateClass.row}>
            <div>{name || question}</div>
            <div>{cardsCount || answer}</div>
            <div>{updated}</div>
            <div>
                <button onClick={() => deleteCallback(id)}
                        className={privateClass.link}>
                    <img src={deleteImg} alt="icon"/>
                </button>
                <button onClick={() => editCallback(id, "pack updated")}
                        className={privateClass.link}>
                    <img src={editImg} alt="icon"/>
                </button>
                {!cards &&
                    <NavLink className={privateClass.link}
                             to={`/packs/${id}`}>
                        <img src={studyImg} alt="icon"/>
                    </NavLink>}
            </div>
        </div>
    );
};

export default Row;