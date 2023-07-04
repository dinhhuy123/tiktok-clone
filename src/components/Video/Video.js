import Tippy from '@tippyjs/react/headless';
import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots, faShare, faCircleCheck, faBookmark } from '@fortawesome/free-solid-svg-icons';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { MusicIcon } from '~/components/Icons';
import * as userService from '~/services/userService';
import VideoControl from './VideoControl/VideoControl';
import { ModalContextShow } from '~/contexts/ModalContext';

const cx = classNames.bind(styles);

function Video({ videoArray, video, isFollowing, index, handleShowVideoModal }) {
    console.log(videoArray);
    const {
        meta: {
            video: { resolution_x: videoWidth, resolution_y: videoHeight },
        },
    } = video;

    const verticalVideo = videoHeight / videoWidth > 1;

    const wrapperRef = useRef();
    const preview = () => {
        return (
            <div tabIndex="-1">
                <PopperWrapper>
                    <AccountPreview data={video.user} />
                </PopperWrapper>
            </div>
        );
    };

    const [followed, setFollowed] = useState(video.user.is_followed);
    const [likesCount, setLikesCount] = useState(video.likes_count);
    const [isLiked, setIsLiked] = useState(video.is_liked);

    const { showLoginModal } = useContext(ModalContextShow);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    useEffect(() => {
        const optionsScroll = {
            block: 'start',
            behavior: 'smooth',
        };
        videoArray[index] = {
            index: index,
            data: video,
            scrollVideo: wrapperRef.current.scrollIntoView.bind(wrapperRef.current, optionsScroll),
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFollowUser = (e) => {
        e.preventDefault();
        if (!currentUser || !accessToken) {
            showLoginModal();
            return;
        }
        if (followed) {
            userService
                .unFollowAnUser({ userId: video.user.id, accessToken: accessToken })
                .then((res) => {
                    console.log(res);
                    if (res.data) {
                        setFollowed(res.data.is_followed);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            userService
                .followAnUser({ userId: video.user.id, accessToken: accessToken })
                .then((res) => {
                    console.log(res);
                    if (res.data) {
                        setFollowed(res.data.is_followed);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleLikeVideo = async (e) => {
        e.preventDefault();
        if (!currentUser || !accessToken) {
            showLoginModal();
            return;
        }
        if (!isLiked) {
            const data = await userService.likeVideo(video.id, accessToken);
            if (data) {
                console.log(data);
                setIsLiked(true);
                setLikesCount(data.likes_count);
            }
        } else {
            const data = await userService.unLikeVideo(video.id, accessToken);
            if (data) {
                console.log(data);
                setIsLiked(false);
                setLikesCount(data.likes_count);
            }
        }
    };

    return (
        <div className={cx('video-wrapper')} ref={wrapperRef}>
            <Tippy interactive delay={[200, 200]} offset={[-10, 2]} render={preview} placement="bottom-start">
                <a className={cx('avatar')} href="/">
                    <Image className={cx('image')} src={video.user.avatar} alt={video.user.nickname} />
                </a>
            </Tippy>
            <div className={cx('container')}>
                <div className={cx('textContainer')}>
                    <div className={cx('user-name-container')}>
                        <a href={`users/@${video.user.nickname}`} className={cx('user-name')}>
                            <h3 className={cx('nickname')}>{video.user.nickname}</h3>
                            {video.user.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
                            <h4 className={cx('total-name')}>{`${video.user.first_name} ${video.user.last_name}`}</h4>
                        </a>
                    </div>
                    {(isFollowing === undefined || isFollowing === false) && (
                        <Button
                            outline
                            className={cx(followed ? 'following-btn' : 'follow-btn')}
                            onClick={handleFollowUser}
                        >
                            {followed ? 'Following' : 'Follow'}
                        </Button>
                    )}
                    <div className={cx('text-container')}>
                        <span className={cx('description')}>{video.description}</span>
                        <h4 className={cx('music-name')}>
                            <a className={cx('music')} href="/">
                                <MusicIcon className={cx('music-icon')} /> nhạc nền {video.music && ` - ${video.music}`}
                            </a>
                        </h4>
                    </div>
                </div>
                <div className={cx('video-container')}>
                    <div className={cx('userVideo', `${verticalVideo ? 'vertical' : 'horizontal'}`)}>
                        {verticalVideo ? (
                            <canvas width="56.25" height="100" className={cx('verticalVideoCanvas')}></canvas>
                        ) : (
                            <canvas width="100" height="56.25" className={cx('horizontalVideoCanvas')}></canvas>
                        )}

                        <VideoControl
                            videoArray={videoArray}
                            handleShowVideoModal={handleShowVideoModal}
                            video={video}
                            index={index}
                        />
                    </div>
                    <div className={cx('action')}>
                        <button onClick={handleLikeVideo} className={cx('action-container')}>
                            <span className={cx('action-btn')}>
                                <FontAwesomeIcon
                                    className={cx('action-icon', { likeIcon: isLiked })}
                                    icon={faHeart}
                                ></FontAwesomeIcon>
                            </span>
                            <strong className={cx('count')}>{likesCount}</strong>
                        </button>
                        <button className={cx('action-container')} onClick={() => handleShowVideoModal(video, index)}>
                            <span className={cx('action-btn')}>
                                <FontAwesomeIcon className={cx('action-icon')} icon={faCommentDots}></FontAwesomeIcon>
                            </span>
                            <strong className={cx('count')}>{video.comments_count}</strong>
                        </button>
                        <button className={cx('action-container')}>
                            <span className={cx('action-btn')}>
                                <FontAwesomeIcon className={cx('action-icon')} icon={faBookmark}></FontAwesomeIcon>
                            </span>
                            <strong className={cx('count')}>0</strong>
                        </button>
                        <button className={cx('action-container')}>
                            <span className={cx('action-btn')}>
                                <FontAwesomeIcon className={cx('action-icon')} icon={faShare}></FontAwesomeIcon>
                            </span>
                            <strong className={cx('count')}>{video.shares_count}</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
