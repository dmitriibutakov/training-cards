import React from 'react';
import privateClass from "./UniversalPaginator.module.css"

type UniversalPaginatorPropsType = {
    quantityValue: number
    onClickPage: (e: number) => void
    page: number
}
const UniversalPaginator: React.FC<UniversalPaginatorPropsType> = ({quantityValue, onClickPage, page}) => {
    let arrValue: Array<number> = []
    for (let i = 1; i <= quantityValue; i++) {
        arrValue.push(i)
    }

    return (
        <div className={privateClass.paginator}>
            {arrValue.map(el => {
                if (el < 14) {
                    return <span key={el}
                                 onClick={() => {
                                     onClickPage(el)
                                 }}
                                 className={page === el ? privateClass.currentPage : ''}>{el}</span>
                }
            })}
        </div>
    );
};

export default UniversalPaginator;