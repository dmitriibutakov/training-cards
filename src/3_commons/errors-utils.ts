import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setAppError, SetAppErrorActionType} from "../2_BLL/app-reducer";

export const errorUtils = (e: Error | AxiosError<{error: string}>, dispatch: Dispatch<SetAppErrorActionType>) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppError(error))
    } else {
        dispatch(setAppError(`Native error ${err.message}`))
    }
}

