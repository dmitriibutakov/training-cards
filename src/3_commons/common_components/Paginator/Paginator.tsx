import React, {useState} from 'react';
import privateClass from "./Paginator.module.css";
import {images} from "../../images/commonImages";

type UsersPaginatorType = {
    quantityValue: number
    pageSize: number
    onClickCallback: (n: number) => void
    currentPage: number
    portionSize: number
}
const UsersPaginator: React.FC<UsersPaginatorType> = ({
                                                          quantityValue, pageSize,
                                                          onClickCallback,
                                                          currentPage, portionSize
                                                      }) => {
    const pagesCount = Math.ceil(quantityValue / pageSize)
    const pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(currentPage)
    const leftPortionNumber = currentPage < 3 ? 1 : portionNumber - 2
    const rightPortionNumber = currentPage < 3 ? 5:  portionNumber + 2

    return (
        <div className={privateClass.paginator__body}>
            <button className={privateClass.paginator__btn_left} disabled={portionNumber <= 1}
                    onClick={() => setPortionNumber(portionNumber - 1)}>
                <img src={images.previousImg} alt="previous"/>
            </button>
            <div className={privateClass.paginator}>
                {pages.filter(e => e >= leftPortionNumber && e <= rightPortionNumber).map(e => {
                    return <span key={Math.random()} onClick={() => {
                        onClickCallback(e)
                    }}
                                 className={currentPage === e ? privateClass.selectedPage : ""}>{e}</span>
                })}
                <button className={privateClass.paginator__btn_right} disabled={portionCount < portionNumber}
                        onClick={() => setPortionNumber(portionNumber + 1)}>
                    <img src={images.nextImg} alt="next"/>
                </button>
            </div>
        </div>)
}

export default UsersPaginator;