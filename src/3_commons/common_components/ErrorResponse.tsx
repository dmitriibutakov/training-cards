import React from 'react';
import commonClass from "../classes/commonContainer.module.css";

type ErrorResponseType = {
    errorOfResponse: string | null
}
const ErrorResponse: React.FC<ErrorResponseType> = React.memo(({errorOfResponse}) => {
    return (
        <>
            {errorOfResponse && <div className={commonClass.error}>{errorOfResponse}</div>}
        </>
    );
});

export default ErrorResponse;