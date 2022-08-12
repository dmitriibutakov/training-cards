import React from 'react';
import privateClass from "./CardsUtils.module.css"
import Input from "../../../../3_commons/common_components/Input/Input";

type CardsUtilsPropsType = {
    addCard: (title: string, error?: string) => void
    inputError: string | null
}
const CardsUtils: React.FC<CardsUtilsPropsType> = ({addCard, inputError}) => {
    return (
        <div className={privateClass.utils}>
            <Input error={inputError} textError={inputError} onButtonClickHandler={addCard} type={"text"}
                   placeholder={"create new card"}/>
        </div>
    );
};

export default CardsUtils;