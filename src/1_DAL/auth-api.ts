import {instanceHeroku} from "./instance";

export const authApi = {
    me: () => (instanceHeroku.post<ResponseDataProfileType>("auth/me")),
    signIn: (data: LoginParamsType) =>
        instanceHeroku.post<ResponseDataProfileType>("/auth/login", {...data}),
    logOut: () => instanceHeroku.delete<{ info: string; error: string }>("/auth/me"),
    editProfile: (name: string) =>
        instanceHeroku.put<{ updatedUser: ResponseDataProfileType }>("/auth/me", {name}),
    resetPassword: (email: string) =>
        instanceHeroku.post<{ info: string; error: string }>
        ('/auth/forgot', {
            email, from: `test-front-admin <dmitryload@yahoo.com>`,
            message: `<div style='background-color: #ceeeff; border-radius: 10px; padding: 15px'>
                          password recovery link: <a href='https://training-cards.herokuapp.com/set-new-password/$token$'>link</a>
                      </div>`
        }),
    signUp: (email: string, password: string) =>
        instanceHeroku.post<{ addedUser: ResponseDataProfileType }>("/auth/register", {email, password}),
    setNewPassword: (password: string, resetPasswordToken: string) =>
        (instanceHeroku.post<{ info: string; error: string }>(`auth/set-new-password`, {password, resetPasswordToken}
        )),
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