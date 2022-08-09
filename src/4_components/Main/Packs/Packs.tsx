import React, {useEffect} from 'react';
import commonClass from "../../../3_commons/common_classes/commonTable.module.css"
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import {PackParamType} from "../../../1_DAL/packs-api";
import NotAuthorized from "./PacksTable/NotAuthorized/NotAuthorized";
import {getPacksTC} from "../../../2_BLL/packs-reducer";
import Preloader from "../../../3_commons/Preloader/Preloader";
import UniversalTitle from "../../../3_commons/common_components/UniversalTitle/UniversalTitle";
import PacksHeader from "./PacksTable/PacksUtils/PacksHeader/PacksHeader";
import PacksTable from "./PacksTable/PacksTable";


const Packs = () => {
    console.log("packs render")
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.app.userId)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isFetching = useAppSelector(state => state.auth.isFetching)

    const testPack: PackParamType = {
        packName: "english",
        min: 0,
        max: 10,
        sortPacks: 0,
        page: 1,
        pageCount: 10,
        userId: userId
    }

    useEffect(() => {
        dispatch(getPacksTC(testPack))
    }, [])

    if (!isLoggedIn) return <NotAuthorized/>
    if (isFetching) return <Preloader/>
    return (
        <div className={commonClass.table}>
            <UniversalTitle title={"Packs list"}/>
            <PacksHeader/>
            <PacksTable/>
        </div>
    );
};

export default Packs;