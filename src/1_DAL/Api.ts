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
    me: () => {
        return instanceHeroku.post<ResponseDataProfileType>("auth/me");
    },
    signIn: (data: LoginParamsType) =>
        instanceHeroku.post<LoginParamsType, AxiosResponse<ResponseDataProfileType>>
        ("/auth/login", {...data}),
    logOut: () =>
        instanceHeroku.delete<AxiosResponse<ResponseDataProfileType>>
        ("/auth/me"),

    editProfile: (name: string) =>
        instanceHeroku.put<string, AxiosResponse<ResponseEditProfile>>
        ("/auth/me", {name}),

    resetPassword: (email: string) =>
        instanceHeroku.post<{ info: string; error: string }>
        ('/auth/forgot', {
            email, from: `test-front-admin <hvi17@yandex.ru>`,
            message: `<div style='background-color: #ceeeff; border-radius: 10px; padding: 15px'>
                          password recovery link: <a href='https://training-cards.herokuapp.com/set-new-password/$token$'>link</a>
                      </div>`,
        }),

    signUp: (email: string, password: string) =>
        instanceHeroku.post<LoginParamsType,
            AxiosResponse<ResponseSignUpType<ResponseDataProfileType>>>
        ("/auth/register", {email, password}),

    setNewPassword: (password: string, resetPasswordToken: string) => {
        return instanceHeroku.post<{ info: string; error: string },
            AxiosResponse<ResponseResetPasswordType>>(`auth/set-new-password`, {
            password,
            resetPasswordToken,
        });
    },
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type ResponseDataProfileType = {
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
    updatedUser: ResponseDataProfileType
}