import React from 'react';
import privateClass from "../../Modals.module.css";
import Button from "../../../../Button/Button";

type DeleteModalPropsType = {
    deleteCallback: (valueId: string) => void
    valueId: string
}
const DeleteModal:React.FC<DeleteModalPropsType> = ({deleteCallback, valueId}) => {
    const deleteHandler = () => deleteCallback(valueId)
    return (
        <>
            <p className={privateClass.modal__description}>
                Are you sure that you want to delete?
            </p>
            <Button onClicked={deleteHandler} text={"delete"}/>
        </>
    );
};

export default DeleteModal;