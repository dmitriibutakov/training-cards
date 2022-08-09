import React from 'react';
import UniversalRow from "../../../../3_commons/common_components/UniversalRow/UniversalRow";
import {useAppSelector} from "../../../../2_BLL/store";

type PacksTablePropsType = {
}
const PacksTable:React.FC<PacksTablePropsType> = () => {
    const cardPacks = useAppSelector(state => state.packs.cardPacks)
    console.log("packs table render")
    return (
        <>{cardPacks.map(el => (<UniversalRow key={el._id} name={el.name} cardsCount={el.cardsCount} updated={el.updated}/>))}</>
    );
};

export default PacksTable;