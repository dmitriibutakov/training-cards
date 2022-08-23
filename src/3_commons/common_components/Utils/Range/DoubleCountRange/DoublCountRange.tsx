import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import privateClass from "./DoubleRange.module.css"
import CountRange from "./CountRange/CountRange";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperDoubleRangePropsType = DefaultInputPropsType & {
    onChangeRange: (setValue: (value: number) => void, count: number) => void
    valueAll: [number, number]
    setMin?: (value: number) => void
    setMax?: (value: number) => void
}


const DoubleCountRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, valueAll, setMin, setMax
    }
) => {
    return (
        <div className={privateClass.body}>
            <CountRange valueAll={valueAll} setValue={setMin} position={"left"} value={valueAll[0]}
                onChange={onChangeRange} />
            <CountRange valueAll={valueAll} setValue={setMax} value={valueAll[1]} onChange={onChangeRange} />
        </div>
    )
}

export default DoubleCountRange
