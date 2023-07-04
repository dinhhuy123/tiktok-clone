import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Upload.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { UploadVideoIcon } from '~/components/Icons';
import Button from '~/components/Button';
import Footer from './Footer';
import VideoSetting from './UploadComponents/VideoSetting';
import VideoUpload from './UploadComponents/VideoUpload';

const cx = classNames.bind(styles);

function Upload() {
    const [source, setSource] = useState();
    const [file, setFile] = useState(null);
    const [changeUploadState, setChangeUploadState] = useState(true);

    const handleUploadFile = () => {
        document.getElementById('uploadFile').click();
    };

    const getVideoInfo = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSource(url);
            setFile(file);
            setChangeUploadState(false);
        }
    };

    return (
        <div className={cx('upload')}>
            <div className={cx('uploadHeader')}>
                <div className={cx('center')}>
                    {changeUploadState ? (
                        <PopperWrapper className={cx('uploadWrapper')}>
                            <div className={cx('uploader')} id="upload">
                                <input
                                    id="uploadFile"
                                    type="file"
                                    accept="video/*"
                                    className={cx('visible')}
                                    onChange={getVideoInfo}
                                ></input>
                                <div className={cx('uploadCard')} onClick={handleUploadFile}>
                                    <span>
                                        <UploadVideoIcon className={cx('uploadIcon')} />
                                    </span>
                                    <div className={cx('selectVideo')}>
                                        <span>Select video to upload</span>
                                    </div>
                                    <div className={cx('dragFile')}>
                                        <span>Or drag and drop a file</span>
                                    </div>
                                    <div className={cx('desc')}>
                                        <span>Long videos can be split into multiple parts to get more exposure</span>
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
                        </PopperWrapper>
                    ) : (
                        <>
                            {file ? (
                                <VideoSetting source={source} file={file} setFile={setFile} />
                            ) : (
                                <VideoUpload getVideoInfo={getVideoInfo} />
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Upload;
