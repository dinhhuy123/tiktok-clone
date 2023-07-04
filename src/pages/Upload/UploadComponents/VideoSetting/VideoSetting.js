import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Switch from 'react-ios-switch';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './VideoSetting.module.scss';
import Button from '~/components/Button/Button';
import * as authService from '~/services/authService';
import * as videoService from '~/services/videoService';
import UploadHeader from '../UploadHeader';
import VideoPreview from '../VideoPreview';
import Viewable from '../Viewable';
import VideoCover from '../VideoCover';
import AllowUser from '../AllowUser';
import { ModalContextShow } from '~/contexts/ModalContext';
import { NotifyContextShow } from '~/contexts/NotifyContext';

const cx = classNames.bind(styles);

function VideoSetting({ thumbArray, source, file, setFile }) {
    console.log(file);
    const timeCoverRef = useRef(0);
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = currentUser && currentUser.meta.token ? currentUser.meta.token : '';

    const [userProfile, setUserProfile] = useState({});
    const [totalTime, setTotalTime] = useState('00:00');
    const [limit, setLimit] = useState(false);
    const [copyrightSwitch, setCopyrightSwitch] = useState(false);
    const [caption, setCaption] = useState(file.name);
    const [changeBtn, setChangeBtn] = useState(false);
    const [viewable, setViewable] = useState('Public');
    const [musicValue, setMusicValue] = useState(
        `Original sound - ${currentUser.data.first_name} ${currentUser.data.last_name}`,
    );
    const [allowUser, setAllowUser] = useState(['comment', 'duet', 'stitch']);

    const { showConfirmModal } = useContext(ModalContextShow);
    const showNotify = useContext(NotifyContextShow);

    // console.log(file.name);

    const convertHMS = (value, style = false) => {
        const sec = parseInt(value, 10);
        let minutes = Math.floor(sec / 60);
        let seconds = sec - minutes * 60;
        let time;
        if (style) {
            time = minutes > 0 ? `${minutes}m${seconds}s` : `${seconds}s`;
        } else {
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            time = minutes + ':' + seconds;
        }
        return time;
    };

    const handleViewable = (viewable) => {
        setViewable(viewable);
        setLimit(false);
    };

    useEffect(() => {
        if (accessToken) {
            authService.getCurrentUser(accessToken).then((res) => {
                setUserProfile(res);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleResetState = () => {
        setFile(null);
        setMusicValue(`Original sound - ${currentUser.data.first_name} ${currentUser.data.last_name}`);
    };

    const confirmUploadVideo = () => {
        const dataModal = {
            description: (
                <div className={cx('confirmTitle')}>
                    <div>Your video are being uploaded to TikTok!</div>
                </div>
            ),
            agree: (
                <div className={cx('upload')}>
                    <Button primary className={cx('uploadBtn')} onClick={handleResetState}>
                        Upload another video
                    </Button>
                </div>
            ),
            cancel: (
                <div className={cx('view')}>
                    <Button upload className={cx('viewProfileBtn')} to={`/users/@${currentUser.data.nickname}`}>
                        View profile
                    </Button>
                </div>
            ),
        };
        showConfirmModal(dataModal);
    };

    const postVideo = async (e) => {
        const dataUpload = new FormData();

        // upload file
        dataUpload.append('upload_file', file);
        // description
        dataUpload.append('description', caption);
        // music
        musicValue && dataUpload.append('music', musicValue);
        // cover
        dataUpload.append('thumbnail_time', '5');
        // viewable
        dataUpload.append('viewable', viewable.toLowerCase());
        // Allow user
        allowUser.forEach((item) => {
            item && dataUpload.append('allows[]', item.toLowerCase());
        });

        const data = await videoService.createNewVideo(dataUpload, accessToken);
        data ? confirmUploadVideo() : showNotify('Error in the uploading process. Please try again!', 3000);
    };

    return (
        <>
            <UploadHeader convertHMS={convertHMS} totalTime={totalTime} file={file} />
            <PopperWrapper className={cx('noPadding')}>
                <div className={cx('uploadVideoContainer')}>
                    <div className={cx('postTitle')}>
                        <span>Upload Video</span>
                        <div className={cx('subTitle')}>
                            <span>Post a video to your account</span>
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('preview')}>
                            <VideoPreview
                                changeBtn={changeBtn}
                                setChangeBtn={setChangeBtn}
                                userProfile={userProfile}
                                source={source}
                                file={file}
                                setFile={setFile}
                                musicValue={musicValue}
                                totalTime={totalTime}
                                setTotalTime={setTotalTime}
                                convertHMS={convertHMS}
                            />
                        </div>
                        <div className={cx('setting')}>
                            <div className={cx('caption')}>
                                <div className={cx('title')}>
                                    <span>Caption</span>
                                    <span className={cx('captionLength')}>{`${caption.length}/2220`}</span>
                                </div>
                                <div className={cx('hashtagContainer')}>
                                    <div className={cx('hashtagName')}>
                                        <input value={caption} onChange={(e) => setCaption(e.target.value)} />
                                    </div>
                                    <div className={cx('hashtagIcon')}>
                                        <span>@</span>
                                        <span>#</span>
                                    </div>
                                </div>
                            </div>
                            <VideoCover
                                thumbArray={thumbArray}
                                source={source}
                                timeCoverRef={timeCoverRef}
                                file={file}
                            />
                            <Viewable
                                limit={limit}
                                setLimit={setLimit}
                                viewable={viewable}
                                handleViewable={handleViewable}
                            />
                            <AllowUser allowUser={allowUser} setAllowUser={setAllowUser} />
                            <div className={cx('copyright')}>
                                <div className={cx('title', 'switch')}>
                                    <span>Run a copyright check</span>
                                    <Switch
                                        checked={copyrightSwitch}
                                        style={{ transform: 'scale(0.8)' }}
                                        onChange={setCopyrightSwitch}
                                    />
                                </div>
                                <div className={cx('copyrightDesc')}>
                                    <span>
                                        We'll check your video for potential copyright infringements on used sounds. If
                                        infringements are found, you can edit the video before posting.
                                        <a href="/"> Learn more</a>
                                    </span>
                                </div>
                            </div>
                            <div className={cx('btn-row')}>
                                <Button upload className={cx('discardBn')}>
                                    Discard
                                </Button>
                                <Button primary className={cx('postBtn')} onClick={postVideo}>
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PopperWrapper>
        </>
    );
}

export default VideoSetting;
