import React, {useState} from 'react';
import commonClass from "../../../3_commons/common_classes/commonUtils.module.css"
import Input from "../../../3_commons/common_components/Input/Input";
import Range from "../../../3_commons/common_components/Range/Range";

type PacksUtilsPropsType = {
    addPack: (title: string, error?: string) => void
    inputError: string | null
}
const PacksUtils: React.FC<PacksUtilsPropsType> = ({addPack, inputError}) => {

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)
    const valueAll: [number, number] = [min, max]
    const onChangeRange = (setValue: (value: number) => void, count: number) => {
        setValue(count)
    }
    const rangeProps = {setMin, setMax, max, min, valueAll, onChangeRange}
    return (
        <div className={commonClass.utils}>
            <Input searchParams={"searchParams"}/>
            <Range {...rangeProps}/>
            <Input error={inputError} textError={inputError} onButtonClickHandler={addPack} type={"text"}
                   placeholder={"create new pack"}/>
        </div>
    );
};

export default PacksUtils;