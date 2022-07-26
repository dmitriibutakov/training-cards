import axios from "axios"

//process.env.REACT_APP_BACK_URL |
export const instance = axios.create({
    baseURL:  'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const AuthAPI = {
    signIn(data:LoginParamsType){
        return instance.post<any>("auth/login",data)
    },
    logOut() {

    },
    passwordReset(){

    },
    signUp: (email: string, password: string) => instance.post('/auth/register', {email, password})
}

export type LoginParamsType ={
    email: string
    password:string
    rememberMe:boolean
