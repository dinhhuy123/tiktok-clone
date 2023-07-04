const { useState } = require('react');
const { createPortal } = require('react-dom');

function useVideoModal(ModalComponent) {
    const [isVideoModalShow, setIsVideoModalShow] = useState(false);
    const [propsOfVideoModal, setPropsOfVideoModal] = useState({});
    const [urlStart, setUrlStart] = useState('');

    const showVideoModal = () => {
        setIsVideoModalShow(true);
        document.body.classList.add('videoModal');
        console.log('videoModalContext: ', window.location);
        const { pathname, hash, search } = window.location;
        const urlOrigin = pathname + hash + search;
        setUrlStart(urlOrigin);
    };

    const hideVideoModal = () => {
        setIsVideoModalShow(false);
        document.body.classList.remove('videoModal');
        // window.history.go(-1);
        console.log(urlStart);
        window.history.replaceState(null, '', urlStart);
    };

    const VideoModalComponent = () => {
        return (
            isVideoModalShow &&
            createPortal(<ModalComponent handleClose={hideVideoModal} {...propsOfVideoModal} />, document.body)
        );
    };

    return {
        VideoModalComponent,
        propsOfVideoModal,
        setPropsOfVideoModal,
        videoModalState: [isVideoModalShow, showVideoModal],
    };
}

export default useVideoModal;
