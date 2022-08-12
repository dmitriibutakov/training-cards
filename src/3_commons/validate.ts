export type ErrorFormikType = {
    password?: string, repeatPassword?: string, email?: string,
}

// export const validatePassword = (values: {password: string, repeatPassword: string }, errors: ErrorFormikType) => {
//     if (!values.email) {
//         errors.email = 'email is required';
//     } else if (!/^[A-Z/d._%+-]+@[A-Z/d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Invalid email address';
//     }
//     if (!values.password) {
//         errors.password = "password is required"
//     } else if (!values.repeatPassword) {
//         errors.repeatPassword = "password is required"
//     } else if (values.password.length < 8) {
//         errors.password = "min length 8 symbols"
//     } else if (values.repeatPassword.length < 8) {
//         errors.repeatPassword = "min length 8 symbols"
//     } else if (values.repeatPassword !== values.password) {
//         errors.repeatPassword = "confirm your password currently"
//     }
//     return errors
// }
