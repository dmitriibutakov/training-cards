import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import {addPackTC, deletePackTC, editPackTC, getPacksTC, setPagePacks} from "../../../2_BLL/packs-reducer";
import Preloader from "../../../3_commons/Preloader/Preloader";
import {ValidateTable} from "../../../3_commons/common_components/ValidateTable/ValidateTable";
import {getCardsTC} from "../../../2_BLL/cards-reducer";

const Packs = () => {
    const dispatch = useAppDispatch()
    const {cardPacksTotalCount} = useAppSelector(state => state.packs)
    const {isFetching} = useAppSelector(state => state.app)
    const {isLoggedIn} = useAppSelector(state => state.auth)
    const {pageCount} = useAppSelector(state => state.packs)
    const {cardPacks} = useAppSelector(state => state.packs)
    const {page} = useAppSelector(state => state.packs)
    const {errorOfResponse} = useAppSelector(state => state.app)

    const setPageHandler = (page: number) => {
        dispatch(setPagePacks(page))
    }
    useEffect(() => {
        isLoggedIn && dispatch(getPacksTC());
    }, [isLoggedIn, page])

    if (!isLoggedIn) return <NotAuthorized/>
    if (isFetching) return <Preloader/>
    return (
        <ValidateTable
            headers={["Name", "Quantity cards", "Last update", "Actions"]}
            page={page}
            title={"My packs collections"}
            setPageCallback={setPageHandler}
            addThunk={addPackTC}
            deleteThunk={deletePackTC}
            editThunk={editPackTC}
            getThunk={getCardsTC}
            collection={cardPacks}
            quantityValue={cardPacksTotalCount / pageCount}
            errorOfResponse={errorOfResponse}/>
    );
};

export default Packs;