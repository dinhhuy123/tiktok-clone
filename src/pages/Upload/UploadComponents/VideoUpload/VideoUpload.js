import { useState } from 'react';
import classNames from 'classnames/bind';
import Switch from 'react-ios-switch';

import styles from './VideoUpload.module.scss';
import Button from '~/components/Button/Button';
import { UploadVideoIcon } from '~/components/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Viewable from '../Viewable';
import AllowUser from '../AllowUser/AllowUser';

const cx = classNames.bind(styles);

function VideoUpload({ getVideoInfo }) {
    const [caption, setCaption] = useState('');
    const [limit, setLimit] = useState(false);
    const [viewable, setViewable] = useState('Public');
    const [copyrightSwitch, setCopyrightSwitch] = useState(false);
    const [allowUser, setAllowUser] = useState(['comment', 'duet', 'stitch']);

    const handleViewable = (viewable) => {
        setViewable(viewable);
        setLimit(false);
    };

    const handleUploadFile = () => {
        document.getElementById('inputFile').click();
    };

    return (
        <PopperWrapper className={cx('noPadding')}>
            <div className={cx('uploadVideoContainer')}>
                <div className={cx('postTitle')}>
                    <span>Upload Video</span>
                    <div className={cx('subTitle')}>
                        <span>Post a video to your account</span>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('selectFile')}>
                        <div className={cx('upload')}>
                            <div className={cx('uploadButton')}>
                                <input
                                    className={cx('visible')}
                                    id="inputFile"
                                    type="file"
                                    accept="video/*"
                                    onChange={getVideoInfo}
                                />
                                <div className={cx('buttonContainer')} onClick={handleUploadFile}>
                                    <span>
                                        <UploadVideoIcon className={cx('uploadIcon')} />
                                    </span>
                                    <div className={cx('selectVideo')}>
                                        <span>Select video to upload</span>
                                    </div>
                                    <div className={cx('dragFile')}>
                                        <span>Or drag and drop file</span>
                                    </div>
                                    <div className={cx('videoDesc')}>
                                        <div>
                                            <span>Mp4 or WebM</span>
                                        </div>
                                        <div>
                                            <span>720x1280 resolution or higher</span>
                                        </div>
                                        <div>
                                            <span>Up to 30 minutes</span>
                                        </div>
                                        <div>
                                            <span>Less than 2GB</span>
                                        </div>
                                    </div>
                                    <div className={cx('uploadFile')}>
                                        <Button primary className={cx('uploadFileBtn')}>
                                            Select file
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                        <div className={cx('cover')}>
                            <div className={cx('title')}>
                                <span>Cover</span>
                            </div>
                            <div className={cx('imagesList')}>
                                <div id="images" className={cx('images')}>
                                    <div className={cx('noImages')}></div>
                                </div>
                            </div>
                        </div>
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
                            <Button className={cx('postBtn')}>Post</Button>
                        </div>
                    </div>
                </div>
            </div>
        </PopperWrapper>
    );
}

export default VideoUpload;
