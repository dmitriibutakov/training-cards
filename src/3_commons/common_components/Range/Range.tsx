import React from 'react';
import privateClass from "./Range.module.css";
import DoublCountRange from "./DoubleCountRange/DoublCountRange";

type RangePropsType = {
    setMin: (min: number) => void
    min: number
    setMax: (max: number) => void
    max: number
    valueAll: [number, number]
    onChangeRange: (setValue: (value: number) => void, count: number) => void
}
const Range: React.FC<RangePropsType> = ({
                                             min, max, setMin, setMax,
                                             valueAll, onChangeRange
                                         }) => {
    return (
        <div className={privateClass.range}>
            <span className={privateClass.min}>{min}</span>
            <DoublCountRange setMin={setMin} setMax={setMax} valueAll={valueAll} onChangeRange={onChangeRange}/>
            <span className={privateClass.text}>min-max cards select</span>
            <span className={privateClass.max}>{max}</span>
        </div>
    );
};

export default Range;