import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoControl.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MuteVideoIcon, ReportIcon, VolumeBtn } from '~/components/Icons';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { usePlayingOnScreen } from '~/hooks';

const cx = classNames.bind(styles);

function VideoControl({ handleShowVideoModal, video, index }) {
    const [muted, setMuted] = useState(true);
    const [valueBar, setValueBar] = useState(40);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isStop, setIsStop] = useState(false);
    const [time, setTime] = useState('00:0' + 0);
    const [progress, setProgress] = useState(0);
    const [totalTime, setTotalTime] = useState('00:00');

    const videoRef = useRef(null);
    const volumeBarRef = useRef();
    const volumeCircleRef = useRef();

    const options = { root: null, rootMargin: '0px', threshold: 0.7 };
    const isVisible = usePlayingOnScreen(options, videoRef);

    // console.log(isVisible);

    const togglePlay = () => {
        if (isStop) {
            videoRef.current.pause();
            setIsStop(false);
        } else {
            videoRef.current.play();
            setIsStop(true);
        }
    };

    useEffect(() => {
        if (isVisible) {
            if (isPlaying) {
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setIsStop(true);
                setIsPlaying(false);
            }
        } else {
            if (!isPlaying) {
                videoRef.current.pause();
                setIsStop(true);
                setIsPlaying(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible, isPlaying]);

    const handleVolumeChange = (e) => {
        const value = +e.target.value;
        setValueBar(value);
        const scale = valueBar / 100;
        volumeBarRef.current.style.transform = `scaleY(${scale})`;
        volumeCircleRef.current.style.transform = `translateY(${-valueBar * 0.4}px)`;

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
            volumeCircleRef.current.style.transform = `translateY(${-valueBar * 0.4}px)`;
            videoRef.current.volume = valueBar / 100;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [muted]);

    useEffect(() => {
        videoRef.current.volume = valueBar / 100;
    }, [valueBar]);

    return (
        <div className={cx('video')}>
            <div className={cx('outside')} onClick={() => handleShowVideoModal(video, index)}>
                <video
                    onTimeUpdate={handleProgress}
                    onLoadedData={(e) => {
                        const duration = e.target.duration;
                        setTotalTime(convertHMS(duration));
                    }}
                    ref={videoRef}
                    className={cx('videoInside')}
                    loop={true}
                    playsInline
                    muted={muted}
                    poster={video.thumb_url}
                >
                    <source src={video.file_url} type="video/mp4" />
                    Your browser does not support HTML video.
                </video>
            </div>
            <div className={cx('reportBtn')}>
                <span>
                    <ReportIcon className={cx('reportIcon')} />
                </span>
                Report
            </div>
            {isStop ? (
                <button className={cx('pauseBtn')} onClick={togglePlay}>
                    <FontAwesomeIcon icon={faPause} className={cx('pauseIcon')} />
                </button>
            ) : (
                <button className={cx('playBtn')} onClick={togglePlay}>
                    <FontAwesomeIcon icon={faPlay} className={cx('playIcon')} />
                </button>
            )}
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
                            onChange={handleVolumeChange}
                        ></input>
                    </div>
                </div>
                <button className={cx('volumeBtn')} onClick={handleToggleMute}>
                    {muted ? <MuteVideoIcon className={cx('muteIcon')} /> : <VolumeBtn className={cx('volumeIcon')} />}
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
    );
}

export default VideoControl;
