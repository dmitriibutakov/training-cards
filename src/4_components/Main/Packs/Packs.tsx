import React, {useCallback, useEffect, useState} from 'react';
import commonClass from "../../../3_commons/common_classes/commonTable.module.css"
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import {addPackTC, getPacksTC} from "../../../2_BLL/packs-reducer";
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import PacksHeader from "./PacksHeader/PacksHeader";
import PacksTable from "./PacksTable/PacksTable";
import Preloader from "../../../3_commons/Preloader/Preloader";


const Packs = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isFetching = useAppSelector(state => state.app.isFetching)
    const packs = useAppSelector(state => state.packs.cardPacks)

    const [inputError, setInputError] = useState<string | null>("")
    const addPack = useCallback(function (title: string) {
        if (title.length < 1 || title.length > 10) {
            setInputError("value must be more 1 or less 10 symbols")
        } else {
            setInputError(null)
            dispatch(addPackTC(title))
        }
    }, [])

    useEffect(() => {
        dispatch(getPacksTC())
    }, [])

    if (!isLoggedIn) return <NotAuthorized/>
    if (isFetching) return <Preloader/>
    return (
        <div className={commonClass.table}>
            <UniversalTitle title={"Training packs"}/>
            <PacksHeader inputError={inputError} addPack={addPack}/>
            <PacksTable cardPacks={packs}/>
        </div>
    );
};

export default Packs;