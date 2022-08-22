import React from 'react';
import Row from "./Row/Row";
import {PackType} from "../../../../1_DAL/packs-api";
import commonClass from "../../../classes/commonTable.module.css"
import Arrow from "../../Arrow/Arrow";
import {CardType} from "../../../../1_DAL/cards-api";
import {ModalStatusesTypes} from "../../../validates/validates";
import {Fade} from '../../../animations';

type TablePropsType = {
    cards?: boolean
    collection: Array<CardType> | Array<PackType>
    setShowModal: (modal: ModalStatusesTypes) => void
    setValueId: (id: string) => void
    searchParams: string
}
const Table: React.FC<TablePropsType> = ({collection, cards, searchParams, ...restProps}) => {
    if (collection.length === 0) return <Arrow/>
    return (
        <Fade effect={"fadeInUp"}>
            <div className={commonClass.table__list}>
                {

                    collection.map(el => {
                        return (cards ?
                            <Row key={el._id}
                                 id={el._id}
                                 cards={cards}
                                 value={el.question}
                                 value2={el.answer}
                                 rating={el.rating}
                                 updated={el.updated && el.updated.slice(0, 10)}
                                 {...restProps}/>

                            : <Row key={el._id}
                                   id={el._id}
                                   cards={cards}
                                   value={el.name}
                                   value2={el.cardsCount}
                                   updated={el.updated && el.updated.slice(0, 10)}
                                   {...restProps}/>)
                    })
                }
            </div>
        </Fade>
    );
};

export default Table;