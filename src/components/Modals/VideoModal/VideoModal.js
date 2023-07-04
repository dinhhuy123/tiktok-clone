import { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { parseISO, formatDistanceToNow } from 'date-fns';

import styles from './VideoModal.module.scss';
import * as userService from '~/services/userService';
import Image from '~/components/Image';
import { MusicIcon, MoreIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import VideoScreen from './VideoScreen';
import Interactive from './Interactive';
import CommentFooter from './CommentFooter';
import CommentBody from './CommentBody';
import Button from '~/components/Button/Button';
import { NotifyContextShow } from '~/contexts/NotifyContext';

const cx = classNames.bind(styles);

function VideoModal(props) {
    console.log(props);
    const { userProfile, videoInfo, index, handleClose, handleNextVideo, handlePrevVideo } = props;
    const showNotify = useContext(NotifyContextShow);
    const [followed, setFollowed] = useState(userProfile.is_followed);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        console.log('videoModal: ', window.location);
        window.history.replaceState(null, '', `/users/@${videoInfo.user.nickname}/video/${videoInfo.id}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    const handleTime = (time) => {
        let timeAgo = '';
        if (time) {
            const date = parseISO(time);
            const timePeriod = formatDistanceToNow(date);
            timeAgo = `${timePeriod} ago`;
        }
        return timeAgo;
    };

    const isAuth = () => {
        return true;
    };

    const handleFollowUser = (e) => {
        e.preventDefault();
        if (!currentUser || !accessToken) {
            showNotify('Please login!');
            return;
        }
        if (followed) {
            userService
                .unFollowAnUser({ userId: userProfile.id, accessToken: accessToken })
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
                .followAnUser({ userId: userProfile.id, accessToken: accessToken })
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

    return (
        <div className={cx('wrapper')}>
            <VideoScreen
                userProfile={userProfile}
                videoInfo={videoInfo}
                indexOfVideo={index}
                handleNextVideo={handleNextVideo}
                handlePrevVideo={handlePrevVideo}
                handleClose={handleClose}
            />
            <div className={cx('commentContainer')}>
                <div className={cx('commentHeader')}>
                    <div className={cx('userInfo')}>
                        <a href="/#" className={cx('linkUserInfo')}>
                            <Image className={cx('avatar')} src={userProfile.avatar}></Image>
                            <div className={cx('nameContainer')}>
                                <span className={cx('nickname')}>{userProfile.nickname}</span>
                                <span className={cx('name')}>
                                    {userProfile.first_name + ' ' + userProfile.last_name}
                                    <span> · </span>
                                    <span className={cx('time')}>{handleTime(videoInfo.created_at)}</span>
                                </span>
                            </div>
                        </a>
                        {true ? (
                            <HeadlessTippy
                                // visible
                                interactive
                                delay={[0, 200]}
                                offset={[-80, 0]}
                                placement="bottom"
                                render={(attrs) => (
                                    <div className={cx('deleteContainer')} tabIndex="-1" {...attrs}>
                                        <div className={cx('arrow')}></div>
                                        <PopperWrapper className={cx('noPadding')}>
                                            <ul className={cx('itemList')}>
                                                <li className={cx('title')}>Privacy Setting</li>
                                                <li className={cx('title')}>Delete</li>
                                            </ul>
                                        </PopperWrapper>
                                    </div>
                                )}
                            >
                                <div className={cx('videoSetting')}>
                                    <MoreIcon />
                                </div>
                            </HeadlessTippy>
                        ) : (
                            <Button
                                outline
                                onClick={handleFollowUser}
                                className={cx(followed ? 'followingBtn' : 'followBtn')}
                            >
                                {followed ? 'Following' : 'Follow'}
                            </Button>
                        )}
                    </div>
                    <div className={cx('videoName')}>{videoInfo.description}</div>
                    <div className={cx('videoMusic')}>
                        <span className={cx('musicIcon')}>
                            <MusicIcon />
                        </span>
                        {videoInfo.music}
                    </div>
                    <div className={cx('contactToUser')}>
                        <Interactive videoInfo={videoInfo} />
                        <div className={cx('userVideoLink')}>
                            <p className={cx('videoLink')}>{window.location.href}</p>
                            <button className={cx('browserCopy')}>Copy Link</button>
                        </div>
                    </div>
                </div>
                <CommentBody
                    isAuth={isAuth}
                    handleTime={handleTime}
                    commentState={[comments, setComments]}
                    videoId={videoInfo.id}
                    showNotify={showNotify}
                />
                <CommentFooter setComments={setComments} videoId={videoInfo.id} showNotify={showNotify} />
            </div>
        </div>
    );
}

export default VideoModal;
