import { useDispatch, useSelector } from "react-redux"
import { RootState, onCloseDateModal, onOpenDateModal } from "../store"

export const useUiStore = () => {
    const dispatch = useDispatch();
    const {isDateModalOpen} = useSelector((state:RootState) =>  state.ui)
    
    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }
    const toggleDateModal = () => {
        if(isDateModalOpen)
            return closeDateModal();
        return openDateModal();
    }
    
    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal,
        toggleDateModal
    }
}