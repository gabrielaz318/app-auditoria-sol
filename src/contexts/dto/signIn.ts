interface ISignIn {
    user: string;
    password: string;
}

interface ISignInReturn {
    code: number;
    title?: string;
    message?: string;
}

interface IAxiosSignIn {
    token: string;
    userInfo: {
        id: number;
        user: string;
    }
}

export { ISignIn, ISignInReturn, IAxiosSignIn }