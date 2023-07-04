import classNames from 'classnames/bind';
import styles from './VideoScreen.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClose, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { MuteBtn, ReportIcon, VolumeBtn } from '~/components/Icons';

const cx = classNames.bind(styles);

function VideoScreen({ userProfile, videoInfo, indexOfVideo, handleNextVideo, handlePrevVideo, handleClose }) {
    const [muted, setMuted] = useState(false);
    const [valueBar, setValueBar] = useState(0);
    const [stopVideo, setStopVideo] = useState(false);
    const [time, setTime] = useState('00:0' + 0);
    const [progress, setProgress] = useState(0);
    const [totalTime, setTotalTime] = useState('00:00');
    // const [followed, setFollowed] = useState(userProfile.is_followed);
    const volumeBarRef = useRef();
    const volumeCircleRef = useRef();
    const videoRef = useRef();

    const togglePlay = () => {
        setStopVideo(!stopVideo);
    };

    useEffect(() => {
        stopVideo ? videoRef.current.pause() : videoRef.current.play();
    }, [stopVideo]);

    const handleVolume = (e) => {
        const value = +e.target.value;
        setValueBar(value);
        const scale = valueBar / 100;
        volumeBarRef.current.style.transform = `scaleY(${scale})`;
        volumeCircleRef.current.style.transform = `translateY(${-valueBar * 0.75}px)`;

        if (value === 0) {
            setMuted(true);
        } else {
            setMuted(false);
        }
    };

    const handleToggleMute = () => {
        setMuted(!muted);
    };

    const convertHMS = (value) => {
        const sec = parseInt(value, 10);
        let minutes = Math.floor(sec / 60);
        let seconds = sec - minutes * 60;
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    };

    const handleProgress = () => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        let sec = Math.floor(currentTime);
        if (sec < 10) {
            sec = '00:0' + sec;
        } else {
            sec = '00:' + sec;
        }
        if (sec >= 60) {
            let minutes = Math.floor(sec / 60);
            let seconds = sec - minutes * 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            sec = '0' + minutes + ':' + seconds;
        }
        setTime(sec);
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
    };

    useEffect(() => {
        if (muted) {
            volumeBarRef.current.style.transform = `scaleY(0)`;
            volumeCircleRef.current.style.transform = `translateY(0)`;
            videoRef.current.volume = 0;
        } else {
            const scale = valueBar / 100;
            volumeBarRef.current.style.transform = `scaleY(${scale})`;
            volumeCircleRef.current.style.transform = `translateY(${-valueBar * 0.75}px)`;
            videoRef.current.volume = valueBar / 100;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [muted]);

    useEffect(() => {
        videoRef.current.volume = valueBar / 100;
    }, [valueBar]);

    const closeVideoModal = () => {
        handleClose();
    };

    return (
        <div className={cx('videoContainer')}>
            <div className={cx('videoPlayer')}>
                <p className={cx('videoBackground')} style={{ backgroundImage: `url(${videoInfo.thumb_url})` }}></p>
                <div className={cx('videoSpace')} onClick={togglePlay}>
                    <img className={cx('videoImage')} src={videoInfo.thumb_url} alt={videoInfo.id} />
                    <video
                        onTimeUpdate={handleProgress}
                        onLoadedData={(e) => {
                            const duration = e.target.duration;
                            setTotalTime(convertHMS(duration));
                        }}
                        ref={videoRef}
                        loop
                        className={cx('video')}
                        src={videoInfo.file_url}
                    />
                </div>
                <button className={cx('closeBtn')} onClick={closeVideoModal}>
                    <FontAwesomeIcon icon={faClose} className={cx('closeIcon')} />
                </button>
                <div className={cx('reportBtn')}>
                    <span className={cx('reportIcon')}>
                        <ReportIcon />
                    </span>
                    Report
                </div>
                {indexOfVideo > 0 && (
                    <button className={cx('prevVideoBtn')} onClick={() => handlePrevVideo(indexOfVideo)}>
                        <FontAwesomeIcon icon={faChevronDown} className={cx('prevIcon')} />
                    </button>
                )}
                <button className={cx('nextVideoBtn')} onClick={() => handleNextVideo(indexOfVideo)}>
                    <FontAwesomeIcon icon={faChevronDown} className={cx('nextIcon')} />
                </button>
                {stopVideo && <FontAwesomeIcon icon={faPlay} className={cx('playIcon')} />}

                <div className={cx('volumeContainer')}>
                    <div className={cx('volumeControl')}>
                        <div className={cx('volumeControlProgress')}></div>
                        <div className={cx('volumeControlCircle')} ref={volumeCircleRef}></div>
                        <div className={cx('volumeControlBar')} ref={volumeBarRef}></div>
                        <div className={cx('inputRange')}>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                className={cx('volumeRange')}
                                onChange={handleVolume}
                            ></input>
                        </div>
                    </div>
                    <button className={cx('volumeBtn')} onClick={handleToggleMute}>
                        {muted ? <MuteBtn className={cx('muteIcon')} /> : <VolumeBtn className={cx('volumeIcon')} />}
                    </button>
                </div>
                <div className={cx('progressBarContainer')}>
                    <div className={cx('progressBarControl')}>
                        <div className={cx('progressBar')} style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className={cx('timeProgress')}>
                        {time}/{totalTime}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoScreen;
