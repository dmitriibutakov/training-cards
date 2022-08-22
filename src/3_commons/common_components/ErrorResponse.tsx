import React from 'react';
import {Fade} from '../animations';
import commonClass from "../classes/commonContainer.module.css";

type ErrorResponseType = {
    errorOfResponse: string | null
}
const ErrorResponse: React.FC<ErrorResponseType> = React.memo(({errorOfResponse}) => {
    return (
        <>

            {errorOfResponse && <div className={commonClass.error}>
                    <Fade effect={"fadeInUp"}>{errorOfResponse}
                    </Fade>
            </div>}

        </>
    );
});

export default ErrorResponse;