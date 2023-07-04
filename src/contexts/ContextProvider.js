import NotifyProVider from './NotifyContext';
import ModalProvider from './ModalContext';
import VideoModalProvider from './VideoModalContext';

function ContextProvider({ children }) {
    return (
        <NotifyProVider>
            <ModalProvider>
                <VideoModalProvider>{children}</VideoModalProvider>
            </ModalProvider>
        </NotifyProVider>
    );
}

export default ContextProvider;
