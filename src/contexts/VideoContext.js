const { createContext } = require('react');

const VideoContextShow = createContext();

function VideoContext({ children, value }) {
    return <VideoContextShow.Provider value={value}>{children}</VideoContextShow.Provider>;
}

export default VideoContext;
