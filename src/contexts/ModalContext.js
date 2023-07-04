import { createContext, useRef } from 'react';
import ConfirmModal from '~/components/Modals/ConfirmModal';
import LoginModal from '~/components/Modals/LoginModal';
// import UploadModal from '~/components/Modals/UploadModal';
import useModal from '~/hooks/useModal';

export const ModalContextShow = createContext();

function ModalContext({ children }) {
    // const [showLoginModal, setShowLoginModal] = useState(false);
    // const [showUploadModal, setShowUploadModal] = useState(false);
    const [LoginComponent, showLoginModal] = useModal(LoginModal);
    const [ConfirmComponent, showConfirmModal] = useModal(ConfirmModal);

    const contextValue = useRef({ showLoginModal, showConfirmModal });

    return (
        <ModalContextShow.Provider value={contextValue.current}>
            {children}
            <LoginComponent />
            <ConfirmComponent />
        </ModalContextShow.Provider>
    );
}

export default ModalContext;
