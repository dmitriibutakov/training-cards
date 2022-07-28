import axios, {AxiosResponse} from "axios"


export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    withCredentials: true,
})
export const instanceHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})
export const AuthAPI = {
    signIn: (data: LoginParamsType) =>
        instanceHeroku.post<LoginParamsType, AxiosResponse<ResponseDataType>>
        ("/auth/login", {...data}),
    logOut: () => {
    },
    resetPassword: (email: string,
                    from: "dmitryload@yahoo.com",
                    message: `<div style="background-color: lime; padding: 15px">password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a></div>`) =>
        instanceHeroku.post<ResetPasswordParamsType, AxiosResponse<ResponseResetPasswordType>>
        (" /auth/forgot", {email, from, message}),
    signUp: (email: string, password: string) =>
        instanceHeroku.post<LoginParamsType, AxiosResponse<ResponseSignUpType<ResponseDataType>>>
        ("/auth/register", {email, password})
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

type ResetPasswordParamsType = {
    email: string
    from: "dmitryload@yahoo.com"
    message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a>
</div>`
}

type ResponseDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
type ResponseSignUpType<T = {}> = {
    addedUser: T
}
type ResponseResetPasswordType = {
    info: string
    error?: string
}