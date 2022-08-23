import React from 'react';
import privateClass from "./TableHeader.module.css"

type TableHeaderPropsType = {
    headers: string[]
    isCards?: boolean
}
const TableHeader: React.FC<TableHeaderPropsType> = ({headers, isCards}) => {
    const validateStyles = isCards ? privateClass.row__cards : privateClass.row__packs
    return (
        <div className={validateStyles}>
            {headers.map(el => {
                return <div key={el}>{el}</div>
            })}
        </div>
    );
};

export default TableHeader;