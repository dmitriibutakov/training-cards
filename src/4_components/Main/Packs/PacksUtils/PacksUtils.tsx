import React, {useState} from 'react';
import privateClass from "./PacksUtils.module.css"
import UniversalInput from "../../../../3_commons/common_components/UniversalInput/UniversalInput";
import DoubleRange from "./DoubleRange/DoubleRange";

type PacksUtilsPropsType = {
    addPack: (title: string, error?: string) => void
    inputError: string | null
}
const PacksUtils: React.FC<PacksUtilsPropsType> = ({addPack, inputError}) => {
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)

    const valueAll: [number, number] = [min, max]

    const onChangeRange = (setValue:(value:number)=>void, count:number) => {
        setValue(count)
    }

    return (
        <div className={privateClass.utils}>
            <div>
                <span>{min}</span>
                <DoubleRange setMin={setMin} setMax={setMax} valueAll={valueAll} onChangeRange={onChangeRange}/>
                <span>{max}</span>
            </div>
            <UniversalInput error={inputError} textError={inputError} onButtonClickHandler={addPack} type={"text"}
                            placeholder={"create new pack"}/>
        </div>
    );
};

export default PacksUtils;