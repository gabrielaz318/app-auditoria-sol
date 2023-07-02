interface IInput {
    passwordInput: string;
    setPasswordInput: (oldState: string) => void;
    isLoading: boolean;
    onSubmitHandler: () => void;
}

export { IInput }