import React from 'react';
import UniversalRow from "../../../../3_commons/common_components/UniversalRow/UniversalRow";
import {PackType} from "../../../../1_DAL/packs-api";

type PacksTablePropsType = {
    cardPacks: Array<PackType>
}
const PacksTable: React.FC<PacksTablePropsType> = ({cardPacks}) => {
    console.log("packs table render")
    return (
        <>
            {
                cardPacks.map(el => (
                    <UniversalRow key={el._id} name={el.name} cardsCount={el.cardsCount} updated={el.updated}/>))
            }
        </>
    );
};

export default PacksTable;