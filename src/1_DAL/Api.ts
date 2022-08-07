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
    logOut: () =>
        instanceHeroku.delete<AxiosResponse<ResponseDataType>>
        ("/auth/me"),
    editProfile: (name: string) =>
        instanceHeroku.put<string, AxiosResponse<ResponseEditProfile>>
        ("/auth/me", {name}),
    resetPassword: (email: string) =>
        instanceHeroku.post<{ info: string; error: string }>
        ('/auth/forgot', {email, from: `test-front-admin <hvi17@yandex.ru>`,
                message: `<div style='background-color: #ceeeff; border-radius: 10px; padding: 15px'>
                          password recovery link: <a href='http://localhost:3000/#/password_recovery/$token$'>link</a>
                      </div>`,
            }),
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
    from: string
    message: string
}

export type ResponseDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: string;
    updated?: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
    info?: string
}
type ResponseSignUpType<T = {}> = {
    addedUser: T
}
type ResponseResetPasswordType = {
    info: string
    error?: string
}
type ResponseEditProfile = {
    token: string
    tokenDeathTime: number
    updatedUser: ResponseDataType
}