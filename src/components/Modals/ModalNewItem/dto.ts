interface IModalItem {
    id_record: number;
    id_record_banco: number;
    newModalIsOpen: boolean;
    closeNewItemModal: () => void;
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

export { IModalItem, IInput, IInputDescription, IButtonRegister }