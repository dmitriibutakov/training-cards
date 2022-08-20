import React from 'react';
import commonClass from "../../../3_commons/classes/commonUtils.module.css"
import Input from "../../../3_commons/common_components/Input/Input";

type CardsUtilsPropsType = {
    addCard: (title: string, error?: string) => void
    inputError: string | null
}
const CardsUtils: React.FC<CardsUtilsPropsType> = ({addCard, inputError}) => {
    return (
        <div className={commonClass.utils}>
            <Input searchParams={"searchParams"}/>
            <Input error={inputError}
                   textError={inputError}
                   onButtonClickHandler={addCard} type={"text"}
                   placeholder={"create new card"}/>
        </div>
    );
};

export default CardsUtils;