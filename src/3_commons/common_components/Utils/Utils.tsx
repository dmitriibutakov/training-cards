import React from 'react';
import commonClass from "../../classes/commonUtils.module.css"
import Input from "../Input/Input";
import Range from "../Range/Range";
import Button from "../Button/Button";
import {ModalStatusesTypes} from "../../validates/validates";

type PacksUtilsPropsType = {
    cards?: boolean
    min: number
    max: number
    setMin: (c: number) => void
    setMax: (c: number) => void
    setShowModal: (modal: ModalStatusesTypes) => void

}
const Utils: React.FC<PacksUtilsPropsType> = ({
                                                  setShowModal,
                                                  min,
                                                  max,
                                                  setMin,
                                                  setMax, cards,
                                              }) => {
    const valueAll: [number, number] = [min, max]
    const onChangeRange = (setValue: (value: number) => void, count: number) => {
        setValue(count)
    }
    const rangeProps = {setMax, setMin, max, min, valueAll, onChangeRange}
    return (
        <div className={commonClass.utils}>
            <Input value={""} onChange={()=>{}} searchParams={"searchParams"}/>
            <Range {...rangeProps} />
            <Button onClicked={() => setShowModal("add")} text={cards ? "add card" : "add pack"}/>
        </div>
    );
};

export default Utils;