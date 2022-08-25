import {numberInit, stringInit, undefinedRandomCard} from "../3_commons/init-variables";
import {CardType, GetCardsResponseType, UpdatedGradeType} from "../1_DAL/cards-api";
import {
    cardsReducer,
    CardsReducerType,
    setCardsCollection,
    setChangeGradeCards,
    setPackUserId,
    setRandomCard
} from "../2_BLL/cards-reducer";

const fooTest = (actionCreator: CardsReducerType) => {
    return cardsReducer(initialState, actionCreator);
}

const initialState: GetCardsResponseType = {
    cards: [],
    cardsTotalCount: numberInit,
    page: 1,
    pageCount: 4,
    maxGrade: numberInit,
    minGrade: numberInit,
    packUserId: stringInit,
    randomCard: undefinedRandomCard,
    loadingModal: false
};

const fakeCard:CardType = {
    answer: stringInit,
    question: stringInit,
    cardsPack_id: stringInit,
    grade: 3,
    shots: numberInit,
    rating: numberInit,
    created: stringInit,
    updated: stringInit,
    _id: "1"
}

test("cards pack should be updated", ()=> {
const initialCards:CardType[] = [...initialState.cards, fakeCard]
    const updatedCard:UpdatedGradeType = {
        _id: "1",
        grade: 2,
        shots: 5
    }
    expect(initialCards[0].grade).toBe(3)
    expect(initialCards[0].grade).not.toBe(numberInit)
    expect (fooTest(setChangeGradeCards(updatedCard)).cards).toBe(2)
})
test("grade card should be changed in current card", ()=> {
    expect(initialState.cards).toHaveLength(0)
    expect (fooTest(setCardsCollection([fakeCard])).cards[0]._id).toEqual("1")
})
test("undefined card should be changed", () => {
    expect(initialState.randomCard._id).toBe(stringInit)
    expect (fooTest(setRandomCard(fakeCard)).randomCard._id).toEqual("1")
})
test("pack user-id should be updated", () => {
    expect(initialState.packUserId).toEqual(stringInit)
    expect (fooTest(setPackUserId("1")).packUserId).toEqual("1")
})