import React, {ChangeEvent} from 'react';
import privateClass from "../DoubleRange.module.css";

type CountRangePropsType = {
    setValue: (num: number) => void
    value: number
    onChange: (setValue:(value:number)=>void, count:number) => void
    position?: "left"
    valueAll: [number, number]
}
const CountRange:React.FC<CountRangePropsType> = ({value, onChange, position, valueAll, setValue}) => {
    const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
        value = +e.currentTarget.value
        return onChange && onChange(setValue, value)
    }
    return (
        <input type={'range'}
               value={value}
               onChange={onChangeCount}
               className={`${privateClass.slider} ${position === "left" ? privateClass.min : privateClass.max}`}
               min={0}
               max={100}/>

    );
};

export default CountRange;