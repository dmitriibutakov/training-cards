import React from 'react';
import Row from "./Row/Row";
import {PackType} from "../../../1_DAL/packs-api";
import commonClass from "../../classes/commonTable.module.css"
import Arrow from "../Arrow/Arrow";
import {CardType} from "../../../1_DAL/cards-api";

type TablePropsType = {
    cards?: boolean
    collection: Array<PackType> | Array<CardType>
    deleteCallback: (id: string) => void
    editCallback: (id: string, newTitle: string) => void
    getCallback?: (id: string) => void
}
const Table: React.FC<TablePropsType> = ({collection, cards, ...calbacks}) => {
    if (collection.length === 0) return <Arrow/>
    return (
        <div className={commonClass.table__list}>
            {
                collection.map(el => {
                    return (cards ?
                        <Row key={el._id}
                             id={el._id}
                             cards={cards}
                             question={el.question}
                             answer={el.answer}
                             updated={el.updated && el.updated.slice(0, 10)}
                             {...calbacks}/>

                        : <Row key={el._id}
                               id={el._id}
                               cards={cards}
                               name={el.name}
                               cardsCount={el.cardsCount}
                               updated={el.updated && el.updated.slice(0, 10)}
                               {...calbacks}/>)
                })
            }
        </div>
    );
};

export default Table;