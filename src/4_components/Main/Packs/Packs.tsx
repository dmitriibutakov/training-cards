import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import {
    addPackTC, deletePackTC, editPackTC,
    getPacksTC, setMaxCardsCount, setMinCardsCount, setPagePacks
} from "../../../2_BLL/packs-reducer";
import {getCardsTC} from "../../../2_BLL/cards-reducer";
import {useDebounce} from '../../../3_commons/hooks/useDebounse';
import {ValidateTable} from "../../../3_commons/common_components/ValidateTable/ValidateTable";
import {PackType} from "../../../1_DAL/packs-api";

const Packs = () => {
    const dispatch = useAppDispatch()
    const {cardPacksTotalCount} = useAppSelector(state => state.packs)
    const {minCardsCount} = useAppSelector(state => state.packs)
    const {maxCardsCount} = useAppSelector(state => state.packs)
    const {isLoggedIn} = useAppSelector(state => state.auth)
    const {pageCount} = useAppSelector(state => state.packs)
    const {cardPacks} = useAppSelector(state => state.packs)
    const {page} = useAppSelector(state => state.packs)
    const {errorOfResponse} = useAppSelector(state => state.app)

    const [packId, setPackId] = useState("")
    const [searchTitle, setSearchTitle] = useState("")
    const searchDelayMin = useDebounce(minCardsCount, 500)
    const searchDelayMax = useDebounce(maxCardsCount, 500)
    const searchDelayByName = useDebounce(searchTitle, 500)

    const validateBySearchParams = cardPacks.filter((el: PackType) =>
        el.name.toLowerCase().includes(searchDelayByName))

    const setMaxCallback = (count: number) => {
        dispatch(setMaxCardsCount(count))
    }
    const setMinCallback = (count: number) => {
        dispatch(setMinCardsCount(count))
    }

    const setPageHandler = (page: number) => {
        dispatch(setPagePacks(page))
    }
    useEffect(() => {
        isLoggedIn && dispatch(getPacksTC())
    }, [isLoggedIn, page, searchDelayMin, searchDelayMax, dispatch])

    if (!isLoggedIn) return <NotAuthorized/>
    return (

        <ValidateTable
            searchParams={searchTitle}
            setSearchParams={setSearchTitle}
            valueId={packId}
            setValueId={setPackId}
            setMax={setMaxCallback}
            setMin={setMinCallback}
            min={minCardsCount}
            max={maxCardsCount}
            headers={["Name", "Quantity cards", "Last update", "Actions"]}
            page={page}
            title={"My packs collections"}
            setPageCallback={setPageHandler}
            addThunk={addPackTC}
            deleteThunk={deletePackTC}
            editThunk={editPackTC}
            getThunk={getCardsTC}
            collection={validateBySearchParams}
            pageCount={pageCount}
            quantityValue={cardPacksTotalCount}
            errorOfResponse={errorOfResponse}/>
    );
};

export default Packs;