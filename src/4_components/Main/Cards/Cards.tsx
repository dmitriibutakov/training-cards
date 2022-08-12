import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import Preloader from "../../../3_commons/Preloader/Preloader";
import {addCardTC, deleteCardTC, editCardTC, getCardsTC, setPageCards} from "../../../2_BLL/cards-reducer";
import {ValidateTable} from "../../../3_commons/common_components/ValidateTable/ValidateTable";
import {Navigate, useParams} from "react-router-dom";
import {PATH} from "../../../3_commons/Path";

const Cards = () => {
    const dispatch = useAppDispatch()
    const {cardsPack_id} = useParams();
    const {isFetching} = useAppSelector(state => state.app)
    const {isLoggedIn} = useAppSelector(state => state.auth)
    const {pageCount} = useAppSelector(state => state.cards)
    const {cardsTotalCount} = useAppSelector(state => state.cards)
    const {cards} = useAppSelector(state => state.cards)
    const {page} = useAppSelector(state => state.cards)
    const {errorOfResponse} = useAppSelector(state => state.app)

    const setPageHandler = (page: number) => {
        dispatch(setPageCards(page))
    }
    useEffect(() => {
        cardsPack_id && dispatch(getCardsTC(cardsPack_id))
    }, [page, cardsPack_id])

    if (!isLoggedIn) return <NotAuthorized/>
    if (isFetching) return <Preloader/>
    return (
        <ValidateTable title={"Cards"}
                       headers={["Question", "Answer", "Last update", "Actions"]}
                       cards={true}
                       collection={cards}
                       errorOfResponse={errorOfResponse}
                       page={page}
                       quantityValue={cardsTotalCount / pageCount}
                       addThunk={addCardTC}
                       deleteThunk={deleteCardTC}
                       editThunk={editCardTC}
                       setPageCallback={setPageHandler}
        />
    );
};

export default Cards;