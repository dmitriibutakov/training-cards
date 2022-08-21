import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import Preloader from "../../../3_commons/common_components/Preloader/Preloader";
import {addCardTC, deleteCardTC, editCardTC, getCardsTC, setPageCards} from "../../../2_BLL/cards-reducer";
import {ValidateTable} from "../../../3_commons/common_components/ValidateTable/ValidateTable";
import {useParams} from "react-router-dom";

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
    }, [page, cardsPack_id, dispatch])

    if (!isLoggedIn) return <NotAuthorized/>
    if (isFetching) return <Preloader/>
    return (
        <ValidateTable
            title={"Cards"}
            headers={["Question", "Answer", "Last update", "Actions"]}
            cards={true}
            collection={cards}
            errorOfResponse={errorOfResponse}
            addThunk={addCardTC}
            deleteThunk={deleteCardTC}
            editThunk={editCardTC}
            setPageCallback={setPageHandler}
            page={page}
            quantityValue={cardsTotalCount}
            min={0}
            pageCount={pageCount}
            max={100}
            setMax={() => {
            }}
            setMin={() => {
            }}
        />
    );
};

export default Cards;