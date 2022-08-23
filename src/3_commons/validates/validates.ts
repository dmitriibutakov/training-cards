export type ErrorFormikType = { password?: string, repeatPassword?: string, email?: string, value?: string, description?: string }
export type ModalStatusesTypes = "add" | "delete" | "edit" | "learn" | "hidden"
export type CallbacksTypes = {
    addCallback: (value: string, description?: string) => void
    deleteCallback: (valueId: string) => void
    editCallback: (id: string, value: string, comments?: string) => void
}

export const validateTitle = (isCards: boolean, isShowModal: ModalStatusesTypes) => {
    if (isCards) {
        switch (isShowModal) {
            case "add":
                return "Add Card"
            case "delete" :
                return "Delete Card"
            case "edit":
                return "Edit Card"
            default :
                return "undefined"
        }
    } else {
        switch (isShowModal) {
            case "add" :
                return "Add Pack"
            case "delete" :
                return "Delete Pack"
            case "edit" :
                return "Edit Pack"
            default :
                return "undefined"
        }
    }
}
export const validateCallbacks = (value: string,
                                  valueId: string,
                                  description: string,
                                  addCallBack: (value: string, description?: string) => void,
                                  deleteCallback: (valueId: string) => void,
                                  editCallback: (id: string, value: string, comments?: string) => void,
                                  isCards: boolean,
                                  isShowModal: ModalStatusesTypes) => {
    if (isCards) {
        switch (isShowModal) {
            case "add":
                return addCallBack(value, description)
            case "delete":
                return deleteCallback(valueId)
            case "edit":
                return editCallback(valueId, value, description)
            default: return
        }
    } else {
        switch (isShowModal) {
            case "add":
                return addCallBack(value)
            case "delete":
                return deleteCallback(valueId)
            case "edit":
                return editCallback(valueId, value)
            default: return
        }
    }
}