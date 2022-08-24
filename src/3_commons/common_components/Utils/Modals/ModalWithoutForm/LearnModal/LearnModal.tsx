import React, {useState} from 'react';
import privateClass from "../../Modals.module.css"
import Button from "../../../../Button/Button";
import {useAppDispatch, useAppSelector} from "../../../../../../2_BLL/store";
import {getRandomCardTC, gradeCardTC} from "../../../../../../2_BLL/cards-reducer";
import {Fade} from '../../../../../animations';
import Loader from "../../../../Loader/Loader";
import StarRating from "../../../../StarRating/StarRating";

const LearnModal = () => {
    const [rate, setRate] = useState(0)
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const {randomCard} = useAppSelector(state => state.cards)
    const {loadingModal} = useAppSelector(state => state.cards)
    const dispatch = useAppDispatch()
    const onNext = async () => {
        await dispatch(getRandomCardTC())
        setShowAnswer(false);
    }

    return (
        <>
            {loadingModal && <Loader/>}
            <Fade delay={100} effect={"fadeInUp"}>
                <p style={{fontWeight: 700}}>{randomCard.question}</p></Fade>
            {showAnswer &&
                <Fade delay={300} effect={"fadeInUp"}><p className={privateClass.answer}>{randomCard.answer}</p>
                    <p className={privateClass.rate__text}>rate yourself</p>
                    <StarRating edit={true} value={rate} size={20} onClick={(rate) => {
                        setRate(rate)
                        dispatch(gradeCardTC(rate))
                    }}/>

                </Fade>}
            <Fade delay={500} effect={"fadeInUp"}><Button disabled={loadingModal || showAnswer} text={"Show answer"}
                                                          onClicked={() => setShowAnswer(true)}/>
                <Button disabled={loadingModal} text={"Next question"} onClicked={onNext}/></Fade>
        </>

    );
};

export default LearnModal;