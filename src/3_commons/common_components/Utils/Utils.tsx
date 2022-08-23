import React, {ChangeEvent} from 'react';
import commonClass from "../../classes/commonUtils.module.css"
import Input from "../Input/Input";
import Range from "./Range/Range";
import Button from "../Button/Button";
import {ModalStatusesTypes} from "../../validates/validates";

type PacksUtilsPropsType = {
    isCards?: boolean
    min?: number
    max?: number
    setMin?: (count: number) => void
    setMax?: (count: number) => void
    setShowModal: (modal: ModalStatusesTypes) => void
    searchParams: string
    setSearchParams: (params: string) => void
}
const Utils: React.FC<PacksUtilsPropsType> = ({
                                                  setShowModal,
                                                  min,
                                                  max,
                                                  setMin,
                                                  setMax, isCards,
    setSearchParams, searchParams
                                              }) => {
    const valueAll: [number, number] = [min || 0, max || 100]

    const onChangeRange = (setValue: (value: number) => void, count: number) => {
        setValue(count)
    }
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchParams(e.currentTarget.value)
    }
    const rangeProps = {setMax, setMin, max, min, valueAll, onChangeRange}
    return (
        <div className={commonClass.utils}>
            <Input value={searchParams} onChange={onChangeInput} searchParams={true}/>
            {!isCards && <Range {...rangeProps} />}
            <Button onClicked={() => setShowModal("add")} text={isCards ? "add card" : "add pack"}/>
        </div>
    );
};

export default Utils;