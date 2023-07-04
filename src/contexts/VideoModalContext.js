import { createContext } from 'react';
import { VideoModal } from '~/components/Modals';
import { useVideoModal } from '~/hooks';

export const VideoModalContextShow = createContext();

function VideoModalContext({ children }) {
    const { VideoModalComponent, propsOfVideoModal, setPropsOfVideoModal, videoModalState } = useVideoModal(VideoModal);

    const contextValue = { propsOfVideoModal, setPropsOfVideoModal, videoModalState };
    return (
        <VideoModalContextShow.Provider value={contextValue}>
            {children}
            <VideoModalComponent />
        </VideoModalContextShow.Provider>
    );
}

export default VideoModalContext;
