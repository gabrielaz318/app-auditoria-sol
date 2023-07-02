import { ReactNode } from "react";

interface IModalPicker {
    children: ReactNode;
    closeModalPicker: () => void;
    ModalPickerIsOpen: boolean;
}

interface IInput {
    isMultiline: boolean;
}

interface IInputDescription {
    marginTop: string;
}

interface IButtonRegister {
    isLoading: boolean;
}

export { IModalPicker, IInput, IInputDescription, IButtonRegister }