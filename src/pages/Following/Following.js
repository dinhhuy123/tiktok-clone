import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import Video from '~/components/Video';
import * as userService from '~/services/userService';
import { VideoModalContextShow } from '~/contexts/VideoModalContext';

const cx = classNames.bind(styles);

function Following() {
    const videoArrayRef = useRef([]);

    const pageRandom = useRef([]);

    const handleRandomPage = (min, max) => {
        const countPage = max + 1 - min;
        const randomList = pageRandom.current;
        let page;

        if (randomList.length >= countPage) {
            randomList.length === countPage && randomList.push(max);
            page = ++randomList[randomList.length - 1];

            return page;
        }

        do {
            page = Math.floor(Math.random() * countPage + min);
        } while (randomList.includes(page));

        randomList.push(page);

        return page;
    };

    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(handleRandomPage(1, 10));
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    const { propsOfVideoModal, setPropsOfVideoModal, videoModalState } = useContext(VideoModalContextShow);
    const [isVideoModalShow, showVideoModal] = videoModalState;

    const handleShowVideoModal = (video, index) => {
        videoArrayRef.current[index].scrollVideo();
        const propsOfVideoModal = {
            userProfile: video.user,
            videoInfo: video,
            index,
        };
        setPropsOfVideoModal(propsOfVideoModal);
        showVideoModal();
    };

    useEffect(() => {
        if (isVideoModalShow) {
            propsOfVideoModal.handleNextVideo = handleNextVideo;
            propsOfVideoModal.handlePrevVideo = handlePrevVideo;

            setPropsOfVideoModal({ ...propsOfVideoModal });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideoModalShow]);

    const handleNextVideo = (index) => {
        const currentVideoId = videoArrayRef.current.findIndex((inViewObj) => inViewObj.index === index);

        console.log(currentVideoId);
        if (currentVideoId >= videos.length - 1) {
            return;
        } else {
            const nextVideoId = currentVideoId + 1;
            const nextVideo = videoArrayRef.current[nextVideoId];
            nextVideo.scrollVideo();
            const newProps = {
                userProfile: nextVideo.data.user,
                videoInfo: nextVideo.data,
                index: nextVideoId,
            };
            setPropsOfVideoModal({ ...propsOfVideoModal, ...newProps });
        }
    };

    const handlePrevVideo = (index) => {
        const currentVideoId = videoArrayRef.current.findIndex((inViewObj) => inViewObj.index === index);

        if (currentVideoId <= 0) {
            return;
        } else {
            const prevVideoId = currentVideoId - 1;
            const prevVideo = videoArrayRef.current[prevVideoId];
            prevVideo.scrollVideo();
            const newProps = {
                userProfile: prevVideo.data.user,
                videoInfo: prevVideo.data,
                index: prevVideoId,
            };
            setPropsOfVideoModal({ ...propsOfVideoModal, ...newProps });
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            const response = await userService.getVideos({
                type: 'following',
                page,
                accessToken: accessToken,
            });
            // console.log(response);
            if (Array.isArray(response.data)) {
                response.data.sort(() => Math.random() - 0.5);
                setVideos([...videos, ...response.data]);
                setPage(handleRandomPage(1, 10));
            }
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, page]);

    return (
        <>
            {videos.length > 0 ? (
                <div className={cx('followingPage')}>
                    {videos.map((video, index) => (
                        <Video
                            videoArray={videoArrayRef.current}
                            key={index}
                            video={video}
                            isFollowing={true}
                            handleShowVideoModal={handleShowVideoModal}
                        />
                    ))}
                </div>
            ) : (
                <div className={cx('followingPage', 'noVideo')}>No video from your followers</div>
            )}
        </>
    );
}

export default Following;
