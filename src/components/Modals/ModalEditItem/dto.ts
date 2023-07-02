interface IModalEditItem {
    closeModalEditItem: () => void;
    modalEditItemIsOpen: boolean;
    infoEdit: {
        id: number;
        comment: string;
        id_record: number;
        id_banco: number;
    }
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

export { IModalEditItem, IInput, IInputDescription, IButtonRegister }