import React from 'react';
import privateClass from "./TableHeader.module.css"

type TableHeaderPropsType = {
    headers: [string, string, string, string]
}
const TableHeader: React.FC<TableHeaderPropsType> = ({headers}) => {
    return (
        <div className={privateClass.row}>
            {headers.map(el => {
                return <div key={el}>{el}</div>
            })}
        </div>
    );
};

export default TableHeader;