import React from 'react';
import Row from "./Row/Row";
import {PackType} from "../../../1_DAL/packs-api";
import TableHeader from "./TableHeader";
import Arrow from "../../../4_components/Main/Packs/PacksUtils/Arrow/Arrow";

type TablePropsType = {
    cards?: boolean
    collection: Array<PackType>
    deleteCallback: (id: string) => void
    editCallback: (id: string, name: string) => void
    headers: [string, string, string, string]
}
const Table: React.FC<TablePropsType> = ({collection, cards, headers, ...calbacks}) => {
    return (
        <>
            <TableHeader headers={headers}/>
            {collection.length !== 0 ?
                collection.map(el => (
                    <Row key={el._id}
                         id={el._id}
                         cards={cards}
                         {...calbacks}
                         name={el.name}
                         cardsCount={el.cardsCount}
                         updated={el.updated && el.updated.slice(0, 10)}/>)) : <Arrow/>
            }
        </>
    );
};

export default Table;