import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../2_BLL/store";
import NotAuthorized from "../NotAuthorized/NotAuthorized";
import {addCardTC, deleteCardTC, editCardTC, getCardsTC, setPageCards} from "../../../2_BLL/cards-reducer";
import {useParams} from "react-router-dom";
import {ValidateTable} from "../../../3_commons/common_components/ValidateTable/ValidateTable";
import {useDebounce} from "../../../3_commons/hooks/useDebounse";
import {CardType} from "../../../1_DAL/cards-api";


const Cards = () => {
    const dispatch = useAppDispatch()
    const {cardsPack_id} = useParams();

    const {isLoggedIn} = useAppSelector(state => state.auth)
    const {pageCount} = useAppSelector(state => state.cards)
    const {cardsTotalCount} = useAppSelector(state => state.cards)
    const {cards} = useAppSelector(state => state.cards)
    const {page} = useAppSelector(state => state.cards)
    const {errorOfResponse} = useAppSelector(state => state.app)

    const [cardId, setCardId] = useState("")
    const [searchTitle, setSearchTitle] = useState("")
    const searchDelayByName = useDebounce(searchTitle, 500)

    const validateBySearchParams = cards.filter((el: CardType) =>
        el.question.toLowerCase().includes(searchDelayByName))

    const setPageHandler = (page: number) => {
        dispatch(setPageCards(page))
    }

    useEffect(() => {
        cardsPack_id && dispatch(getCardsTC(cardsPack_id))
    }, [page, cardsPack_id, dispatch])

    if (!isLoggedIn) return <NotAuthorized/>

    return (
        <ValidateTable
            searchParams={searchTitle}
            setSearchParams={setSearchTitle}
            valueId={cardId}
            setValueId={setCardId}
            title={`cards`}
            headers={["Question", "Answer", "Shots", "Rating", "Actions"]}
            isCards={true}
            collection={validateBySearchParams}
            errorOfResponse={errorOfResponse}
            addThunk={addCardTC}
            deleteThunk={deleteCardTC}
            editThunk={editCardTC}
            setPageCallback={setPageHandler}
            page={page}
            quantityValue={cardsTotalCount}
            pageCount={pageCount}
        />
    );
};

export default Cards;