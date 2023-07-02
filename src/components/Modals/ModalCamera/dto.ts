interface IModalCamera {
    id: number;
    id_banco: number;
    id_record: number;
    modalCameraIsOpen: boolean;
    closeModalCamera: () => void;
}

export { IModalCamera }