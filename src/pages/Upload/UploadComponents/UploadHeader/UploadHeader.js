import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import VideoSnapshot from 'video-snapshot';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { DecreaseIcon, EditVideoIcon, IncreaseIcon, SplitIcon } from '~/components/Icons';
import styles from './UploadHeader.module.scss';
import Button from '~/components/Button/Button';
import { NotifyContextShow } from '~/contexts/NotifyContext';

const cx = classNames.bind(styles);

function UploadHeader({ convertHMS, totalTime, file, thumbArray }) {
    const [imgSrc, setImgSrc] = useState('');
    const showNotify = useContext(NotifyContextShow);

    useEffect(() => {
        if (!file) {
            return;
        }
        const createImg = async () => {
            const snapImg = new VideoSnapshot(file);
            const previewSrc = await snapImg.takeSnapshot();
            setImgSrc(previewSrc);
        };
        createImg();
    }, [file]);

    const handleEdit = (e) => {
        e.preventDefault();
        showNotify('Coming soon!');
    };

    return (
        <PopperWrapper className={cx('noPadding')}>
            <div className={cx('grid')}>
                <div className={cx('editVideo')}>
                    <div className={cx('imageContainer')}>
                        <div className={cx('imageNumber')}>
                            <span>1</span>
                        </div>
                        <div className={cx('image')}>
                            <div className={cx('card')}>
                                {imgSrc && <img src={imgSrc} alt="imageCard" className={cx('imageCard')} />}
                            </div>
                        </div>
                        <div className={cx('videoImageDescContainer')}>
                            <span className={cx('videoImageDescName')}>{file.name}</span>
                            <div className={cx('videoImageDescTime')}>
                                <span>00:00</span> - <span>{convertHMS(totalTime)}</span>
                                <span>{convertHMS(totalTime, true)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('editBtnContainer')}>
                        <Button primary leftIcon={<EditVideoIcon />} onClick={handleEdit}>
                            Edit video
                        </Button>
                    </div>
                </div>
                <div className={cx('split')}>
                    <div className={cx('splitContainer')}>
                        <span>Split into multiple parts to get more exposure</span>
                        <div className={cx('handleSplit')}>
                            <span>
                                <DecreaseIcon />
                            </span>
                            <span>
                                <input value="2" onChange={(e) => e.target.value} />
                            </span>
                            <span>
                                <IncreaseIcon />
                            </span>
                        </div>
                    </div>
                    <div className={cx('splitBtnContainer')}>
                        <Button upload leftIcon={<SplitIcon />} className={cx('splitBtn')}>
                            Split
                        </Button>
                    </div>
                </div>
            </div>
        </PopperWrapper>
    );
}

export default UploadHeader;
