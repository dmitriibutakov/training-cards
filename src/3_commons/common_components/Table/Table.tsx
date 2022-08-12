import React from 'react';
import Row from "./Row/Row";
import {PackType} from "../../../1_DAL/packs-api";
import TableHeader from "./TableHeader";
import Arrow from "../../../4_components/Main/Packs/PacksUtils/Arrow/Arrow";
import {CardType} from "../../../1_DAL/cards-api";

type TablePropsType = {
    cards?: boolean
    collection: Array<PackType> | Array<CardType>
    headers: [string, string, string, string]
    deleteCallback: (id: string) => void
    editCallback: (id: string, newTitle: string) => void
    getCallback?: (id: string) => void
}
const Table: React.FC<TablePropsType> = ({collection, cards, headers, ...calbacks}) => {
    if (collection.length === 0) return <Arrow/>
    return (
        <>
            <TableHeader headers={headers}/>
            {
                collection.map(el => {
                    console.log(el)
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
        </>
    );
};

export default Table;