import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LockProfileBodyIcon } from '~/components/Icons';
import styles from './ProfileBody.module.scss';
import { VideoModalContextShow } from '~/contexts/VideoModalContext';

const cx = classNames.bind(styles);

function ProfileBody({ userProfile, videoList, stateOfCurrentUser }) {
    console.log(videoList);
    const [state, setState] = useState(false);
    const [playId, setPlayId] = useState(0);

    console.log(playId);

    const videoRef = useRef([]);

    const { propsOfVideoModal, setPropsOfVideoModal, videoModalState } = useContext(VideoModalContextShow);
    const [isVideoModalShow, showVideoModal] = videoModalState;

    useEffect(() => {
        if (isVideoModalShow) {
            propsOfVideoModal.handleNextVideo = handleNextVideo;
            propsOfVideoModal.handlePrevVideo = handlePrevVideo;

            setPropsOfVideoModal({ ...propsOfVideoModal });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideoModalShow]);

    const playVideo = (index) => {
        videoRef.current[index].play();
    };

    const pauseVideo = (index) => {
        videoRef.current[index].pause();
        videoRef.current[index].currentTime = 0;
    };

    const handleShowVideoModal = (video, index) => {
        const propsOfVideoModal = {
            userProfile: video.user,
            videoInfo: video,
            index,
        };
        setPlayId(index);
        setPropsOfVideoModal(propsOfVideoModal);
        showVideoModal();
    };

    const handleNextVideo = () => {
        setPlayId((currentId) => {
            if (currentId >= videoList.length - 1) {
                return currentId;
            } else {
                const nextId = currentId + 1;
                const newProps = {
                    userProfile: videoList[nextId].user,
                    videoInfo: videoList[nextId],
                    index: nextId,
                };
                setTimeout(() => setPropsOfVideoModal({ ...propsOfVideoModal, ...newProps }));
                return nextId;
            }
        });
    };

    const handlePrevVideo = () => {
        setPlayId((currentId) => {
            if (currentId <= 0) {
                return currentId;
            } else {
                const prevId = currentId - 1;
                const newProps = {
                    userProfile: videoList[prevId].user,
                    videoInfo: videoList[prevId],
                    index: prevId,
                };
                setTimeout(() => setPropsOfVideoModal({ ...propsOfVideoModal, ...newProps }));
                return prevId;
            }
        });
    };

    return (
        <div className={cx('profileBody')}>
            <div className={cx('labelItem')}>
                <button onClick={() => setState(false)} className={cx('labelBtn', state ? 'disabled' : 'show')}>
                    Videos
                </button>
                <button onClick={() => setState(true)} className={cx('labelBtn', state ? 'show' : 'disabled')}>
                    <FontAwesomeIcon className={cx('lockBtn')} icon={faLock} />
                    Liked
                </button>
                <div className={cx('highlightBtn')}></div>
            </div>
            {stateOfCurrentUser && !(videoList.length > 0) ? (
                <div className={cx('noVideo')}>
                    <span className={cx('lockLabel')}>
                        <LockProfileBodyIcon />
                    </span>
                    <p className={cx('textBold')}>This user's liked videos are private</p>
                    <p className={cx('textNormal')}>Videos liked by {userProfile.nickname} are currently hidden</p>
                </div>
            ) : (
                <div className={cx('videoContainer')}>
                    <div className={cx('divVideo')}>
                        {videoList.map((video, index) => (
                            <div className={cx('divItemContainer')} key={index}>
                                <div className={cx('userPostItem')}>
                                    <div className={cx('paddingTop')}>
                                        <div className={cx('divWrapper')}>
                                            <div
                                                className={cx('linkVideo')}
                                                onClick={() => handleShowVideoModal(video, index)}
                                                onMouseOver={() => playVideo(index)}
                                                onMouseLeave={() => pauseVideo(index)}
                                            >
                                                <div className={cx('divPlayerContainer')}>
                                                    <div className={cx('divContainer')}>
                                                        <img
                                                            src={video.thumb_url}
                                                            alt={video.description}
                                                            className={cx('divImage')}
                                                        />
                                                        <div className={cx('divPlayerWrapper')}>
                                                            <div className={cx('videoPlayer')}>
                                                                <video
                                                                    ref={(ref) => (videoRef.current[index] = ref)}
                                                                    src={video.file_url}
                                                                    className={cx('video')}
                                                                    preload="auto"
                                                                    playsInline={true}
                                                                    muted="muted"
                                                                    crossOrigin="anonymous"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('divFooter')}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('userPostItemDesc')}>
                                    <a href="/" className={cx('title')}>
                                        {video.description}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileBody;
