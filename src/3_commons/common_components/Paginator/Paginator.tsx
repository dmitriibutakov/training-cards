import React from 'react';
import privateClass from "./Paginator.module.css"

type PaginatorPropsType = {
    quantityValue: number
    onClickPage: (e: number) => void
    page: number
}
const Paginator: React.FC<PaginatorPropsType> = ({quantityValue, onClickPage, page}) => {
    let arrValue: Array<number> = []
    for (let i = 0; i <= quantityValue; i++) {
        arrValue.push(i + 1)
    }

    return (
        <div className={privateClass.paginator}>
            {arrValue.map(el => {
                return <span key={el}
                             onClick={() => onClickPage(el)}
                             className={page === el ? privateClass.currentPage : ''}>{el}</span>
            })}
        </div>
    );
};

export default Paginator;